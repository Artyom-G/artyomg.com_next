"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownRendererImage from "./MarkdownRendererImage";
import MarkdownRendererYoutube from "./MarkdownRendererYoutube";
import MarkdownRendererIFrame from "./MarkdownRendererIFrame";

interface MarkdownRendererProps {
    children: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ children }) => {
    return (
        <div className="w-full flex flex-col text-gray-200 gap-2">
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ node, ...props } : any) => (
                        <h1 className="serif text-3xl md:text-4xl font-semibold text-white mb-6 mt-14" {...props} />
                    ),
                    h2: ({ node, ...props } : any) => (
                        <h2 className="serif text-2xl md:text-3xl font-semibold text-white mb-4 mt-12 pb-2 border-b border-white/10" {...props} />
                    ),
                    h3: ({ node, ...props } : any) => (
                        <h3 className="text-xl font-semibold text-green-300 mb-3 mt-8" {...props} />
                    ),
                    p: ({ node, ...props } : any) => (
                        <p className="text-gray-300 text-[1.05rem] md:text-lg leading-8 mb-4" {...props} />
                    ),
                    ul: ({ node, ...props } : any) => (
                        <ul className="list-disc pl-6 mb-4 marker:text-green-400" {...props} />
                    ),
                    ol: ({ node, ...props } : any) => (
                        <ol className="list-decimal pl-6 mb-4 marker:text-green-400" {...props} />
                    ),
                    li: ({ node, ...props } : any) => (
                        <li className="text-gray-300 text-[1.05rem] md:text-lg leading-8 mb-1 pl-1" {...props} />
                    ),
                    a: ({ node, ...props } : any) => (
                        <a className="text-green-300 underline decoration-green-400/50 underline-offset-4 hover:text-green-200 hover:decoration-green-300" {...props} />
                    ),
                    strong: ({ node, ...props } : any) => (
                        <strong className="text-white font-semibold" {...props} />
                    ),
                    em: ({ node, ...props } : any) => (
                        <em className="text-white/90 italic" {...props} />
                    ),
                    blockquote: ({ node, ...props } : any) => (
                        <blockquote className="glass rounded-r-xl border-l-4 border-green-400 px-5 py-3 italic text-gray-300 mb-4" {...props} />
                    ),
                    pre: ({ node, ...props } : any) => (
                        <pre className="my-6 overflow-x-auto rounded-xl bg-black/40 p-5 text-sm leading-6 ring-1 ring-inset ring-white/10 [&>code]:bg-transparent [&>code]:p-0 [&>code]:ring-0" {...props} />
                    ),
                    code: ({ node, className, children, ...props } : any) => (
                        <code className="px-1.5 py-0.5 rounded-md text-green-200 bg-black/40 font-mono text-[0.9em] ring-1 ring-inset ring-white/10"
                            {...props}
                        >
                            {children}
                        </code>
                    ),
                    youtube: ({ embedid }: any) => <MarkdownRendererYoutube embedId={embedid} />,
                    picture: ({ src, alt }: any) => <MarkdownRendererImage src={src} alt={alt} />,
                    embed: ({ src, width, height, scrolling }: any) => <MarkdownRendererIFrame src={src} width={width} height={height} scrolling={scrolling} />,
                } as any}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
