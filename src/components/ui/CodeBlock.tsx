"use client";

import { useState, useRef, type ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  "data-language"?: string;
}

export function CodeBlock({ children, className, "data-language": lang, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const displayLang = lang || "";

  return (
    <div className="code-window">
      {/* Mac-style title bar */}
      <div className="code-titlebar">
        <div className="code-dots">
          <span className="code-dot code-dot-red" />
          <span className="code-dot code-dot-yellow" />
          <span className="code-dot code-dot-green" />
        </div>
        {displayLang && <span className="code-lang">{displayLang}</span>}
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
      {/* Code content */}
      <pre ref={preRef} className={className} {...rest}>
        {children}
      </pre>
    </div>
  );
}
