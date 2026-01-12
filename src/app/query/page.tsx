"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail, Phone, User, BookOpen } from "lucide-react";

const courses = [
  "Full Stack Web Development",
  "Python & Machine Learning",
  "DevOps & Cloud Engineering",
  "Mobile App Development",
  "Backend Engineering",
  "Frontend Mastery",
];

export default function QueryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    course: "",
    query: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="relative">
            {/* Background Effects */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                Get In Touch
              </span>

              <h1 className="text-4xl sm:text-5xl font-black mb-6">
                Have a <span className="text-gradient">Question?</span>
                <br />
                We're Here to Help
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Koi bhi doubt ho, course ke baare mein jaanna ho, ya career guidance chahiye - 
                hum aapki madad ke liye hamesha ready hain. Apna query submit karein aur humari 
                team 24 hours mein aapse contact karegi.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span>Quick response within 24 hours</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span>Expert guidance on course selection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Submit Your Query</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Interested Course</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Query */}
                <div>
                  <label className="block text-sm font-medium mb-2">Your Query / Doubt</label>
                  <textarea
                    placeholder="Describe your question or doubt..."
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full group">
                  Submit Query
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}