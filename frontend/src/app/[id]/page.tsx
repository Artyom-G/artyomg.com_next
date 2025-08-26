import React from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import particles from "@/assets/particles_calm";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CircleButton from "@/components/CircleButton";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";

interface ProjectPageProps {
    params: { id: string };
}

interface ProjectCard {
    title: string;
    filters: string[];
    tags: string[];
    link: string;
    thumbnail?: string;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
    const id = params.id;

    try {
        const [cardRes, markdownRes] = await Promise.all([
            fetch(`${BACKEND_API}/projects/get_project_card/${id}`, { cache: "no-store" }),
            fetch(`${BACKEND_API}/projects/get_project_markdown/${id}`, { cache: "no-store" }),
        ]);

        if (!cardRes.ok || !markdownRes.ok) {
            return (
                <div className="flex min-h-screen items-center justify-center text-red-400">
                    Failed to load project: {id}
                </div>
            );
        }

        const proj: ProjectCard = await cardRes.json();
        const markdown = await markdownRes.text();

        return (
            <div className="flex flex-col w-full text-white">
                <BackgroundParticles particles={particles} />

{/* Fullscreen Banner */}
{proj.thumbnail && (
    <div className="w-full h-[100vh] relative">
        <img
            src={proj.thumbnail}
            alt={proj.title}
            className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent pb-16">
            {/* Banner content aligned with markdown */}
            <div className="w-full max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left: Text */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-6xl font-bold">{proj.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {proj.filters.map((f) => (
                            <span
                                key={f}
                                className="bg-green-700 text-white px-3 py-1 rounded-full text-sm"
                            >
                                {f}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                            <span
                                key={t}
                                className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: Button */}
                {proj.link && (
                    <CircleButton radius={50} strokeWidth={4}>
                        <Image src={arrow} alt={proj.title} />
                    </CircleButton>
                )}
            </div>
        </div>
    </div>
)}


                {/* Markdown Content */}
                <div className="flex flex-col max-w-[1000px] mx-auto mt-8 p-6">
                    <MarkdownRenderer>{markdown}</MarkdownRenderer>
                </div>
            </div>
        );
    } catch (err: any) {
        console.error(err);
        return (
            <div className="flex min-h-screen items-center justify-center text-red-400">
                Error loading project: {id}
            </div>
        );
    }
}
