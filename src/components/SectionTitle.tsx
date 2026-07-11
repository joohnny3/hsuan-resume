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
    <div className="text-center mb-8">
      <p className="font-display font-semibold uppercase tracking-[0.25em] text-rose-400 text-sm">
        ✿ {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl md:text-4xl font-black text-cocoa-900">
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm text-cocoa-500">{sub}</p>}
    </div>
  );
}
