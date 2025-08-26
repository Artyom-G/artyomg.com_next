"use client";

import React, { useState, useEffect } from "react";

interface MarkdownRendererIFrameProps {
    src: string;
    width?: string | number;
    height?: string | number;
    scrolling?: "yes" | "no" | "auto";
    minWidth?: number;
    minHeight?: number;
}

const MarkdownRendererIFrame: React.FC<MarkdownRendererIFrameProps> = ({
    src,
    width = "100%",
    height = "500px",
    scrolling = "no",
    minWidth = 600,
    minHeight = 400,
}) => {
    const [overlayActive, setOverlayActive] = useState(true);
    const [showBiggerScreenMsg, setShowBiggerScreenMsg] = useState(false);

    // Check screen size
    useEffect(() => {
        const checkScreen = () => {
            if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
                setShowBiggerScreenMsg(true);
            } else {
                setShowBiggerScreenMsg(false);
            }
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, [minWidth, minHeight]);

    return (
        <div className="relative w-full max-w-5xl mx-auto my-8 flex justify-center">
            {showBiggerScreenMsg ? (
                <div className="flex flex-col items-center justify-center border-4 border-primary rounded-xl py-16 px-6 text-center w-full">
                    <p className="text-gray-300 text-base">
                        This content is interactive — please use a bigger screen
                    </p>
                </div>
            ) : (
                <div className="relative w-full" style={{ maxWidth: width }}>
                    {/* IFrame */}
                    <iframe
                        className={`rounded-lg border-none`}
                        src={src}
                        width={width}
                        height={height}
                        scrolling={scrolling}
                        title="Embedded Interactive Content"
                    />

                    {/* Overlay */}
                    {overlayActive && (
                        <div
                            onClick={() => setOverlayActive(false)}
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-60 text-primary font-bold text-lg rounded-lg cursor-pointer animate-breathing"
                        >
                            Click to Interact
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarkdownRendererIFrame;
