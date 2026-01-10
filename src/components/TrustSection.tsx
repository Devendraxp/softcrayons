import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Students Trained',
  },
  {
    icon: BookOpen,
    value: '20+',
    label: 'Courses Available',
  },
  {
    icon: Award,
    value: '90%',
    label: 'Success Rate',
  },
  {
    icon: Globe,
    value: '200+',
    label: 'Companies Hired',
  },
];

export function TrustSection() {
  return (
    <section className="py-20 border-y border-border/50 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
