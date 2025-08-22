"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import logoUrl from "@assets/logo.svg";
import Image from 'next/image';

const Logo: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const logoSize = 30;

    const ringStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: isHovered ? 0 : circumference,
        transition: 'stroke-dashoffset 0.5s ease-in-out',
    };

    return (
        <Link
            href="/"
            className="w-40 h-40 relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg viewBox="0 0 104 104">
                <circle cx="52" cy="52" r={radius} fill="none" stroke="white" strokeWidth="5" transform="rotate(-90 52 52)" style={ringStyle} />
            </svg>
            <div className={`absolute flex items-center justify-center w-26 h-26 bg-[#183932]/70 backdrop-blur-md rounded-full shadow-lg transition-transform duration-300 ease-in-out 
                    ${isHovered ? 'scale-80' : 'scale-100'}`} >
                <Image src={logoUrl} alt="AryomG Logo" width={logoSize} height={logoSize} />
            </div>
        </Link>
    );
};

export default Logo;
