import { Card, CardContent } from "@/components/ui/card";
import { Building2, GraduationCap, Quote } from "lucide-react";
import Image from "next/image";

interface PlacementCardProps {
  name: string;
  course: string;
  position: string;
  company: string;
  image: string;
  packageVal?: string;
  quote?: string;
}

export function PlacementCard({ name, course, position, company, image, packageVal, quote }: PlacementCardProps) {
  // Only show package if it exists and is not empty
  const showPackage = packageVal && packageVal !== "";

  return (
    <Card className="group bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Section - Fixed for visibility */}
      <div className="relative h-64 w-full bg-muted/20 overflow-hidden">
             {/* Subtle background pattern to fill empty space */}
             <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
             
             <Image
                src={image}
                alt={name}
                fill
                className="object-contain object-bottom z-10"
             />
             
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
             
             {/* Package Badge */}
             {showPackage && (
                <div className="absolute top-3 right-3 z-30 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg uppercase tracking-wider animate-in fade-in zoom-in duration-300 border border-primary/20">
                    {packageVal} Package
                </div>
             )}

             {/* Company Info Overlay */}
             <div className="absolute bottom-2 left-3 right-3 z-30">
                <div className="bg-background/80 backdrop-blur-md p-2 rounded-lg border border-border/50 flex items-center gap-3 shadow-sm">
                   <div className="shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{company}</p>
                      <p className="text-[10px] text-muted-foreground truncate font-medium uppercase tracking-wide">{position}</p>
                   </div>
                </div>
             </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
           <h3 className="font-bold text-lg mb-1 truncate text-foreground group-hover:text-primary transition-colors">{name}</h3>
           <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span className="truncate">{course}</span>
           </div>
           
           {quote && (
              <div className="mt-auto relative bg-muted/50 p-3 rounded-lg border border-border/50 group-hover:bg-muted/80 transition-colors">
                 <Quote className="w-3 h-3 text-primary/40 absolute top-2 left-2" />
                 <p className="text-[11px] text-muted-foreground italic pl-3 line-clamp-2 leading-relaxed">
                    "{quote}"
                 </p>
              </div>
           )}
      </CardContent>
    </Card>
  );
}