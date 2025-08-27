"use client";

import React from "react";
import Link from "next/link";

interface NavItemProps {
    to: string;
    isActive: boolean;
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, isActive, children }) => {
    return (
        <Link href={to} className="inline-block">
            <button
                className={`relative flex w-fit min-w-[140px] justify-center rounded-lg px-4 py-2 text-lg font-semibold tracking-widest text-white mt-2
                    transition-all duration-300 ease-out ${isActive ? "opacity-100 scale-105" : "opacity-60 hover:opacity-90 hover:scale-105"} active:scale-95`}
                aria-current={isActive ? "page" : undefined}
            >
                <span
                    className={`relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0
                        after:bg-white after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100 after:bg-white/60"}`}
                >
                    {children}
                </span>
            </button>
        </Link>
    );
};

export default NavItem;
