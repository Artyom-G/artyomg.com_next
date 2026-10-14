"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";
import particles from "@/assets/particles_calm";
import LoadingScreen from "@/components/LoadingScreen";

type Project = {
    title: string;
    filters: string[];
    tags: string[];
    link: string;
    thumbnail?: string;
};

const ALL = "All";

export default function ProjectsPage() {
    const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeFilter, setActiveFilter] = useState(ALL);

    const formatTitle = (title: string) => title.toLowerCase().replace(/\s+/g, "_");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/projects/get_all_project_cards`);
                const data: Project[] = await res.json();

                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [BACKEND_API]);

    const filters = useMemo(() => {
        const unique = new Set(projects.flatMap((p) => p.filters));
        return [ALL, ...unique];
    }, [projects]);

    const visibleProjects = useMemo(
        () => activeFilter === ALL ? projects : projects.filter((p) => p.filters.includes(activeFilter)),
        [projects, activeFilter]
    );

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <div className="min-h-screen px-6">
            <BackgroundParticles particles={particles} />

            <div className="mx-auto w-full max-w-[1200px] pt-16 pb-32 sm:pt-44">
                {/* Header */}
                <header className="animate-fade-up mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-green-400/80">
                            Portfolio
                        </p>
                        <h1 className="serif text-4xl font-semibold text-white md:text-5xl">
                            Things I&apos;ve Built
                        </h1>
                        <p className="mt-3 max-w-xl text-sm text-white/60 md:text-base">
                            Games, web apps, bots and experiments. Click a card to read more.
                        </p>
                    </div>

                    {/* Filters */}
                    {filters.length > 1 && (
                        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
                            {filters.map((filter) => {
                                const active = filter === activeFilter;
                                return (
                                    <button
                                        key={filter}
                                        role="tab"
                                        aria-selected={active}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`min-h-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                                            active
                                                ? "bg-green-400 text-[#0b2a1f] shadow-lg shadow-green-900/40"
                                                : "glass text-white/70 hover:text-white"
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </header>

                {error && (
                    <p className="glass rounded-xl p-6 text-center text-white/70">
                        Couldn&apos;t load projects right now. Please try again later.
                    </p>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {visibleProjects.map((proj) => (
                        <article
                            key={proj.title}
                            className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-black/30 shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-green-400/40"
                        >
                            <img
                                src={proj.thumbnail}
                                alt=""
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/0 transition-colors duration-300 group-hover:via-black/60" />

                            <Link
                                href={`/project?id=${formatTitle(proj.title)}`}
                                aria-label={proj.title}
                                className="absolute inset-0 z-10 rounded-2xl"
                            />

                            <div className="relative flex items-end justify-between gap-4 p-5">
                                <div className="min-w-0">
                                    <h2 className="text-lg font-bold text-white">{proj.title}</h2>

                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {proj.filters.map((filter) => (
                                            <span
                                                key={filter}
                                                className="rounded-full bg-green-400/15 px-2 py-0.5 text-[11px] font-semibold text-green-300 ring-1 ring-inset ring-green-400/30"
                                            >
                                                {filter}
                                            </span>
                                        ))}
                                        {proj.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {proj.link && (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${proj.title}`}
                                        className="glass relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 hover:bg-green-400 hover:text-[#0b2a1f]"
                                    >
                                        <ArrowUpRight size={20} />
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
