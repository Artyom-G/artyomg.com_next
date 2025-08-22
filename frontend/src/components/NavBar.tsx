"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import NavItem from './NavItem';

const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'CONTACT', path: '/contact' },
];

const NavBar: React.FC = () => {
    const pathname = usePathname();

    return (
        <header className="w-full flex justify-center fixed top-10 left-0 right-0 z-50 p-6">
            <nav className="w-full max-w-[1200px] container mx-auto flex items-center justify-between px-4">
                <Logo />
                <div className="flex items-center space-x-8 bg-[#183932]/70 backdrop-blur-md rounded-full px-10 py-4 shadow-lg">
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
