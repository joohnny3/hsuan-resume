import { profile } from "@/data/profile";

const links = [
  ["#about", "自介"],
  ["#experience", "經歷"],
  ["#gallery", "作品"],
  ["#contact", "邀約"],
] as const;

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-white/75 backdrop-blur border-b border-blush-200">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <a href="#top" className="font-black text-lg text-cocoa-900">
          {profile.stageName}
          <span className="font-display text-rose-500 ml-1.5">
            {profile.englishName}
          </span>
          <span className="text-rose-300 ml-1">✿</span>
        </a>
        <nav className="flex items-center gap-4 md:gap-6 text-sm text-cocoa-600">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-rose-500 transition-colors">
              {label}
            </a>
          ))}
          <a
            href={profile.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-line-green px-4 py-1.5 font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            <LineIcon className="size-4" />
            LINE
          </a>
        </nav>
      </div>
    </header>
  );
}

export function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 3C6.9 3 2.8 6.4 2.8 10.6c0 3.8 3.3 6.9 7.8 7.5.3.1.7.2.8.5.1.2.1.6 0 .8l-.1.8c0 .2-.2 1 .8.5s5.4-3.2 7.4-5.5c1.4-1.5 2-3 2-4.6C21.5 6.4 17.2 3 12 3zM8.4 13.3H6.2a.5.5 0 0 1-.5-.5V8.9a.5.5 0 0 1 1 0v3.4h1.7a.5.5 0 1 1 0 1zm1.9-.5a.5.5 0 0 1-1 0V8.9a.5.5 0 0 1 1 0v3.9zm4.7 0a.5.5 0 0 1-.9.3l-2-2.7v2.4a.5.5 0 0 1-1 0V8.9a.5.5 0 0 1 .9-.3l2 2.7V8.9a.5.5 0 0 1 1 0v3.9zm3.2-2.5a.5.5 0 1 1 0 1H16.6v.9h1.6a.5.5 0 1 1 0 1h-2.1a.5.5 0 0 1-.5-.5V8.9a.5.5 0 0 1 .5-.5h2.1a.5.5 0 1 1 0 1h-1.6v.9h1.6z" />
    </svg>
  );
}
