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
                    h1: ({ node, ...props }) => (
                        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg mb-6 mt-16" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-2xl font-bold text-white drop-shadow-md mb-4 mt-12" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-semibold text-white mb-3 mt-8" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="text-gray-300 text-lg leading-relaxed mb-4 font-mono text-justify" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="text-gray-300 text-lg leading-relaxed mb-2 font-mono" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a className="text-cyan-400 hover:text-cyan-200 underline decoration-cyan-400" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="text-white font-bold" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                        <em className="text-purple-300 italic" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-pink-500 pl-4 italic text-gray-400 mb-4" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }) => (
                        <code className={`${inline ? "px-1 py-0.5 rounded text-yellow-300 bg-gray-900 font-mono" : 
                                "block p-4 my-4 rounded-lg bg-gray-900 text-yellow-300 font-mono overflow-x-auto"}`}
                            {...props}
                        >
                            {children}
                        </code>
                    ),
                    youtube: ({ embedid }) => <MarkdownRendererYoutube embedId={embedid} />,
                    picture: ({ src, alt }) => <MarkdownRendererImage src={src} alt={alt} />,
                    embed: ({ src, width, height, scrolling }) => (<MarkdownRendererIFrame src={src} width={width} height={height} scrolling={scrolling} />
                    ),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
