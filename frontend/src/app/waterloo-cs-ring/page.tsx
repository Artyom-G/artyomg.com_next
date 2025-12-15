"use client";

import React, { useEffect, useState } from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import particles from "@/assets/particles_calm";
import CircleButton from "@/components/CircleButton";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";
import WaterlooCSRing from "@/components/WaterlooCSRing";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen p-6">
            <BackgroundParticles particles={particles} />

            <div className="w-full flex mt-42 mb-42 justify-center">
                <div className="flex flex-col justify-center">
                    <WaterlooCSRing />
                </div>
            </div>
        </div>
    );
}
