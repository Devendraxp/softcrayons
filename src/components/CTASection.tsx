"use client";

import { ArrowRight, PhoneCall, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container relative z-10">        
          {/* Subtle Background Glows & Grid Pattern strictly using CSS variables */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_80%)] opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative px-6 py-20 md:py-24 text-center max-w-4xl mx-auto flex flex-col items-center">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-foreground tracking-tight">
              Don't Just Learn. <br className="hidden sm:block" />
              <span className="text-gradient">Get Hired.</span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of successful alumni who have transformed their careers. Get hands-on experience, expert mentorship, and dedicated placement assistance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link href="/query" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base group">
                  Start Learning for Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/query" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-background/50 hover:bg-primary/5 hover:text-primary transition-all">
                  <PhoneCall className="mr-2 w-5 h-5" />
                  Talk to a Counselor
                </Button>
              </Link>
            </div>

            {/* Institute Trust Markers (Replaces the generic SaaS text) */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                <span>Live Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                <span>Industry Expert Trainers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                <span>100% Placement Support</span>
              </div>
            </div>

          </div>
        </div>
    </section>
  );
}