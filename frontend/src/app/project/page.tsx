"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";
import BackgroundParticles from "@/components/BackgroundParticles";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CircleButton from "@/components/CircleButton";
import particles from "@/assets/particles_calm";

interface ProjectCard {
    title: string;
    filters: string[];
    tags: string[];
    link: string;
    thumbnail?: string;
}

export default function ProjectPage() {
    const [id, setId] = useState<string | null>(null);
    const [proj, setProj] = useState<ProjectCard | null>(null);
    const [markdown, setMarkdown] = useState<string>(""); 
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const url = new URL(window.location.href);
        setId(url.searchParams.get("id"));
    }, []);

    useEffect(() => {
        if (!id) return;

        const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

        Promise.all([
            fetch(`${BACKEND_API}/projects/get_project_card/${id}`).then((r) => r.json()),
            fetch(`${BACKEND_API}/projects/get_project_markdown/${id}`).then((r) => r.text()),
        ])
            .then(([card, md]) => {
                setProj(card);
                setMarkdown(md);
            })
            .catch(() => setError("Failed to load project"));
    }, [id]);

    if (!id) return <div className="text-red-400">Missing project ID</div>;
    if (error) return <div className="text-red-400">{error}</div>;
    if (!proj) return <div className="text-gray-400">Loading...</div>;

    return (
        <div className="flex flex-col w-full text-white">
            <BackgroundParticles particles={particles} />

            {proj.thumbnail && (
                <div className="w-full h-[60vh] relative">
                    <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="w-full h-full object-cover brightness-75 z-0"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent pb-16 z-10">
                        <div className="w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold">{proj.title}</h1>
                                {/* Filters */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {proj.filters.map((f) => (
                                        <span key={f} className="bg-green-700 text-white px-3 py-1 rounded-full text-sm">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {proj.tags.map((t) => (
                                        <span key={t} className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {proj.link && (
                                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                    <CircleButton radius={50} strokeWidth={4}>
                                        <Image src={arrow} alt="arrow" />
                                    </CircleButton>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col max-w-[1100px] mx-auto mt-8 p-6">
                <MarkdownRenderer>{markdown}</MarkdownRenderer>
            </div>
        </div>
    );
}
