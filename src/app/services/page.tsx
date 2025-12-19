import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, Sparkles, PartyPopper, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Magic & Mentalism Services",
  description: "Explore Jeeson Franz's range of services including corporate magic, mentalism shows, wedding entertainment, and private parties.",
};

const services = [
  {
    id: "mentalism",
    title: "Mentalism & Mind Reading",
    icon: Brain,
    description: "A sophisticated performance that explores the mysteries of the human mind. Jeeson demonstrates impossible feats of thought transmission, prediction, and psychological influence.",
    features: [
      "Interactive audience participation",
      "Thought predictions",
      "Psychological illusions",
      "Perfect for corporate galas and elite gatherings"
    ]
  },
  {
    id: "corporate",
    title: "Corporate Events",
    icon: Users,
    description: "Elevate your corporate event with entertainment that engages and inspires. Jeeson can customize his act to incorporate brand messaging or event themes.",
    features: [
      "Product launches",
      "Team building activities",
      "Conference ice-breakers",
      "Networking event entertainment"
    ]
  },
  {
    id: "stage",
    title: "Stage Magic & Illusions",
    icon: Sparkles,
    description: "Grand illusions and visual magic designed for larger audiences. A high-energy show combining music, mystery, and showmanship.",
    features: [
      "Visual storytelling",
      "Grand illusions",
      "Comedy magic",
      "Suitable for large venues and theaters"
    ]
  },
  {
    id: "private",
    title: "Private Parties & Weddings",
    icon: PartyPopper,
    description: "Add a touch of magic to your special day. From walk-around close-up magic during cocktail hour to a featured show for the reception.",
    features: [
      "Close-up / Strolling magic",
      "Interactive card tricks",
      "Wedding reception entertainment",
      "Birthday party shows"
    ]
  }
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-32 pb-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Performance Services</h1>
          <p className="text-xl text-gray-400">
            Customized entertainment solutions for every occasion.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                 </div>
                 <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    {service.description}
                 </p>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                        </li>
                    ))}
                 </ul>
                 <Link href="/contact">
                    <Button>Book This Service</Button>
                 </Link>
              </div>
              
              <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
                 <Card className="aspect-video bg-zinc-900 flex items-center justify-center text-gray-600 border-dashed">
                    [Image for {service.title}]
                 </Card>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
