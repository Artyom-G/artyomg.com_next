import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ArtyomG",
    description: "Artyom Gabtraupov personal portfolio | CS @ UWaterloo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} scrollbar-thin`}>
                <NavBar />
                <main>{children}</main>
            </body>
        </html>
    );
}