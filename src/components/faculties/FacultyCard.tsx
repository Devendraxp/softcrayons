import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import Image from "next/image";

interface FacultyCardProps {
  name: string;
  role: string;
  experience: string;
  image: string;
  skills: string[];
}

export function FacultyCard({ name, role, experience, image, skills }: FacultyCardProps) {
  return (
    <Card className="group bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col items-center">
        {/* Rounded Image Section */}
        <div className="mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/30 transition-colors duration-300">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center w-full">
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-muted-foreground font-medium mb-4">{role}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index} 
                className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium border border-border"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold border border-primary/10">
            <Award className="w-4 h-4" />
            {experience} Exp.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}