import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About Jeeson Franz",
  description: "Learn about Jeeson Franz's 20+ year journey in magic and mentalism, from his career inception in 1998 to his residency at the Marriott Hotel.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Jeeson Franz</h1>
          <p className="text-xl text-gray-400">
            A journey of wonder, illusion, and psychological mastery.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white">The Man Behind the Mystery</h2>
            <p>
              Jeeson Franz is a dedicated professional magician and mentalist based in Bangalore, India, with a career spanning over two decades. He began his magical journey in 1998, pioneering a "sleek and sophisticated" style that blends traditional illusion with modern mentalism.
            </p>
            <p>
              Known for his captivating stage presence, Jeeson specializes in enchanting audiences through diverse formats, ranging from intimate birthday parties and walk-around acts to grand corporate stage productions. His performances are adeptly customized to match the unique ambiance of each event, ensuring a mesmerizing experience that leaves a lasting impression.
            </p>
            
            <h3 className="text-xl font-bold text-white pt-4">Professional Highlights</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-primary">Career Inception (1998 – Present):</strong> Embarked on his professional path in 1998, honing his skills across varied performance types including street magic, private functions, and large-scale events.
              </li>
              <li>
                <strong className="text-primary">Marriott Hotel Residency (2022 – 2023):</strong> Served as the featured magician and mentalist for an exclusive year-long program at the Marriott Hotel, Bangalore.
              </li>
              <li>
                <strong className="text-primary">Notable Venues:</strong> Performed at major hubs like Orion Mall and Phoenix Marketcity.
              </li>
            </ul>
          </div>

          <div className="space-y-8">
             <div className="aspect-[3/4] relative bg-zinc-800 rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="/images/jeeson-performing.jpg"
                  alt="Jeeson Franz performing live"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </div>
             
             <div className="bg-secondary/50 p-6 rounded-lg border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">Core Skills</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-primary font-medium">Mentalism & Mind-reading</h4>
                    <p className="text-sm text-gray-400">Advanced psychological illusions and thought prediction.</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">Illusion & Sleight of Hand</h4>
                    <p className="text-sm text-gray-400">Classic technical magic skills.</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">Audience Engagement</h4>
                    <p className="text-sm text-gray-400">High-interaction performances involving the crowd.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
}
