"use client";

import React from "react";

interface SpinnerProps {
    size?: number;       // diameter in px
    thickness?: number;  // border thickness in px
    color?: string;      // tailwind color class, e.g. "border-green-500"
}

const Spinner: React.FC<SpinnerProps> = ({
    size = 40,
    thickness = 4,
    color = "border-white",
}) => {
    return (
        <div
            className={`animate-spin rounded-full border-t-transparent ${color}`}
            style={{
                width: size,
                height: size,
                borderWidth: thickness,
                borderStyle: "solid",
            }}
            aria-label="Loading"
        />
    );
};

export default Spinner;
