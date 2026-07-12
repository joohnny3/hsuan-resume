import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["#brands", "品牌"],
  ["#gallery", "作品"],
  ["#contact", "邀約"],
] as const;

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-serif text-xl font-bold tracking-wide">
          {profile.stageName}
          <span className="ml-2 font-serif italic text-accent text-base tracking-widest">
            {profile.englishName}
          </span>
        </a>

        <nav className="flex items-center gap-5 md:gap-7">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href={profile.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover"
          >
            <LineIcon className="size-4" />
            LINE 邀約
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
