"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "@/components/Button";

const ContactPage: React.FC = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [isSent, setIsSent] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
            )
            .then(
                () => {
                    setIsSent(true);
                    setIsSuccessful(true);
                },
                () => {
                    setIsSent(true);
                    setIsSuccessful(false);
                }
            );
    };

    const glassmorphismStyles: React.CSSProperties = {
        background: isHovered ? "rgba(24, 57, 50, 0.8)" : "rgba(24, 57, 50, 0.7)",
        backdropFilter: "blur(4px) saturate(150%)",
        WebkitBackdropFilter: "blur(4px) saturate(150%)",
        transition: "all 0.3s ease",
    };

    return (
        <div
            id="contact"
            className="relative flex min-h-screen w-full items-center justify-center px-4 py-16"
        >
            {!isSent ? (
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    style={glassmorphismStyles}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-full max-w-md rounded-xl p-6 shadow-xl space-y-4"
                >
                    <h2 className="mb-4 text-center text-2xl font-semibold text-white">
                        Keep in Touch :)
                    </h2>

                    <div className="mb-6 transition-all duration-300 hover:shadow-2xl hover:mb-8">
                        <label className="block mb-1 text-white text-sm">Name</label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            className="w-full resize-none rounded-b-xl bg-black/30 px-3 py-2 text-sm text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="mb-6 transition-all duration-300 hover:shadow-2xl hover:mb-8">
                        <label className="block mb-1 text-white text-sm">Email</label>
                        <input
                            type="email"
                            name="user_email"
                            required
                            className="w-full resize-none rounded-b-xl bg-black/30 px-3 py-2 text-sm text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="mb-6 transition-all duration-300 hover:shadow-2xl hover:mb-8">
                        <label className="block mb-1 text-white text-sm">Message</label>
                        <textarea
                            name="message"
                            required
                            className="h-28 w-full resize-none rounded-b-xl bg-black/30 px-3 py-2 text-sm text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <Button
                        type="submit"
                        size="md"
                        className="w-full min-w-[280px] max-w-[480px] shadow-2xl transition-all duration-300 hover:shadow-2xl"
                    >
                        Send
                    </Button>
                </form>
            ) : (
                <>
                    {isSuccessful ? (
                        <h1 className="text-lg font-semibold">
                            Message has been sent!
                        </h1>
                    ) : (
                        <h1 className="text-lg font-semibold">
                            Message failed to send
                        </h1>
                    )}
                </>
            )}
        </div>
    );
};

export default ContactPage;
