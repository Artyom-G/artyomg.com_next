"use client";

import React from "react";

interface MarkdownRendererYoutubeProps {
  embedId: string;
}

const MarkdownRendererYoutube: React.FC<MarkdownRendererYoutubeProps> = ({ embedId }: any) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 aspect-video">
      <iframe
        className="w-full h-full rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${embedId}`}
        title="Embedded YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default MarkdownRendererYoutube;
