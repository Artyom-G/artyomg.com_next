"use client";

import particles from "@/assets/particles";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import BackgroundParticles from "@/components/BackgroundParticles";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";

export default function HomePage() {
    const router = useRouter();

    const handleNavigateToContact = () => {
        router.push("/contact");
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background Particles */}
            <BackgroundParticles particles={particles}/>

            {/* Main Home Content */}
            <div id="home" className="relative flex flex-col justify-center items-center min-h-screen text-white" >
                {/* Text Section */}
                <div className="flex justify-center items-center pt-24 text-center">
                    <h1 className="serif font-semibold text-[clamp(2rem,8vw,4rem)] leading-[clamp(3rem,9vw,6rem)] tracking-tight overflow-hidden whitespace-nowrap mb-6">
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
                <div className="w-full flex justify-center">
                    <Button
                        onClick={handleNavigateToContact}
                        size="sm"
                        className="w-[90%] max-w-[640px] shadow-lg"
                    >
                        Send Me a Message
                    </Button>
                </div>

                {/* Footer */}
                <div className="fixed hidden md:block bottom-2 right-2 w-full p-6 text-right text-white/40 text-xs tracking-wide">
                    {/* CS Ring */}
                    <div className="flex justify-center items-center">
                        <a href="https://cs.uwatering.com/#artyomg.com?nav=prev" target="_blank" rel="noopener noreferrer" className="inline-flex">
                            <CircleButton radius={40} strokeWidth={3}>
                                <Image src={arrow} alt="arrow" className="rotate-180" />
                            </CircleButton>
                        </a>
                        <a href="https://cs.uwatering.com/#artyomg.com" target="_blank" rel="noopener noreferrer" className="inline-flex">
                            <CircleButton radius={55} strokeWidth={4}>
                                <a href="https://cs.uwatering.com/#artyomg.com" target="_blank">
                                    <img src="https://cs.uwatering.com/icon.white.svg" alt="CS Webring" className="w-[24px] opacity-[0.8] translate-x-[1px] translate-y-[2px]"/>
                                </a>
                            </CircleButton>
                        </a>
                        <a href="https://cs.uwatering.com/#artyomg.com?nav=next" target="_blank" rel="noopener noreferrer">
                            <CircleButton radius={40} strokeWidth={3}>
                                <Image src={arrow} alt="arrow" />
                            </CircleButton>
                        </a>
                    </div>

                    {/* Source Code */}
                    <div className="mt-3">
                        This is a Next.js/Express.js Website, the Source Code can be Found{" "}
                        <a
                            href="https://github.com/Artyom-G/artyomg.com_next"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white/70"
                        >
                            Here
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
