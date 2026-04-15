import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Globe, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-24 max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 border-teal-500/20 text-teal-600 dark:text-teal-400 py-1 px-4 rounded-full">
            Our Journey
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-teal-600">
            About Planova
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Revolutionizing how people discover and organize experiences. Planova is your ultimate companion for finding, booking, and managing events that matter.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-none shadow-sm h-full flex flex-col justify-center p-8 transition-transform hover:scale-[1.01]">
            <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower communities by providing a seamless platform for event discovery and engagement. We believe every event is an opportunity to learn, grow, and connect.
            </p>
          </Card>
          <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-none shadow-sm h-full flex flex-col justify-center p-8 transition-transform hover:scale-[1.01]">
            <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become the world's most trusted event ecosystem, where every organizer and attendee can interact with total transparency and ease, globally.
            </p>
          </Card>
        </div>

        {/* Core Values */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Core Values</h2>
            <p className="text-muted-foreground">What drives us forward every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Innovation", description: "Constantly evolving our tools for a better user experience.", icon: Sparkles },
              { title: "Community", description: "Building bridges between organizers and attendees.", icon: Users },
              { title: "Excellence", description: "Striving for quality in every interaction on our platform.", icon: CheckCircle2 },
            ].map((value, idx) => (
              <div key={idx} className="p-6 text-center group">
                <div className="bg-teal-50 dark:bg-teal-900/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-teal-600 py-20 rounded-3xl text-white text-center shadow-xl shadow-teal-500/10 mb-24 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-black mb-1">500+</div>
              <div className="text-teal-100 uppercase text-xs font-bold tracking-widest">Global Events</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">10k+</div>
              <div className="text-teal-100 uppercase text-xs font-bold tracking-widest">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">200+</div>
              <div className="text-teal-100 uppercase text-xs font-bold tracking-widest">Top Organizers</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">24/7</div>
              <div className="text-teal-100 uppercase text-xs font-bold tracking-widest">Active Support</div>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        </section>
      </div>
    </div>
  );
}
