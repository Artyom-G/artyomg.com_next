"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import logoUrl from "@assets/logo.svg";
import Image from 'next/image';

const Logo: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const radius = 70;
    const strokeRadius = 28;
    const circumference = 2 * Math.PI * strokeRadius;
    const logoRadius = 32;

    const ringStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: isHovered ? 0 : circumference,
        transition: 'stroke-dashoffset 0.5s ease-in-out',
    };

    const glassmorphismStyles: React.CSSProperties = {
        background: isHovered ? 'rgba(24, 57, 50, 0.9)' : 'rgba(24, 57, 50, 0.7)',
        backdropFilter: 'blur(4px) saturate(150%)',
        WebkitBackdropFilter: 'blur(4px) saturate(150%)',
        width: `${radius}px`,
        height: `${radius}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Link
            href="/"
            className="w-40 h-40 relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg viewBox="0 0 104 104" className="absolute">
                <circle cx="52" cy="52" r={strokeRadius} fill="none" stroke={isHovered ? 'rgba(24, 57, 50, 0.9)' : 'rgba(24, 57, 50, 0.7)'} strokeWidth="5" transform="rotate(-90 52 52)" style={ringStyle} />
            </svg>
            <div 
                className={`absolute rounded-full shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl ${isHovered ? 'scale-85' : 'scale-100'}`}
                style={glassmorphismStyles}
            >
                <Image src={logoUrl} alt="AryomG Logo" width={logoRadius} height={logoRadius} />
            </div>
        </Link>
    );
};

export default Logo;
