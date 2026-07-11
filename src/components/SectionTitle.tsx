export default function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-sm text-muted">{sub}</p>}
    </div>
  );
}
