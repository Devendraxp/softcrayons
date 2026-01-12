import { Star, Quote } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'The mentorship here changed my career trajectory. I went from struggling with basics to landing my dream job at Google in just 8 months.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Full Stack Developer at Stripe',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The project-based learning approach is incredible. Every concept I learned, I immediately applied. My portfolio spoke louder than any resume.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    role: 'DevOps Engineer at AWS',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'The community support is unmatched. From code reviews to mock interviews, everyone here genuinely wants to see you succeed.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our alumni who transformed their careers with CodeCraft.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <div className="text-center mt-12">
        <Link href="/reviews">
          <Button variant={'outline'}> View All Testimonials </Button>
        </Link>
      </div>
    </section>
  );
}
