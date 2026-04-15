import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-teal-600">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions about an event? Need help with your account? Our team is here to support you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none bg-zinc-50 dark:bg-zinc-900/50 shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl">
                  <Mail className="text-teal-600 dark:text-teal-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">For general inquiries and support.</p>
                  <a href="mailto:support@planova.com" className="text-teal-600 hover:underline font-medium">support@planova.com</a>
                </div>
              </div>
            </Card>

            <Card className="border-none bg-zinc-50 dark:bg-zinc-900/50 shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl">
                  <Phone className="text-teal-600 dark:text-teal-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Mon-Fri from 9am to 6pm.</p>
                  <a href="tel:+1234567890" className="text-teal-600 hover:underline font-medium">+1 (234) 567-890</a>
                </div>
              </div>
            </Card>

            <Card className="border-none bg-zinc-50 dark:bg-zinc-900/50 shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl">
                  <MapPin className="text-teal-600 dark:text-teal-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Our headquarters in San Francisco.</p>
                  <p className="text-foreground font-medium">123 Event St, Suite 456<br />San Francisco, CA 94103</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 border-none bg-white dark:bg-zinc-900 shadow-xl dark:shadow-teal-900/5 p-8 rounded-3xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 h-12 rounded-xl" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 h-12 rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 h-12 rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  rows={6} 
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                ></textarea>
              </div>

              <Button className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
