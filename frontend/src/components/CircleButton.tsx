"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

interface LogoProps {
    onClick?: (e: React.MouseEvent) => void;
    radius: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}

const BASE = 70;
const VB_SIZE = 104;
const VB_HALF = VB_SIZE / 2;

/**
 * Proportions from your original design when radius === 70:
 * - Outer wrapper ~160
 * - Glass (inner) = 70
 * - Icon = 32
 * - Ring radius (in viewBox units) = 28
 */
const OUTER_BASE = 160;
const GLASS_BASE = 70;
const ICON_BASE = 32;
const RING_R_BASE_VB = 12;
const RING_R_BASE_VB_CONSTANT = 16;

const Logo: React.FC<LogoProps> = ({ onClick, radius, strokeWidth = 4, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Master scale relative to base design (70)
    const scale = radius / BASE;

    // Pixel sizes (use inline styles so they actually apply at runtime)
    const outerPx = OUTER_BASE * scale;
    const glassPx = GLASS_BASE * scale;
    const iconPx = ICON_BASE * scale;

    // Convert px stroke to viewBox units for safe clamping
    const pxToVB = VB_SIZE / outerPx;
    const strokeVB = strokeWidth * pxToVB;

    // Ring radius in viewBox units, scaled and clamped so it never overflows the box
    const ringR = useMemo(() => {
        const scaled = RING_R_BASE_VB * scale + RING_R_BASE_VB_CONSTANT;
        const maxSafe = VB_HALF - strokeVB / 2 - 1;
        return Math.max(0, Math.min(scaled, maxSafe));
    }, [scale, strokeVB]);

    const circumference = 2 * Math.PI * ringR;

    const ringStyle: React.CSSProperties = {
        strokeDasharray: circumference,
        strokeDashoffset: isHovered ? 0 : circumference,
        transition: "stroke-dashoffset 0.5s ease-in-out",
    };

    const glassStyle: React.CSSProperties = {
        background: isHovered ? "rgba(24, 57, 50, 0.9)" : "rgba(24, 57, 50, 0.7)",
        backdropFilter: "blur(4px) saturate(150%)",
        WebkitBackdropFilter: "blur(4px) saturate(150%)",
        width: `${glassPx}px`,
        height: `${glassPx}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${isHovered ? 0.8 : 1})`,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    };

    return (
        <button
            onClick={onClick}
            className="relative flex items-center justify-center"
            style={{ width: outerPx, height: outerPx }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* SVG scales to wrapper; ring dimensions live in viewBox space */}
            <svg
                viewBox={`0 0 ${VB_SIZE} ${VB_SIZE}`}
                className="absolute inset-0"
                style={{ width: "100%", height: "100%" }}
                aria-hidden
            >
                <circle
                    cx={VB_HALF}
                    cy={VB_HALF}
                    r={ringR}
                    fill="none"
                    stroke={isHovered ? "rgba(24, 57, 50, 0.9)" : "rgba(24, 57, 50, 0.7)"}
                    strokeWidth={strokeWidth}
                    transform={`rotate(-90 ${VB_HALF} ${VB_HALF})`}
                    style={ringStyle}
                />
            </svg>

            {/* Glass center */}
            <div
                className="absolute rounded-full shadow-xl hover:shadow-2xl"
                style={glassStyle}
            >
                <div style={{ width: iconPx, height: iconPx }}>
                    {children}
                </div>
            </div>
        </button>
    );
};

export default Logo;
