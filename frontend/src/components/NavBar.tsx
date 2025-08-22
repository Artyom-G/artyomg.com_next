"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import NavItem from './NavItem';

interface NavLink {
    label: string;
    path: string;
}

const navLinks: NavLink[] = [
    { label: 'HOME', path: '/' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'CONTACT', path: '/contact' },
];

const NavBar: React.FC = () => {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    const glassmorphismStyles: React.CSSProperties = {
        background: isHovered ? 'rgba(24, 57, 50, 0.9)' : 'rgba(24, 57, 50, 0.7)',
        backdropFilter: 'blur(10px) saturate(150%)',
        WebkitBackdropFilter: 'blur(10px) saturate(150%)',
        minHeight: '70px',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <header className="flex justify-center fixed top-0 left-0 right-0 z-50 w-full px-6 py-4">
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
                <Logo />
                <div 
                    className="flex items-center space-x-8 rounded-full border border-white/20 px-16 py-5 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:border-white/30 min-w-[480px]"
                    style={glassmorphismStyles}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    role="navigation"
                    aria-label="Main navigation"
                >
                    {navLinks.map((link) => (
                        <NavItem
                            key={link.path}
                            to={link.path}
                            isActive={pathname === link.path}
                        >
                            {link.label}
                        </NavItem>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;