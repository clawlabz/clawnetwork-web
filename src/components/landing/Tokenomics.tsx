"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function Tokenomics() {
  const t = useTranslations("tokenomics");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const mounted = time > 0;

  useEffect(() => {
    let animationFrame: number;
    const start = Date.now();
    
    const animate = () => {
      setTime((Date.now() - start) / 1000);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const allocations = [
    { label: t("allocation.ecosystem"), pct: t("allocation.ecosystemPct"), color: "#F96706", value: 40 },
    { label: t("allocation.staking"), pct: t("allocation.stakingPct"), color: "#a855f7", value: 25 },
    { label: t("allocation.partners"), pct: t("allocation.partnersPct"), color: "#3b82f6", value: 15 },
    { label: t("allocation.core"), pct: t("allocation.corePct"), color: "#6366f1", value: 10 },
    { label: t("allocation.public"), pct: t("allocation.publicPct"), color: "#8b5cf6", value: 10 },
  ];

  const totalRadius = 180;
  const center = { x: 300, y: 300 };

  const getNodePos = (i: number, total: number, r: number) => {
    const baseAngle = -Math.PI / 2 + (Math.PI * 2 * i) / total;
    const angle = baseAngle + time * 0.1; // slow windmill rotation
    const breathe = mounted ? Math.sin(time * 2 + i * 1.5) * 15 : 0; // irregular breathing
    const animatedR = r + breathe;

    return {
      x: center.x + Math.cos(angle) * animatedR,
      y: center.y + Math.sin(angle) * animatedR,
      angle,
      baseRadius: r,
    };
  };

  return (
    <section id="tokenomics" className="relative mx-auto mt-16 mb-24 max-w-5xl px-6 py-16 min-h-[600px] flex flex-col items-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 bg-bg-dark/80 backdrop-blur-md rounded-[4rem] border border-border-dark/30 shadow-[0_0_80px_rgba(249,103,6,0.03)]"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          {t("title")}
        </h2>
        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
          Built for scale, secured by agents.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-[600px] aspect-square mx-auto flex items-center justify-center">
        
        {/* The SVG Dataviz */}
        <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Radar Rings */}
          {[80, 140, 200, 260].map((r, i) => (
            <circle 
              key={i} cx="300" cy="300" r={r} 
              fill="none" stroke="rgba(255,255,255,0.03)" 
              strokeWidth="1" strokeDasharray="4 8"
              className={`transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0 scale-90 origin-center'}`}
            />
          ))}

          {/* Central Core Glow */}
          <circle cx="300" cy="300" r="100" fill="url(#coreGrad)" className="animate-pulse" />

          {/* Connecting Lines and SVG Nodes */}
          {allocations.map((item, i) => {
            const pos = getNodePos(i, allocations.length, totalRadius);
            // Dynamic control points that bend with rotation
            const cx = center.x + Math.cos(pos.angle + 0.4 + Math.sin(time)*0.2) * pos.baseRadius * 0.5;
            const cy = center.y + Math.sin(pos.angle + 0.4 + Math.sin(time)*0.2) * pos.baseRadius * 0.5;
            const pathData = `M ${center.x} ${center.y} Q ${cx} ${cy} ${pos.x} ${pos.y}`;
            
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <g key={i} style={{ transition: 'opacity 0.5s ease' }} className={isDimmed ? 'opacity-20' : 'opacity-100'}>
                {/* Curved connecting line */}
                <path 
                  d={pathData}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isHovered ? 4 : 2}
                  strokeDasharray={1000}
                  strokeDashoffset={mounted ? 0 : 1000}
                  style={{ transition: 'stroke-dashoffset 2s ease-in-out, stroke-width 0.3s ease, stroke 0.3s ease' }}
                  filter={isHovered ? "url(#glow)" : ""}
                  opacity={isHovered ? 0.9 : 0.5}
                />
                
                {/* Connection dot */}
                <circle 
                  cx={pos.x} cy={pos.y} r={isHovered ? 6 : 4} 
                  fill={item.color} 
                  filter="url(#glow)"
                  style={{ transition: 'r 0.3s ease' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central HTML Content */}
        <div className="absolute flex flex-col items-center justify-center rounded-full w-40 h-40 border border-primary/20 bg-bg-dark/80 backdrop-blur-md shadow-[0_0_50px_rgba(0,240,255,0.1)] z-20 pointer-events-auto transition-transform hover:scale-105">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-1">{t("totalSupply")}</span>
          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple tracking-tight">
            {t("totalSupplyValue")}
          </span>
          <span className="text-[10px] font-semibold text-text-secondary mt-1 tracking-widest">{t("symbol")}</span>
        </div>

        {/* HTML Labels positioned radially */}
        {allocations.map((item, i) => {
          const pos = getNodePos(i, allocations.length, totalRadius + 45); // Push labels further out flexibly
          // Convert from SVG 600x600 to percentage positioning
          const left = `${(pos.x / 600) * 100}%`;
          const top = `${(pos.y / 600) * 100}%`;
          
          const isHovered = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

          return (
            <div 
              key={i}
              className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer ${
                !mounted ? 'opacity-0 scale-50' : isDimmed ? 'opacity-30 scale-95' : isHovered ? 'scale-110 z-30' : 'opacity-100 scale-100 z-20'
              }`}
              style={{ left, top, transition: 'opacity 0.5s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="relative px-4 py-2 rounded-2xl border bg-surface-dark/80 backdrop-blur-xl group"
                style={{ 
                  borderColor: isHovered ? item.color : 'rgba(255,255,255,0.15)',
                  boxShadow: isHovered ? `0 10px 40px ${item.color}40, inset 0 0 20px ${item.color}20` : '0 4px 20px rgba(0,0,0,0.5)'
                }}
              >
                <div className="flex flex-col items-center gap-0.5 min-w-[100px]">
                  <span className="text-base font-black tracking-tight" style={{ color: item.color, textShadow: `0 0 15px ${item.color}` }}>
                    {item.pct}
                  </span>
                  <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
