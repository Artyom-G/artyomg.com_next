"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/Button";

type Status = "idle" | "sending" | "sent" | "failed";

const inputClasses =
    "w-full rounded-xl bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 ring-1 ring-inset ring-white/10 transition-shadow focus:outline-none focus:ring-2 focus:ring-green-400";

const ContactPage: React.FC = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<Status>("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setStatus("sending");
        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
            )
            .then(
                () => setStatus("sent"),
                () => setStatus("failed")
            );
    };

    return (
        <div
            id="contact"
            className="relative flex min-h-screen w-full items-center justify-center px-4 pt-16 pb-32 sm:pt-32 sm:pb-16"
        >
            {status === "sent" || status === "failed" ? (
                <div className="animate-fade-up glass flex w-full max-w-md flex-col items-center gap-4 rounded-2xl p-8 text-center shadow-2xl">
                    {status === "sent" ? (
                        <CheckCircle2 className="h-12 w-12 text-green-400" aria-hidden />
                    ) : (
                        <XCircle className="h-12 w-12 text-red-400" aria-hidden />
                    )}
                    <h1 className="serif text-2xl font-semibold text-white">
                        {status === "sent" ? "Message sent!" : "Message failed to send"}
                    </h1>
                    <p className="text-sm text-white/60">
                        {status === "sent"
                            ? "Thanks for reaching out, I'll get back to you soon."
                            : "Something went wrong on the way. Please try again."}
                    </p>
                    <Button size="sm" variant="secondary" onClick={() => setStatus("idle")}>
                        {status === "sent" ? "Send another" : "Try again"}
                    </Button>
                </div>
            ) : (
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="animate-fade-up glass w-full max-w-md space-y-5 rounded-2xl p-6 shadow-2xl sm:p-8"
                >
                    <div className="pb-3 text-center">
                        <h1 className="serif text-3xl font-semibold text-white">
                            Keep in Touch :)
                        </h1>
                        <p className="mt-2 text-sm text-white/60">
                            Have a question, an idea, or just want to say hi?
                        </p>
                    </div>

                    <div>
                        <label htmlFor="user_name" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/70">Name</label>
                        <input
                            id="user_name"
                            type="text"
                            name="user_name"
                            autoComplete="name"
                            placeholder="Your name"
                            required
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label htmlFor="user_email" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/70">Email</label>
                        <input
                            id="user_email"
                            type="email"
                            name="user_email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            required
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/70">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="What's on your mind?"
                            required
                            className={`${inputClasses} h-32 resize-none`}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="sm"
                        disabled={status === "sending"}
                        className="w-full shadow-xl"
                    >
                        {status === "sending" ? "Sending…" : "Send"}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default ContactPage;
