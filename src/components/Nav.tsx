import { profile } from "@/data/profile";
import { asset } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const sign = asset("/hsuuan-sign.svg");

type IconProps = { className?: string };

/** 合作品牌:標籤 icon */
function BrandTagIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 活動經歷:條列 icon */
function ListIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 精選活動:相簿 icon */
function GalleryImageIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="8.5" cy="8.5" r="1.6" />
      <path d="m21 15-4.2-4.2a2 2 0 0 0-2.8 0L5 20" />
    </svg>
  );
}

const links = [
  { href: "#brands", label: "合作品牌", Icon: BrandTagIcon },
  { href: "#experience", label: "活動經歷", Icon: ListIcon },
  { href: "#gallery", label: "精選活動", Icon: GalleryImageIcon },
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

        <nav className="flex items-center gap-1 md:gap-2">
          {links.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              className="group flex items-center rounded-full px-2 py-2 text-muted transition-colors hover:text-accent"
            >
              <Icon className="size-5 shrink-0" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[6rem] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[6rem] group-focus-visible:opacity-100 motion-reduce:transition-none">
                {label}
              </span>
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
