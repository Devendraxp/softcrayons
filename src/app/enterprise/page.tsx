"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Mail, Phone, Clock, FileText, Users, Target, Briefcase } from "lucide-react";

const durations = [
  "1 Week",
  "2 Weeks",
  "1 Month",
  "2 Months",
  "3 Months",
  "6 Months",
  "Custom Duration",
];

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    instituteName: "",
    contact: "",
    email: "",
    duration: "",
    additionalInfo: "",
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
                Enterprise Solutions
              </span>

              <h1 className="text-4xl sm:text-5xl font-black mb-6">
                Corporate <span className="text-gradient">Training</span>
                <br />
                Programs
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Apni team ko industry-ready skills se equip karein. Customized training programs 
                jo aapke organization ke specific needs ke according designed hain. College 
                workshops se lekar corporate upskilling tak - hum sab cover karte hain.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <span>Customized curriculum for your needs</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span>Trained 200+ companies successfully</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <span>On-site & remote training available</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Trusted by leading organizations</p>
                <div className="flex flex-wrap gap-6 opacity-60">
                  <div className="text-lg font-bold">TCS</div>
                  <div className="text-lg font-bold">Infosys</div>
                  <div className="text-lg font-bold">Wipro</div>
                  <div className="text-lg font-bold">HCL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Request Enterprise Training</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Institute Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Institute / Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Enter organization name"
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
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
                      placeholder="Enter contact number"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Official Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Enter official email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">Training Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select duration</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Information</label>
                  <textarea
                    placeholder="Tell us about your training requirements, batch size, preferred technologies, etc..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <Button type="submit" className="w-full group">
                  Request Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Our team will get back to you within 24-48 hours with a customized proposal.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}