"use client";

import { useState, useEffect, useRef } from "react";

const products = [
  { name: "X1Fit", color: "#6B38ED", label: "FITNESS", icon: "⚡", desc: "Fitness & Wellness", year: "2026" },
  { name: "X1Cart", color: "#10B981", label: "SHOP", icon: "🛍", desc: "Digital Marketplace", year: "2026" },
  { name: "X1Auction", color: "#8B5CF6", label: "AUCTION", icon: "🔨", desc: "Auction Platform", year: "2027" },
  { name: "X1Run", color: "#FBBF24", label: "ARCADE", icon: "🏎", desc: "Arcade Racing", year: "2027" },
  { name: "X1Racing", color: "#DC2626", label: "SIM", icon: "🏁", desc: "Simulation Racing", year: "2027" },
];

const ANGLE = 360 / 5;

function CoinSegment({ index, color, hovered, onHover, onLeave, icon }: any) {
  const startAngle = index * ANGLE - 90;
  const endAngle = startAngle + ANGLE;
  const r = 140, innerR = 48, cx = 160, cy = 160;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle)), y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle)), y2 = cy + r * Math.sin(toRad(endAngle));
  const ix1 = cx + innerR * Math.cos(toRad(startAngle)), iy1 = cy + innerR * Math.sin(toRad(startAngle));
  const ix2 = cx + innerR * Math.cos(toRad(endAngle)), iy2 = cy + innerR * Math.sin(toRad(endAngle));
  const midAngle = startAngle + ANGLE / 2;
  const iconX = cx + 98 * Math.cos(toRad(midAngle)), iconY = cy + 98 * Math.sin(toRad(midAngle));
  const d = `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 0 0 ${ix1} ${iy1} Z`;

  return (
    <g onMouseEnter={() => onHover(index)} onMouseLeave={onLeave} style={{ cursor: "pointer" }}>
      <defs>
        <radialGradient id={`sg${index}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </radialGradient>
        <filter id={`gf${index}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={hovered ? "5" : "1.5"} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={d} fill={`url(#sg${index})`} stroke="#0a0f1e" strokeWidth="2.5" filter={`url(#gf${index})`}
        style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "scale(1.06)" : "scale(1)", transformOrigin: `${cx}px ${cy}px` }} />
      <path d={d} fill="white" opacity={hovered ? 0.15 : 0.04} style={{ pointerEvents: "none" }} />
      <text x={iconX} y={iconY} textAnchor="middle" dominantBaseline="central"
        fontSize={hovered ? "24" : "19"} style={{ transition: "font-size 0.25s", pointerEvents: "none", userSelect: "none" }}>{icon}</text>
    </g>
  );
}

export function X1CoinSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const rotRef = useRef(0);

  useEffect(() => {
    const animate = (time: number) => {
      if (!paused) {
        if (lastTimeRef.current !== null) {
          rotRef.current = (rotRef.current + (time - lastTimeRef.current) * 0.018) % 360;
          setRotation(rotRef.current);
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [paused]);

  const active = hovered !== null ? products[hovered] : null;

  return (
    <section id="x1-coin" style={{ minHeight:"100vh", background:"transparent", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 20px", userSelect:"none", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes spinRev { to { transform: rotate(-360deg); } }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
      `}</style>

      {/* Ambient blobs */}
      <div style={{ position:"absolute", top:"8%", left:"10%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(107,56,237,0.13) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* Title */}
      <div style={{ textAlign:"center", marginBottom:40, animation:"fadeUp 0.8s ease forwards" }}>
        <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:10, letterSpacing:"0.4em", color:"#475569", marginBottom:8, textTransform:"uppercase" }}>Loyalty Points · Not Cryptocurrency</div>
        <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:46, fontWeight:900, color:"#fff", letterSpacing:"0.04em", lineHeight:1, textShadow:"0 0 40px rgba(107,56,237,0.5)" }}>
          X1 <span style={{ color:"#6B38ED" }}>COIN</span>
        </div>
        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:13, color:"#475569", letterSpacing:"0.18em", marginTop:8, textTransform:"uppercase" }}>One Balance · Five Worlds</div>
      </div>

      {/* Coin */}
      <div style={{ position:"relative", width:340, height:340 }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setHovered(null); }}>
        <div style={{ position:"absolute", inset:-24, borderRadius:"50%", background:"conic-gradient(from 0deg,#6B38ED,#10B981,#8B5CF6,#FBBF24,#DC2626,#6B38ED)", opacity:0.3, filter:"blur(22px)", animation:"spinRing 8s linear infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:"conic-gradient(from 180deg,#DC2626,#FBBF24,#8B5CF6,#10B981,#6B38ED,#DC2626)", opacity:0.12, filter:"blur(8px)", animation:"spinRev 12s linear infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-30, left:"8%", right:"8%", height:36, background:"radial-gradient(ellipse, rgba(107,56,237,0.5) 0%, transparent 70%)", filter:"blur(14px)", pointerEvents:"none" }} />

        <div style={{ width:"100%", height:"100%", animation:"floatY 4s ease-in-out infinite" }}>
          <svg width="340" height="340" viewBox="0 0 320 320"
            style={{ transform:`rotate(${rotation}deg)`, filter:"drop-shadow(0 4px 30px rgba(107,56,237,0.4))", display:"block" }}>
            <defs>
              <radialGradient id="rimG" cx="50%" cy="30%" r="70%"><stop offset="0%" stopColor="#1E2D40"/><stop offset="100%" stopColor="#060B14"/></radialGradient>
              <radialGradient id="cenG" cx="50%" cy="35%" r="65%"><stop offset="0%" stopColor="#1A1040"/><stop offset="100%" stopColor="#060810"/></radialGradient>
              <filter id="cGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx="160" cy="160" r="158" fill="url(#rimG)" />
            <circle cx="160" cy="160" r="154" fill="none" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="160" cy="160" r="149" fill="none" stroke="#0F172A" strokeWidth="1" strokeDasharray="5 4" opacity="0.7" />
            <circle cx="160" cy="160" r="144" fill="#060B14" />
            {products.map((p, i) => (
              <CoinSegment key={i} index={i} color={p.color} hovered={hovered===i} onHover={setHovered} onLeave={() => setHovered(null)} icon={p.icon} />
            ))}
            {products.map((_, i) => {
              const ang = (i * ANGLE - 90) * Math.PI / 180;
              return <line key={i} x1={160+48*Math.cos(ang)} y1={160+48*Math.sin(ang)} x2={160+144*Math.cos(ang)} y2={160+144*Math.sin(ang)} stroke="#060B14" strokeWidth="3" />;
            })}
            <circle cx="160" cy="160" r="50" fill="url(#cenG)" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="160" cy="160" r="45" fill="none" stroke="#6B38ED" strokeWidth="0.8" opacity="0.6" />
            <circle cx="160" cy="160" r="41" fill="#060810" />
            <text x="160" y="155" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="'Orbitron',sans-serif" fontWeight="900" fontSize="19" letterSpacing="2" filter="url(#cGlow)">X1</text>
            <text x="160" y="173" textAnchor="middle" dominantBaseline="middle" fill="#6B38ED" fontFamily="'Orbitron',sans-serif" fontWeight="700" fontSize="8" letterSpacing="4">COIN</text>
            <ellipse cx="153" cy="147" rx="7" ry="4" fill="white" opacity="0.1" transform="rotate(-30,153,147)" />
          </svg>
        </div>
      </div>

      {/* Product info */}
      <div style={{ marginTop:28, height:76, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        {active ? (
          <div key={hovered} style={{ textAlign:"center", animation:"fadeUp 0.25s ease forwards" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:5 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:active.color, boxShadow:`0 0 14px ${active.color}` }} />
              <span style={{ fontFamily:"'Orbitron',sans-serif", fontWeight:900, fontSize:22, color:active.color, letterSpacing:"0.08em" }}>{active.name}</span>
              <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:12, color:"#334155", letterSpacing:"0.1em" }}>{active.year}</span>
            </div>
            <div style={{ color:"#94A3B8", fontFamily:"'Rajdhani',sans-serif", fontSize:15, letterSpacing:"0.12em", textTransform:"uppercase" }}>{active.desc}</div>
          </div>
        ) : (
          <div style={{ color:"#334155", fontFamily:"'Rajdhani',sans-serif", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", animation:"pulse 2.5s ease infinite" }}>
            ↑ Hover a segment to explore
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:8, marginTop:18, flexWrap:"wrap", justifyContent:"center", padding:"12px 22px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:50 }}>
        {products.map((p, i) => (
          <div key={i}
            onMouseEnter={() => { setHovered(i); setPaused(true); }}
            onMouseLeave={() => { setHovered(null); setPaused(false); }}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:20, cursor:"pointer", background:hovered===i?`${p.color}18`:"transparent", border:`1px solid ${hovered===i?p.color+"55":"transparent"}`, transition:"all 0.25s" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:p.color, boxShadow:hovered===i?`0 0 10px ${p.color}`:"none", transition:"box-shadow 0.3s" }} />
            <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:hovered===i?p.color:"#475569", transition:"color 0.25s" }}>{p.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
