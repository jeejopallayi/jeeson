import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { VideoEmbed } from "@/components/ui/video-embed";

export const metadata: Metadata = {
  title: "Videos | Performance Reels",
  description: "Watch magic and mentalism performances by Jeeson Franz.",
};

const videos = [
  {
    title: "Showreel",
    description: "Signature moments and highlights (replace with Adilo embed URL).",
    src: "https://iframe.mediadelivery.net/embed/YOUR-ADILO-VIDEO-ID-1",
    thumbnail: "/images/gallery-1.jpg",
  },
  {
    title: "Corporate Performance",
    description: "Stage and corporate crowd reactions (replace with Adilo embed URL).",
    src: "https://iframe.mediadelivery.net/embed/YOUR-ADILO-VIDEO-ID-2",
    thumbnail: "/images/gallery-2.jpg",
  },
  {
    title: "Close-Up Magic",
    description: "Interactive magic moments (replace with Adilo embed URL).",
    src: "https://iframe.mediadelivery.net/embed/YOUR-ADILO-VIDEO-ID-3",
    thumbnail: "/images/gallery-3.jpg",
  },
];

export default function VideosPage() {
  return (
    <>
      <Section className="pt-32 pb-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Videos</h1>
          <p className="text-xl text-gray-400">Performance reels and featured clips.</p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.title} className="space-y-3">
              <VideoEmbed src={video.src} title={video.title} thumbnail={video.thumbnail} />
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <p className="text-gray-400 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
