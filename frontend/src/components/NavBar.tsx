"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Link from "next/link";
import { Home, FolderKanban, Mail } from "lucide-react"; // icon library, you can swap with Heroicons/FontAwesome

interface NavLink {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

const navLinks: NavLink[] = [
    { label: "HOME", path: "/", icon: <Home size={20} /> },
    { label: "PROJECTS", path: "/projects", icon: <FolderKanban size={20} /> },
    { label: "CONTACT", path: "/contact", icon: <Mail size={20} /> },
];

const NavBar: React.FC = () => {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    // trailingSlash: true yields "/projects/"; a single project lives under "/project/"
    const isActive = (path: string) => {
        const current = pathname.replace(/\/+$/, "") || "/";
        if (path === "/projects") return current === "/projects" || current === "/project";
        return current === path;
    };

    const glassmorphismStyles: React.CSSProperties = {
        background: isHovered
            ? "rgba(24, 57, 50, 0.8)"
            : "rgba(24, 57, 50, 0.7)",
        backdropFilter: "blur(4px) saturate(150%)",
        WebkitBackdropFilter: "blur(4px) saturate(150%)",
        minHeight: "70px",
        display: "flex",
        alignItems: "center",
    };

    return (
        <>
            {/* Desktop Navbar */}
            <header className="hidden sm:flex justify-center fixed top-0 left-0 right-0 z-50 w-full px-6 py-4">
                <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4">
                    <Logo />
                    <div
                        className="flex justify-center items-center space-x-2 rounded-full py-3 min-w-[480px] shadow-xl ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
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
                                isActive={isActive(link.path)}
                            >
                                {link.label}
                            </NavItem>
                        ))}
                    </div>
                </nav>
            </header>

            {/* Mobile Bottom Bar */}
            <nav
                className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[rgba(18,44,38,0.85)] backdrop-blur-lg border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
                aria-label="Main navigation"
            >
                <div className="flex justify-around items-center h-16">
                    {navLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                aria-current={active ? "page" : undefined}
                                className={`flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-1.5 text-[10px] font-semibold tracking-widest transition-colors ${
                                    active ? "text-green-400 bg-white/5" : "text-gray-300"
                                }`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
