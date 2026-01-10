import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">New Batch Starting Soon</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Hum Padhate Nahin
              <br />
              <span className="text-gradient">Sikhate Hain</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Ji Haan, Hum sirf syntax nahi, practical skills sikhate hain, real world projects banwate hai jo aapko industry ready banayein.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button className="group w-full sm:w-auto">
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/courses">
                <Button variant={"outline"} className="group w-full sm:w-auto">
                  <Play className="w-5 h-5" />
                  View Courses
                </Button>
              </Link>
            </div>

            {/* Tech Stack Tags */}
            <div className="mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground mb-4">Technologies you'll master</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'AWS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm font-mono font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl scale-90" />
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
                alt="Developer coding on laptop"
                className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
