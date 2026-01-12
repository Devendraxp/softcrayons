import React from "react";
import { Building2, Quote } from "lucide-react";
import Image from "next/image";

interface FeaturedPlacementProps {
  name: string;
  course: string;
  position: string;
  company: string;
  image: string;
  quote?: string;
  packageVal?: string;
}

export const FeaturedPlacementCard = ({ name, course, position, company, image, quote, packageVal }: FeaturedPlacementProps) => {
  const showPackage = packageVal && packageVal !== "";

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col sm:flex-row h-full">
      {/* Image Section - Compact */}
      <div className="w-full sm:w-2/5 min-h-[220px] sm:min-h-full relative overflow-hidden bg-muted">
        <Image 
          src={image}
          alt={name}
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        
        {/* Highlight Badge */}
        {showPackage && (
           <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider">
             {packageVal} Package
           </div>
        )}

        {/* Mobile Name Overlay */}
        <div className="absolute bottom-3 left-3 text-white sm:hidden">
            <h3 className="font-bold text-lg leading-tight">{name}</h3>
            <p className="text-xs text-gray-300">{company}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between">
         <div className="hidden sm:block">
            <div className="flex justify-between items-start mb-1 basic-auto">
                <h3 className="text-xl font-bold text-foreground">{name}</h3>
            </div>
            <p className="text-primary text-xs font-semibold mb-3">{course}</p>
         </div>

         <div className="relative mb-4">
            <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-1" />
            <p className="text-muted-foreground text-sm italic pl-4 leading-relaxed line-clamp-3">
              "{quote || "Softcrayons helped me bridge the gap between theory and practical application. The mock interviews were a game changer."}"
            </p>
         </div>

         <div className="pt-3 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
               <div className="w-9 h-9 rounded bg-muted flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-primary" />
               </div>
               <div className="leading-none">
                  <p className="text-sm font-bold text-foreground mb-1">{company}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{position}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};