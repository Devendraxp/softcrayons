import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function TutorialHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-background">
      <BackgroundRippleEffect rows={7} cols={26} cellSize={52} />
      <div className="absolute inset-0 bg-background/70" />

      <div className="container relative flex min-h-[360px] items-center justify-center py-16 md:min-h-[420px]">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <h1 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
            Tutorials by Softcrayons
          </h1>
        </div>
      </div>
    </section>
  );
}
