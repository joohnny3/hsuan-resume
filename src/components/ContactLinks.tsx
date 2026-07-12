import { profile } from "@/data/profile";
import { InstagramIcon, LineIcon, MailIcon } from "./Nav";

/**
 * 共用聯絡列(Hero 與 Footer 共用,確保順序與文字永遠一致)。
 * 順序:IG → LINE → 信箱。
 */
export default function ContactLinks({ className = "" }: { className?: string }) {
  const igUrl = `https://www.instagram.com/${profile.instagram}`;
  const item =
    "inline-flex items-center gap-2 transition-colors hover:text-accent";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted ${className}`}
    >
      {profile.instagram && (
        <a
          href={igUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={item}
        >
          <InstagramIcon className="size-4 shrink-0" />
          Instagram
        </a>
      )}
      <a
        href={profile.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={item}
      >
        <LineIcon className="size-4 shrink-0" />
        LINE@Hsuan
      </a>
      <a href={`mailto:${profile.email}`} className={item}>
        <MailIcon className="size-4 shrink-0" />
        {profile.email}
      </a>
    </div>
  );
}
