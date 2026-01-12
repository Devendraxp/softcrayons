import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  description: string;
  testimonial: string;
  profileImage: string;
  className?: string;
  rating?: number;
}

export function TestimonialCard({
  name,
  description,
  testimonial,
  profileImage,
  className = "",
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div
      className={`bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-300 dark:hover:border-zinc-700 transition-colors ${className}`}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <div className="mb-6">
        <p className="text-gray-700 dark:text-zinc-300 text-sm leading-relaxed">
          &quot;{testimonial}&quot;
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white font-medium text-sm">
            {name}
          </h4>
          <p className="text-gray-500 dark:text-zinc-500 text-xs">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}