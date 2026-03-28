"use client";

import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const codeString = t("code");

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    
    // Quick typing effect simulator
    const interval = setInterval(() => {
      if (currentIndex < codeString.length) {
        currentText += codeString[currentIndex];
        setDisplayedText(currentText);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30); // 30ms per character

    return () => clearInterval(interval);
  }, [codeString]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-32 relative">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left: description */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t("title")}</h2>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-lg">{t("subtitle")}</p>
          <ul className="space-y-6">
            {(["f1", "f2", "f3"] as const).map((key) => (
              <li key={key} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-base text-text-secondary pt-1">{t(`features.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: terminal */}
        <div className="relative group perspective-1000">
          {/* Intense background cinematic glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Mac Window Controls */}
            <div className="code-titlebar !bg-white/5 !border-white/5">
              <div className="code-dots">
                <span className="code-dot code-dot-red" />
                <span className="code-dot code-dot-yellow" />
                <span className="code-dot code-dot-green" />
              </div>
              <div className="flex-1 text-center text-xs font-medium text-text-secondary/60">
                bash — claw-node
              </div>
            </div>
            {/* Code Body */}
            <div className="px-6 py-6 font-mono text-sm md:text-base leading-relaxed">
              <div className="whitespace-pre-wrap">
                {displayedText.split("\n").map((line, i) => {
                  const isComment = line.trimStart().startsWith("#");
                  const isCommand = !isComment && line.trim().length > 0;
                  return (
                    <span key={i}>
                      {isComment ? (
                        <span className="text-gray-500 italic">{line}</span>
                      ) : isCommand ? (
                        <>
                          <span className="text-primary/70 select-none">$ </span>
                          <span className="text-gray-200">{line.replace(/^(claw-node|git clone|npm|pnpm)\b/, "").length !== line.length
                            ? <><span className="text-primary font-semibold">{line.split(" ")[0]}</span><span className="text-gray-300">{" " + line.split(" ").slice(1).map(w => w.startsWith("--") ? w : w).join(" ")}</span></>
                            : line
                          }</span>
                        </>
                      ) : (
                        <span>{line}</span>
                      )}
                      {"\n"}
                    </span>
                  );
                })}
                <span className={`inline-block w-2.5 h-5 ml-0.5 bg-primary align-middle ${isTyping ? '' : 'animate-pulse'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
