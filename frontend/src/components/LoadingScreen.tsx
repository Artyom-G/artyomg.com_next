"use client";

import React, { useMemo } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import BackgroundParticles from "./BackgroundParticles";
import particles from "@/assets/particles_calm";

const tips: string[] = [
    "Spam 'A' to load faster",
    "Loading… please insert caffeine",
    "Pro tip: The mitochondria is the powerhouse of the cell",
    "Almost there… unless the rats ate the data",
    "тузик is on my keybofdsomkfdskfldsm",
    "Hold your breath, it helps bits travel faster",
    "If loading takes too long, try blowing on your router",
    "Fetching via the fastest pigeon mail",
    "Hold on, let me get some tea",
    "Shoot, the cogs are jammed",
];

const LoadingScreen: React.FC = () => {
    // Pick a random tip only once per mount
    const randomTip = useMemo(() => {
        return tips[Math.floor(Math.random() * tips.length)];
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white space-y-6">
            <BackgroundParticles particles={particles}/>
            <LoadingSpinner size={70} thickness={6} color="border-green-400" />
            <p className="text-lg font-semibold animate-pulse text-center px-6">
                {randomTip}
            </p>
        </div>
    );
};

export default LoadingScreen;
