export default function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-bold md:text-4xl ${eyebrow ? "mt-3" : ""}`}
      >
        {title}
      </h2>
      {sub && <p className="mt-3 text-sm text-muted">{sub}</p>}
    </div>
  );
}
