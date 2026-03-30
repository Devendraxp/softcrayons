type TutorialHeroProps = {
  title?: string;
  tagline?: string;
  description?: string;
  teacherImageUrl?: string;
};

export function TutorialHero({
  title = "Tutorials by SoftCrayons",
  tagline = "Docs for every developer",
  description = "Browse topics and jump straight into hands-on lessons crafted by our instructors.",
  teacherImageUrl = "https://res.cloudinary.com/dbrxgmnyn/image/upload/v1772445831/faculty-avatars/lt7xi0km2ovj0f7jwbeb.png",
}: TutorialHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="container relative py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {tagline}
            </p>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black leading-tight text-foreground">
                {title}
              </h1>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[24px] border border-border">
              <img
                src={teacherImageUrl}
                alt="SoftCrayons instructors"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
