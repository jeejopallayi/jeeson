"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoEmbedProps = {
  src: string;
  title: string;
  thumbnail?: string;
  className?: string;
};

export function VideoEmbed({ src, title, thumbnail, className }: VideoEmbedProps) {
  const [activated, setActivated] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black",
        className
      )}
    >
      {activated ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group relative flex h-full w-full items-center justify-center overflow-hidden text-left"
          aria-label={`Play ${title}`}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 transition-colors duration-200 group-hover:bg-black/50">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              <Play className="mr-2 h-4 w-4" /> Play Video
            </span>
            <p className="text-sm text-gray-200 text-center px-6">{title}</p>
          </div>
        </button>
      )}
    </div>
  );
}
