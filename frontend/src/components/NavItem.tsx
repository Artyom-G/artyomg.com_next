"use client";

import React from 'react';
import Link from 'next/link';
import Button from './Button';

interface NavItemProps {
    to: string;
    isActive: boolean;
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, isActive, children }) => {
    return (
        <Link href={to} className="inline-block"> 
            <Button 
                size="sm"
                className={`flex w-fit min-w-[100px] justify-center text-sm font-semibold tracking-widest transition-all ${
                    isActive ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
            >
                {children}
            </Button>
        </Link>
    );
};

export default NavItem;
