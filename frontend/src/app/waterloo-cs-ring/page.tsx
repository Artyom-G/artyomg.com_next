"use client";

import React, { useEffect, useState } from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import particles from "@/assets/particles_calm";
import WaterlooCSRing from "@/components/WaterlooCSRing";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";

const MAX_COOKIES = 12;

export default function WaterlooCSRingPage() {
    const router = useRouter();
    const [cookieArt, setCookieArt] = useState<string>("");
    const [cookies, setCookies] = useState<number[]>([]); // each click adds a cookie instance

    // Fetch the ASCII art from public folder
    useEffect(() => {
        fetch("/cookie.txt")
            .then((res) => res.text())
            .then((text) => setCookieArt(text))
            .catch((err) => console.error("Failed to load cookie ASCII art:", err));
    }, []);

    const jarIsFull = cookies.length >= MAX_COOKIES;

    const claimCookie = () => {
        if (jarIsFull) return;
        setCookies((prev) => [...prev, prev.length]); // append new cookie
    };

    return (
        <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-5 pt-12 pb-28 text-white sm:pt-40 sm:pb-20">
            <BackgroundParticles particles={particles} />

            <section className="animate-fade-up glass relative z-10 w-full max-w-lg rounded-3xl p-6 text-center shadow-2xl sm:p-10">
                <span className="inline-block rounded-full bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-green-300/90 ring-1 ring-inset ring-white/10">
                    Waterloo CS Webring
                </span>

                <h1 className="serif mt-5 text-[clamp(2rem,7vw,2.75rem)] font-semibold leading-tight tracking-tight">
                    Hello, Traveler
                </h1>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/65 sm:text-base">
                    Seems like you are stuck in a ring. Hop to a neighbour, or stay a while,
                    virtual cookies have been provisioned.
                </p>

                {/* Webring navigation */}
                <div className="mt-6 rounded-2xl bg-black/20 ring-1 ring-inset ring-white/5">
                    <WaterlooCSRing />
                </div>

                {/* Cookies */}
                <div className="mt-6">
                    <button
                        onClick={claimCookie}
                        disabled={jarIsFull}
                        className="inline-flex min-h-0 items-center gap-2 rounded-full bg-amber-200/10 px-4 py-2 text-xs font-semibold tracking-wide text-amber-200 ring-1 ring-inset ring-amber-200/30 transition-all hover:bg-amber-200/20 active:scale-95 disabled:cursor-default disabled:opacity-60"
                    >
                        <span aria-hidden>🍪</span>
                        {jarIsFull ? "The cookie jar is empty" : "Claim a cookie"}
                        {cookies.length > 0 && (
                            <span className="rounded-full bg-amber-200/20 px-2 py-0.5 text-[10px] tabular-nums">
                                {cookies.length}
                            </span>
                        )}
                    </button>

                    {cookies.length > 0 && cookieArt && (
                        <div className="mt-4 flex max-h-64 flex-wrap justify-center gap-2 overflow-y-auto rounded-2xl bg-black/20 p-3 scrollbar-thin">
                            {cookies.map((c) => (
                                <div
                                    key={c}
                                    className="whitespace-pre rounded-xl bg-black/20 p-2 font-mono text-[7px] leading-none text-amber-200/90"
                                >
                                    <ReactTyped
                                        strings={[cookieArt]}
                                        typeSpeed={2}
                                        backSpeed={0}
                                        showCursor={false}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/35">
                    <span className="h-px flex-1 bg-white/10" />
                    The escape is down below
                    <span className="h-px flex-1 bg-white/10" />
                </div>

                <Button
                    size="sm"
                    className="w-full shadow-lg"
                    onClick={() => router.push("/")}
                >
                    Visit my site
                </Button>
            </section>
        </div>
    );
}
