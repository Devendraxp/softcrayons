"use client";

import { Star, Quote } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SectionLoader } from '@/components/ui/loader';

interface Testimonial {
  id: number;
  studentName: string;
  avatar: string | null;
  rating: number;
  feedback: string;
  isFeatured: boolean;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/reviews?limit=3&featured=true');
        const data = await response.json();
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <SectionLoader text="testimonials" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our alumni who transformed their careers with SoftCrayons.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
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
                "{testimonial.feedback}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.studentName)}&background=random`}
                  alt={testimonial.studentName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold">{testimonial.studentName}</div>
                  <div className="text-sm text-muted-foreground">SoftCrayons Alumni</div>
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
