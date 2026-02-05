import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export function CTASection() {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-sm font-medium text-primary">Limited Seats Available</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Ready to <span className="text-gradient">Level Up</span>
            <br />
            Your Career?
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of developers who have transformed their careers with our
            industry-focused curriculum and expert mentorship.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/query">
              <Button size={'lg'} className="group w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Elements */}
          <p className="mt-8 text-sm text-muted-foreground">
            ✓ Free trial &nbsp;&nbsp; ✓ Free consultation &nbsp;&nbsp;  ✓ 100% satisfaction guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
