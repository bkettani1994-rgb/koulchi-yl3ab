"use client";

import { useId } from "react";

export function GameCoverArt({ accent }: { accent: "primary" | "secondary" }) {
  const uid = useId();
  const accentColor = accent === "primary" ? "#00A8FF" : "#FF4D4D";
  const accentDeep = accent === "primary" ? "#006FCD" : "#E01E26";
  const bgGradientId = `cover-bg-${uid}`;
  const discGradientId = `cover-disc-${uid}`;

  return (
    <svg viewBox="0 0 300 400" className="h-full w-full" role="img" aria-hidden>
      <defs>
        <linearGradient id={bgGradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e0f13" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <radialGradient id={discGradientId} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
          <stop offset="70%" stopColor={accentDeep} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accentDeep} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="300" height="400" rx="24" fill={`url(#${bgGradientId})`} />
      <rect
        x="0.75"
        y="0.75"
        width="298.5"
        height="398.5"
        rx="23.25"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
      />

      <polygon points="0,400 300,180 300,400" fill={accentDeep} opacity="0.16" />
      <polygon points="0,400 220,400 0,260" fill={accentColor} opacity="0.08" />

      <circle cx="150" cy="168" r="92" fill={`url(#${discGradientId})`} />
      <circle cx="150" cy="168" r="68" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <circle cx="150" cy="168" r="68" fill="#08090c" fillOpacity="0.55" />
      <path
        d="M 92 138 A 68 68 0 0 1 208 138"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="150" cy="168" r="16" fill="#050505" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

      <g opacity="0.85">
        <rect x="24" y="24" width="52" height="24" rx="12" fill="rgba(0,0,0,0.45)" />
        <text
          x="50"
          y="40"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.5"
        >
          PS5
        </text>
      </g>

      <g fill={accentColor} opacity="0.7">
        <circle cx="252" cy="60" r="2.5" />
        <circle cx="266" cy="80" r="1.6" />
        <circle cx="238" cy="88" r="1.6" />
      </g>

      <g transform="translate(150 288)" opacity="0.9">
        <rect x="-46" y="-14" width="92" height="34" rx="17" fill="rgba(255,255,255,0.06)" />
        <circle cx="-26" cy="3" r="6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="26" cy="3" r="6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <rect x="-8" y="-2" width="16" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
        <rect x="-2" y="-8" width="4" height="16" rx="2" fill="rgba(255,255,255,0.25)" />
      </g>
    </svg>
  );
}
