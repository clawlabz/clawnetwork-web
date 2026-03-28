import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface HighlightedCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export async function HighlightedCodeBlock({
  code,
  language = "text",
  filename,
  className,
}: HighlightedCodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark-default",
  });

  const label = filename || language;

  return (
    <div className={`code-window ${className ?? ""}`}>
      <div className="code-titlebar">
        <div className="code-dots">
          <span className="code-dot code-dot-red" />
          <span className="code-dot code-dot-yellow" />
          <span className="code-dot code-dot-green" />
        </div>
        {label && <span className="code-lang">{label}</span>}
        <CopyButton text={code} />
      </div>
      <div
        className="highlighted-code"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
