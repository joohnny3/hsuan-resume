"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // 剪貼簿權限被拒時靜默略過,ID 本身就顯示在畫面上
        }
      }}
      className={`rounded-full border px-3.5 py-1 text-xs tracking-wide transition-colors ${
        copied
          ? "border-gold text-gold"
          : "border-hairline text-muted hover:border-gold hover:text-gold"
      }`}
    >
      {copied ? "已複製 ✓" : "複製"}
    </button>
  );
}
