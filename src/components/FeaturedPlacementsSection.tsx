"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlacementCard } from "@/components/placements/PlacementCard";
import { SectionLoader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

interface Placement {
  id: number;
  studentName: string;
  avatar: string | null;
  courseName: string;
  dialogue: string | null;
  packageOffered: string | null;
  companyName: string | null;
  position: string | null;
  isFeatured: boolean;
}

export function FeaturedPlacementsSection() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPlacements = async () => {
      try {
        const response = await fetch("/api/placements?featured=true&limit=4");
        const data = await response.json();

        if (data.success) {
          setPlacements(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured placements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPlacements();
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <SectionLoader text="placements" />
        </div>
      </section>
    );
  }

  if (placements.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Successfully <span className="text-gradient">Placed Students</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Meet our top achievers who secured roles at leading companies after training with SoftCrayons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placements.map((student) => (
            <PlacementCard
              key={student.id}
              name={student.studentName}
              course={student.courseName}
              position={student.position || ""}
              company={student.companyName || ""}
              image={
                student.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(student.studentName)}&background=random&size=500`
              }
              packageVal={student.packageOffered || ""}
              quote={student.dialogue || ""}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/placements">
            <Button variant="outline" size="lg">
              View All Placements
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
