"use client";

import React, { useEffect, useState } from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import particles from "@/assets/particles_calm";
import WaterlooCSRing from "@/components/WaterlooCSRing";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";

export default function ProjectsPage() {
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

    const claimCookie = () => {
        setCookies((prev) => [...prev, prev.length]); // append new cookie
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden text-white">
            <BackgroundParticles particles={particles} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center pt-72 px-6 space-y-6">
                <h1 className="serif font-semibold text-[clamp(1.75rem,6vw,2.4rem)] tracking-tight">
                    Hello Traveler
                </h1>

                <div className="text-white/70 max-w-xl text-sm md:text-base leading-relaxed">
                    <p>
                        Seems like you are stuck in a ring
                        <br />
                        But don’t worry, virtual cookies has been provisioned,{" "}
                        <span
                            className="text-green-300 opacity-70 hover:opacity-100 underline cursor-pointer"
                            onClick={claimCookie}
                        >
                            claim cookie
                        </span>
                        .
                    </p>

                    {/* Container for all cookies */}
                    <div className="mt-2 flex flex-wrap gap-1 text-xs leading-[1] font-mono whitespace-pre-wrap text-white justify-center">
                        {cookies.map((c, idx) =>
                            cookieArt ? (
                                <ReactTyped
                                    key={idx}
                                    strings={[cookieArt]}
                                    typeSpeed={2}
                                    backSpeed={0}
                                    startDelay={100 * idx}
                                    showCursor={true}
                                />
                            ) : null
                        )}
                    </div>
                </div>

                <Button
                    size="sm"
                    className="w-[90%] max-w-[320px] shadow-lg"
                    onClick={() => router.push("/")}
                >
                    Back to the main site
                </Button>

                <div className="flex justify-center items-center mt-8 mb-32">
                    <WaterlooCSRing />
                </div>
            </div>
        </div>
    );
}
