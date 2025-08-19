'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you shortly.",
    });
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-headline text-foreground">Get In Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Have questions about our sarees, an order, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-muted-foreground">Our support team is available 24/7.</p>
                <a href="mailto:support@nidhuvastra.com" className="text-primary hover:underline">
                  support@nidhuvastra.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">Mon-Fri from 9am to 6pm IST.</p>
                    <a href="tel:+911234567890" className="text-primary hover:underline">
                    +91 123 456 7890
                    </a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground">Mysuru<br/> Karnataka, India 570017</p>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" type="text" placeholder="Priya" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" placeholder="Sharma" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="priya.sharma@example.com" required />
              </div>
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" rows={5} placeholder="Tell us how we can help..." required />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
