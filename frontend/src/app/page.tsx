"use client";

import particles from "@/assets/particles";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import Button from "@/components/Button";
import BackgroundParticles from "@/components/BackgroundParticles";

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
                <div className="fixed bottom-2 right-2 w-full p-6 text-right text-white/40 text-xs tracking-wide">
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
    );
}
