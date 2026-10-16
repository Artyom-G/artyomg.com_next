import React, { useEffect, useState } from "react";
import CircleButton from "./CircleButton";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";

const RING_URL = "https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring";

const WaterlooCSRing = () => {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const prevNextRadius = isSmall ? 34 : 46;
    const prevNextStroke = isSmall ? 2 : 3;
    const centerRadius = isSmall ? 52 : 70;
    const centerStroke = isSmall ? 3 : 4;
    // Every slot is as tall as the center button (CircleButton is 160px at radius 70) so labels line up
    const rowHeight = (160 * centerRadius) / 70;

    const items = [
        {
            label: "Previous",
            ariaLabel: "Previous site in the Waterloo CS webring",
            href: `${RING_URL}?nav=prev`,
            radius: prevNextRadius,
            stroke: prevNextStroke,
            icon: <Image src={arrow} alt="" className="rotate-180" />,
        },
        {
            label: "Webring",
            ariaLabel: "Waterloo CS webring home",
            href: RING_URL,
            radius: centerRadius,
            stroke: centerStroke,
            icon: (
                <img
                    src="https://cs.uwatering.com/icon.white.svg"
                    alt=""
                    className="w-full opacity-90"
                />
            ),
        },
        {
            label: "Next",
            ariaLabel: "Next site in the Waterloo CS webring",
            href: `${RING_URL}?nav=next`,
            radius: prevNextRadius,
            stroke: prevNextStroke,
            icon: <Image src={arrow} alt="" />,
        },
    ];

    return (
        <nav className="flex items-center justify-center" aria-label="Waterloo CS webring">
            {items.map((item) => (
                <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="group inline-flex flex-col items-center"
                >
                    <span className="flex items-center" style={{ height: rowHeight }}>
                        <CircleButton as="span" radius={item.radius} strokeWidth={item.stroke}>
                            {item.icon}
                        </CircleButton>
                    </span>
                    <span className="-mt-5 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-green-300 sm:-mt-7">
                        {item.label}
                    </span>
                </a>
            ))}
        </nav>
    );
};

export default WaterlooCSRing;
