type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-10">
      <p className="section-kicker">{label}</p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-brand-100 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-200/80 sm:text-base">
        {description}
      </p>
    </header>
  );
}
