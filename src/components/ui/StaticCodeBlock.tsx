"use client";

import { useState, useRef } from "react";

interface StaticCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function StaticCodeBlock({ code, language, filename }: StaticCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const label = filename || language || "";

  return (
    <div className="code-window">
      <div className="code-titlebar">
        <div className="code-dots">
          <span className="code-dot code-dot-red" />
          <span className="code-dot code-dot-yellow" />
          <span className="code-dot code-dot-green" />
        </div>
        {label && <span className="code-lang">{label}</span>}
        <button
          onClick={handleCopy}
          className="code-copy-btn"
          aria-label="Copy code"
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span className="code-copy-text">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre ref={preRef}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
