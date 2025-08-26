"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function BackgroundParticles({ particles }) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => setInit(true));
    }, []);

    if(!init){
        return <></>;
    }

    return (
        <Particles
            id="tsparticles"
            options={particles}
            className="absolute inset-0 -z-10"
        />
    );
}

