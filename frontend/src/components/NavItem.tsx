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
        <Link
            href={to}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex min-w-[140px] justify-center rounded-full px-4 py-2 text-sm font-semibold tracking-[0.2em] text-white
                transition-all duration-300 ease-out ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"} active:scale-95`}
        >
            <span
                className={`relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:rounded-full
                    after:bg-green-400 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-100"}`}
            >
                {children}
            </span>
        </Link>
    );
};

export default NavItem;
