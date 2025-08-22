"use client";

import React from 'react';
import Link from 'next/link';

interface NavItemProps {
    to: string;
    isActive: boolean;
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, isActive, children }) => {
    return (
        <Link href={to}> 
            <button className={`flex w-fit min-w-[200px] justify-center text-sm font-semibold tracking-widest transition-colors duration-300`} >
                <span className="relative py-1 w-fit">
                    {children}
                </span>
            </button>
        </Link>
    );
};

export default NavItem;
