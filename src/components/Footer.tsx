import ContactLinks from "./ContactLinks";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-hairline bg-canvas-deep"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        {/* 聯絡資訊(共用元件:順序 IG→LINE→信箱,與 Hero 一致) */}
        <ContactLinks />

        {/* copyright */}
        <p className="text-xs text-muted-2">
          Copyright © 2026 Chang Yu Cheng. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
