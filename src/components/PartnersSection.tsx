"use client";

import { cn } from "@/lib/utils";

const partners = [
  {
    name: "Pearson",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Pearson_plc_2025.svg/250px-Pearson_plc_2025.svg.png",
  },
  {
    name: "SAP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/512px-SAP_2011_logo.svg.png",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png",
  },
  {
    name: "Google Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png",
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png",
  },
  {
    name: "Kryterion",
    logo: "https://www.kryterion.com/wp-content/uploads/2022/07/Logo-kryterion@2x.png",
  },
  {
    name: "ACT",
    logo: "https://www.actcorp.in/themes/custom/actcorp/logo.svg",
  },
  {
    name: "LanguageCert",
    logo: "https://www.languagecert.org/-/media/images/languagecert-logotypes-2024/lc_logotypes/header-languagecertcolor1x-1/lc-logo-481x75px.ashx",
  },
  {
    name: "Skills For English",
    logo: "https://skillsforenglish.com/wp-content/uploads/2023/09/Skills-for-English-SELT-logo-nav.png",
  },
  {
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png",
  },
  {
    name: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png",
  },
];

export function PartnersSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            SoftCrayons <span className="text-gradient">Global Partners</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We are proud to partner with world-leading technology and certification organizations.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={cn(
                "group relative bg-card border border-border rounded-2xl p-6 flex items-center justify-center",
                "hover:border-primary/30 hover:shadow-lg transition-all duration-300",
                "h-24 sm:h-28"
              )}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 sm:max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
              
              {/* Tooltip on hover */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
