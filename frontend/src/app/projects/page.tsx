"use client";

import React, { useEffect, useState } from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import particles from "@/assets/particles_calm";
import CircleButton from "@/components/CircleButton";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";
import WaterlooCSRing from "@/components/WaterlooCSRing";

type Project = {
    title: string;
    filters: string[];
    tags: string[];
    link: string;
    thumbnail?: string;
};

export default function ProjectsPage() {
    const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
    const router = useRouter();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const formatTitle = (title: string) => title.toLowerCase().replace(/\s+/g, "_");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/projects/get_all_project_cards`);
                const data: Project[] = await res.json();

                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [BACKEND_API]);

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <div className="min-h-screen p-6">
            <BackgroundParticles particles={particles} />

            <div className="flex mt-42 mb-42 justify-center">
                <div className="w-full flex flex-col justify-center">
                    {/* Projects Grid */}
                    <div className="w-full max-w-[1200px] grid mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((proj) => (
                            <button
                                key={proj.title}
                                onClick={() => router.push(`/project?id=${formatTitle(proj.title)}`)}
                                className="group relative block rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-left"
                            >
                                <img
                                    src={proj.thumbnail}
                                    alt={proj.title}
                                    loading="lazy"
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                <div className="absolute inset-0 bg-black/40 hover:backdrop-blur-xs hover:bg-black/80 flex flex-row justify-between">
                                    <div className="flex flex-col justify-end p-4">
                                        <h2 className="text-lg font-bold text-white">{proj.title}</h2>

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {proj.filters.map((filter) => (
                                                <span
                                                    key={filter}
                                                    className="text-xs font-semibold text-green-200 bg-green-900/50 px-2 py-0.5 rounded-full"
                                                >
                                                    {filter}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {proj.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-medium text-white/80 bg-black/30 px-2 py-0.5 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-fit h-full flex flex-col justify-end">
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                            <CircleButton radius={50} strokeWidth={4}>
                                                <Image src={arrow} alt={proj.title} />
                                            </CircleButton>
                                        </a>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
