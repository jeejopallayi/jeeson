"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Brain, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-50" />
        
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              The Art of <span className="text-primary">Modern Mystery</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Jeeson Franz blends traditional illusion with modern mentalism to create sophisticated, mind-bending experiences for discerning audiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Performance
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Acts
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <Section className="bg-secondary/20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/5] bg-zinc-800 rounded-lg overflow-hidden relative">
              {/* Placeholder for Jeeson's Photo */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                [Jeeson Franz Portrait]
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Redefining Magic in Bangalore</h2>
            <p className="text-gray-400 mb-4">
              With a career spanning over two decades, Jeeson Franz has pioneered a "sleek and sophisticated" style of magic. From his residency at the Marriott Hotel to large-scale corporate events, he transforms ordinary moments into extraordinary memories.
            </p>
            <p className="text-gray-400 mb-6">
              Whether it's reading minds at an intimate gathering or performing grand illusions on stage, Jeeson's acts are customized to ensure a mesmerizing experience.
            </p>
            <Link href="/about">
              <Button variant="ghost" className="group pl-0 hover:bg-transparent hover:text-primary">
                Read Full Bio <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Services Overview */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Categories</h2>
          <p className="text-gray-400">Tailored experiences for every occasion</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 hover:bg-secondary transition-colors group">
            <Brain className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Mentalism</h3>
            <p className="text-gray-400 mb-6">
              Advanced psychological illusions and thought prediction that will leave your guests questioning reality.
            </p>
            <Link href="/services#mentalism" className="text-primary text-sm font-medium hover:underline">Learn more</Link>
          </Card>

          <Card className="p-8 hover:bg-secondary transition-colors group">
            <Sparkles className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Corporate Magic</h3>
            <p className="text-gray-400 mb-6">
              Sophisticated entertainment designed to break the ice and engage professionals at conferences and galas.
            </p>
            <Link href="/services#corporate" className="text-primary text-sm font-medium hover:underline">Learn more</Link>
          </Card>

          <Card className="p-8 hover:bg-secondary transition-colors group">
            <PartyPopper className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Private Events</h3>
            <p className="text-gray-400 mb-6">
              Intimate miracles for weddings, birthdays, and private parties, creating personal moments of wonder.
            </p>
            <Link href="/services#private" className="text-primary text-sm font-medium hover:underline">Learn more</Link>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-secondary/20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Experiences</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-transparent border-none shadow-none">
            <p className="text-lg italic text-gray-300 mb-6">
              "Jeeson's performance at our annual gala was nothing short of spectacular. His mentalism act had the entire room captivated. Truly world-class entertainment."
            </p>
            <div>
              <p className="font-bold text-white">Event Manager</p>
              <p className="text-sm text-primary">Marriott Hotel, Bangalore</p>
            </div>
          </Card>
          <Card className="bg-transparent border-none shadow-none">
            <p className="text-lg italic text-gray-300 mb-6">
              "We hired Jeeson for a corporate product launch. He seamlessly integrated our brand message into his magic. It was the highlight of the evening!"
            </p>
            <div>
              <p className="font-bold text-white">Marketing Director</p>
              <p className="text-sm text-primary">Corporate Client</p>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="bg-primary/10 rounded-2xl p-12 text-center border border-primary/20">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Experience the Impossible?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact Jeeson Franz today to discuss how he can make your next event unforgettable.
          </p>
          <Link href="/contact">
            <Button size="lg">Get a Quote</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}