"use client";

import { useEffect } from "react";
import particles from "@/assets/particles";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import { FaGithub } from "react-icons/fa";
import Button from "@/components/Button";
import BackgroundParticles from "@/components/BackgroundParticles";

export default function HomePage() {
    const router = useRouter();

    // The hero fills the viewport exactly; stop iOS/Android from rubber-banding it
    useEffect(() => {
        const html = document.documentElement;
        const previous = html.style.overscrollBehavior;
        html.style.overscrollBehavior = "none";
        return () => {
            html.style.overscrollBehavior = previous;
        };
    }, []);

    return (
        <div className="relative w-full h-dvh overflow-hidden">
            {/* Background Particles */}
            <BackgroundParticles particles={particles}/>

            {/* Main Home Content */}
            <div
                id="home"
                className="relative flex h-full flex-col items-center justify-center px-6 pb-[calc(4rem+env(safe-area-inset-bottom))] text-white sm:pb-0 sm:pt-24"
            >
                <span className="animate-fade-up glass mb-6 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                    CS @ University of Waterloo
                </span>

                <h1 className="animate-fade-up serif mb-10 text-center font-semibold tracking-tight text-[clamp(2.1rem,8vw,4.25rem)] leading-[1.15] whitespace-nowrap [animation-delay:120ms]">
                    Hello, I am Artyom
                    <br />
                    I am{" "}
                    <span className="text-gradient italic">
                        <ReactTyped
                            strings={[
                                "a Developer",
                                "a Designer",
                                "a Student",
                                "an Enthusiast",
                                "a Creator",
                                "a Learner",
                                "an Innovator",
                            ]}
                            typeSpeed={100}
                            loop
                            backSpeed={20}
                            cursorChar="|"
                            showCursor={true}
                        />
                    </span>
                </h1>

                {/* Calls to action */}
                <div className="animate-fade-up flex w-full max-w-[640px] flex-col gap-3 sm:flex-row [animation-delay:240ms]">
                    <Button
                        onClick={() => router.push("/projects")}
                        size="sm"
                        className="w-full shadow-lg sm:flex-1"
                    >
                        View My Work
                    </Button>
                    <Button
                        onClick={() => router.push("/contact")}
                        size="sm"
                        variant="secondary"
                        className="w-full sm:flex-1"
                    >
                        Send Me a Message
                    </Button>
                </div>

                {/* Footer */}
                <div className="fixed hidden md:flex bottom-0 right-0 items-center gap-2 p-6 text-right text-white/40 text-xs tracking-wide">
                    <FaGithub className="h-3.5 w-3.5" aria-hidden />
                    <span>
                        This is a Next.js/Express.js Website, the Source Code can be Found{" "}
                        <a
                            href="https://github.com/Artyom-G/artyomg.com_next"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white/70"
                        >
                            Here
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
