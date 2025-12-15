import React, { useEffect, useState } from "react";
import CircleButton from "./CircleButton";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";

const WaterlooCSRing = () => {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        // Function to update isSmall based on window width
        const handleResize = () => {
            setIsSmall(window.innerWidth < 640); // example: <640px = small
        };

        handleResize(); // set initial value
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // You can now adjust sizes based on isSmall
    const prevNextRadius = isSmall ? 40 : 50;
    const prevNextStroke = isSmall ? 2 : 3;
    const centerRadius = isSmall ? 60 : 80;
    const centerStroke = isSmall ? 3 : 4;
    const centerIconSize = isSmall ? 50 : 66;

    return (
        <div className="flex justify-center items-center no-wrap">
            {/* Previous */}
            <a
                href="https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring?nav=prev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
            >
                <CircleButton radius={prevNextRadius} strokeWidth={prevNextStroke}>
                    <Image src={arrow} alt="arrow" className="rotate-180" />
                </CircleButton>
            </a>

            {/* Center */}
            <a
                href="https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
            >
                <CircleButton radius={centerRadius} strokeWidth={centerStroke}>
                    <img
                        src="https://cs.uwatering.com/icon.white.svg"
                        alt="CS Webring"
                        className={`w-[${centerIconSize}px] opacity-[0.8] translate-x-[3px] translate-y-[4px]`}
                    />
                </CircleButton>
            </a>

            {/* Next */}
            <a
                href="https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring?nav=next"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
            >
                <CircleButton radius={prevNextRadius} strokeWidth={prevNextStroke}>
                    <Image src={arrow} alt="arrow" />
                </CircleButton>
            </a>
        </div>
    );
};

export default WaterlooCSRing;
