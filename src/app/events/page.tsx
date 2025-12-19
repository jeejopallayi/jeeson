import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Upcoming Events | Jeeson Franz",
  description: "Check out upcoming performances and past event highlights from Jeeson Franz.",
};

const upcomingEvents = [
  // Placeholder data as no specific upcoming events were provided
  {
    id: 1,
    title: "Magic at the Mall",
    date: "Coming Soon",
    time: "TBA",
    location: "Phoenix Marketcity, Bangalore",
    description: "Catch Jeeson Franz live for an evening of street magic and illusions.",
    status: "Upcoming"
  }
];

const pastEvents = [
  {
    id: 101,
    title: "Marriott Residency Finale",
    date: "2023",
    location: "Marriott Hotel, Bangalore",
    description: "Concluded a successful year-long residency entertaining hotel guests and VIPs.",
  },
  {
    id: 102,
    title: "Corporate Gala Night",
    date: "December 2023",
    location: "Orion Mall, Bangalore",
    description: "Headlining act for the annual corporate gathering.",
  }
];

export default function EventsPage() {
  return (
    <>
      <Section className="pt-32 pb-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events Calendar</h1>
          <p className="text-xl text-gray-400">
            Catch Jeeson Franz live in action.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Calendar className="text-primary" /> Upcoming Performances
          </h2>
          
          <div className="grid gap-6 mb-16">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                  </div>
                  <p className="text-gray-300">{event.description}</p>
                </div>
                <div>
                   <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-bold border border-primary/50">
                     {event.status}
                   </span>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-8 text-gray-400">Past Highlights</h2>
          <div className="grid gap-6 opacity-70">
             {pastEvents.map((event) => (
              <Card key={event.id} className="p-6">
                  <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{event.date} • {event.location}</p>
                  <p className="text-gray-400">{event.description}</p>
              </Card>
             ))}
          </div>
        </div>
      </Section>
    </>
  );
}
