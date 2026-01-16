import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { VideoEmbed } from "@/components/ui/video-embed";

export const metadata: Metadata = {
  title: "Videos | Performance Reels",
  description: "Watch magic and mentalism performances by Jeeson Franz.",
};

type VideoItem = {
  title: string;
  src: string;
  thumbnail?: string;
  description?: string;
};

const videos: VideoItem[] = [
  { title: "VID-20251114-WA0011", src: "https://adilo.bigcommand.com/watch/JwfoLS0d" },
  { title: "VID20251220180453", src: "https://adilo.bigcommand.com/watch/CcUCK9ec" },
  { title: "VID20251220180149", src: "https://adilo.bigcommand.com/watch/y9C_VEsD" },
  { title: "VID_20260109095132213", src: "https://adilo.bigcommand.com/watch/0pMYWy4r" },
  { title: "VID-20251115-WA0034", src: "https://adilo.bigcommand.com/watch/vT4msnkk" },
  { title: "VID20251220180250", src: "https://adilo.bigcommand.com/watch/4FNr0TQ0" },
  { title: "VID-20251115-WA0022(1)", src: "https://adilo.bigcommand.com/watch/MWfvT1ZS" },
  { title: "VID-20250827-WA0068", src: "https://adilo.bigcommand.com/watch/LXS6knqS" },
  { title: "VID20251220181843", src: "https://adilo.bigcommand.com/watch/oETGKjpx" },
  { title: "AQM2dlARcr-WIQSnHnK_klkrg4qSXFgDbI4eWx40yEVMdJkME40E9V_i-sDqku-F6BLIX35fzbdMvv3EvbhReg45ufPa1gUfEP3...", src: "https://adilo.bigcommand.com/watch/LAnEJkjh" },
  { title: "VID_20251217_220925_144", src: "https://adilo.bigcommand.com/watch/oSX7eqhE" },
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
                <h2 className="text-xl font-semibold break-words">{video.title}</h2>
                {video.description ? (
                  <p className="text-gray-400 text-sm">{video.description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
