"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Mail, Phone, User, Calendar, FileText, Users, Award } from "lucide-react";

export default function InstructorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    document: null as File | null,
    availability: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, document: e.target.files[0] });
    }
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
                Join Our Team
              </span>

              <h1 className="text-4xl sm:text-5xl font-black mb-6">
                Become an <span className="text-gradient">Instructor</span>
                <br />
                Shape the Future
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Apna knowledge share karein aur students ki zindagi badlein. Agar aap passionate 
                hain teaching ke liye aur industry experience rakhte hain, toh humse judein aur 
                next generation of developers ko train karein.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span>Teach 10,000+ eager learners</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <span>Competitive compensation & recognition</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span>Flexible teaching schedule</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Apply as Instructor</h2>

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

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Your Resume/CV</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="document-upload"
                      required
                    />
                    <label
                      htmlFor="document-upload"
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-muted/50 border border-border border-dashed hover:border-primary cursor-pointer transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        {formData.document ? (
                          <span className="text-foreground">{formData.document.name}</span>
                        ) : (
                          <>
                            <span className="text-muted-foreground">Click to upload</span>
                            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                          </>
                        )}
                      </div>
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </label>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium mb-2">When can you join?</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="immediate">Immediately</option>
                      <option value="1-week">Within 1 week</option>
                      <option value="2-weeks">Within 2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium mb-2">Why do you want to join us?</label>
                  <textarea
                    placeholder="Tell us about your experience and why you'd be a great instructor..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full group">
                  Submit Application
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