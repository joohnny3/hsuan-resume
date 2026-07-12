import { profile } from "@/data/profile";
import { asset } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const sign = asset("/hsuuan-sign.svg");

const links = [
  ["#brands", "品牌"],
  ["#gallery", "作品"],
] as const;

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          aria-label={`${profile.stageName} ${profile.englishName}`}
          className="sign-link flex items-center"
        >
          <span
            aria-hidden
            className="sign-fill block h-9 w-24"
            style={{
              maskImage: `url(${sign})`,
              WebkitMaskImage: `url(${sign})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "left center",
              WebkitMaskPosition: "left center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
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

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
