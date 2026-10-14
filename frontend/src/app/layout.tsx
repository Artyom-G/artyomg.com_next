import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: {
        default: "Artyom Gabtraupov",
        template: "%s | Artyom Gabtraupov",
    },
    description: "Artyom Gabtraupov personal portfolio | CS @ UWaterloo",
    openGraph: {
        title: "Artyom Gabtraupov",
        description: "Artyom Gabtraupov personal portfolio | CS @ UWaterloo",
        url: "https://artyomg.com",
        siteName: "ArtyomG",
        type: "website",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#13211b",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className={`${inter.className} scrollbar-thin antialiased`}>
                <NavBar />
                <main>{children}</main>
            </body>
        </html>
    );
}
