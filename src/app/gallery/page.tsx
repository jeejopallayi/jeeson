import { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Gallery | Photos & Videos",
  description: "Watch performance reels and view photos of Jeeson Franz in action.",
};

export default function GalleryPage() {
  return (
    <>
      <Section className="pt-32 pb-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Media Gallery</h1>
          <p className="text-xl text-gray-400">
            Witness the magic.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-8">Performance Videos</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Placeholder for YouTube Embeds */}
          <div className="aspect-video bg-black border border-white/10 rounded-lg flex items-center justify-center text-gray-500 relative group overflow-hidden">
             <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <span className="flex items-center gap-2 font-medium">[YouTube Reel Placeholder]</span>
             </div>
          </div>
           <div className="aspect-video bg-black border border-white/10 rounded-lg flex items-center justify-center text-gray-500 relative group overflow-hidden">
             <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <span className="flex items-center gap-2 font-medium">[Performance Highlights Placeholder]</span>
             </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="aspect-square bg-zinc-900 rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer border border-white/5">
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                   Photo {i + 1}
                </div>
             </div>
           ))}
        </div>
      </Section>
    </>
  );
}
