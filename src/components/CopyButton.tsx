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
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        copied
          ? "border-line-green text-line-green"
          : "border-blush-300 text-cocoa-600 hover:border-rose-300 hover:text-rose-500"
      }`}
    >
      {copied ? "已複製 ✓" : "複製"}
    </button>
  );
}
