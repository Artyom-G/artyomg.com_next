"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LoadingScreen from "@/components/LoadingScreen";
import particles from "@/assets/particles_calm";

interface ProjectCard {
    title: string;
    filters: string[];
    tags: string[];
    link: string;
    thumbnail?: string;
}

const BackLink = () => (
    <Link
        href="/projects"
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
    >
        <ArrowLeft size={14} />
        All projects
    </Link>
);

export default function ProjectPage() {
    const [id, setId] = useState<string | null>(null);
    const [checkedUrl, setCheckedUrl] = useState(false);
    const [proj, setProj] = useState<ProjectCard | null>(null);
    const [markdown, setMarkdown] = useState<string>(""); 
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const url = new URL(window.location.href);
        setId(url.searchParams.get("id"));
        setCheckedUrl(true);
    }, []);

    useEffect(() => {
        if (!id) return;

        const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

        Promise.all([
            fetch(`${BACKEND_API}/projects/get_project_card/${id}`).then((r) => {
                if (!r.ok) throw new Error("not found");
                return r.json();
            }),
            fetch(`${BACKEND_API}/projects/get_project_markdown/${id}`).then((r) => r.ok ? r.text() : ""),
        ])
            .then(([card, md]) => {
                setProj(card);
                setMarkdown(md);
            })
            .catch(() => setError("Couldn't load this project."));
    }, [id]);

    if (checkedUrl && (!id || error)) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center text-white">
                <BackgroundParticles particles={particles} />
                <h1 className="serif text-3xl font-semibold">{!id ? "Missing project" : error}</h1>
                <BackLink />
            </div>
        );
    }
    if (!proj) return <LoadingScreen />;

    return (
        <div className="flex flex-col w-full text-white">
            <BackgroundParticles particles={particles} />

            <div className="relative w-full h-[55vh] min-h-[360px] sm:h-[65vh]">
                {proj.thumbnail && (
                    <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#13211b] via-[#13211b]/60 to-black/30" />

                <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-14">
                    <div className="w-full max-w-[1100px] mx-auto px-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="animate-fade-up">
                            <div className="mb-5"><BackLink /></div>
                            <h1 className="serif text-4xl md:text-6xl font-semibold drop-shadow-lg">{proj.title}</h1>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {proj.filters.map((f) => (
                                    <span key={f} className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-semibold text-green-300 ring-1 ring-inset ring-green-400/30">
                                        {f}
                                    </span>
                                ))}
                                {proj.tags.map((t) => (
                                    <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {proj.link && (
                            <a
                                href={proj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="animate-fade-up inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-green-400 px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#0b2a1f] shadow-lg shadow-green-900/40 transition-transform hover:scale-105"
                            >
                                Visit project
                                <ArrowUpRight size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-[1100px] mx-auto px-6 pt-4 pb-40">
                <MarkdownRenderer>{markdown}</MarkdownRenderer>
            </div>
        </div>
    );
}
