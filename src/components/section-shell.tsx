import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function SectionShell({
  id,
  className,
  containerClassName,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("anchor-section py-20 lg:py-28", className)}>
      <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
