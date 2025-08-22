"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particles from "@/assets/particles";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import Button from "@/components/Button";

export default function Home() {
    const router = useRouter();
    const [init, setInit] = useState(false);

    const handleNavigateToContact = () => {
        router.push("/contact");
    };

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => setInit(true));
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background Particles */}
            {init && (
                <Particles
                id="tsparticles"
                options={particles}
                className="absolute inset-0 -z-10"
                />
            )}

            {/* Main Home Content */}
            <div id="home" className="relative flex flex-col justify-center items-center min-h-screen text-white gap-8" >
                {/* Text Section */}
                <div className="flex justify-center items-center pt-24 text-center">
                    <h1 className="font-semibold text-[clamp(3rem,8vw,7rem)] leading-[clamp(3.2rem,9vw,7.5rem)] tracking-tight overflow-hidden whitespace-nowrap">
                        Hello, I am Artyom
                        <br />
                        I am{" "}
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
                    </h1>
                </div>

                {/* Contact Button */}
                <div className="w-full flex justify-center mt-6">
                    <Button
                        onClick={handleNavigateToContact}
                        size="lg"
                        className="w-full min-w-[280px] max-w-[680px] shadow-lg"
                    >
                        Send Me a Message
                    </Button>
                </div>

                {/* Footer */}
                <div className="fixed bottom-10 right-10 w-full p-6 text-right text-white/60 text-[clamp(0.875rem,1.5vw,1rem)] font-medium tracking-wide">
                    This is a Next.js Website, the Source Code can be Found{" "}
                    <a
                        href="https://github.com/Artyom-G/artyomg.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white/70"
                    >
                        Here
                    </a>
                </div>
            </div>
        </div>
    );
}
