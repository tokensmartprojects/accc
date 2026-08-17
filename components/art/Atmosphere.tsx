import { cx } from "@/lib/cx";

type ArtProps = {
  id: string;
  className?: string;
  rounded?: string;
};

const palettes: Record<string, [string, string, string, string]> = {
  "parallel-banner": ["#0b120f", "#1a2a22", "#3a4a38", "#c9c2a8"],
  "parallel-logo": ["#101814", "#2a3d30", "#65e65f", "#d7d2c2"],
  "wanderer-775": ["#0e1412", "#243028", "#6b5a3a", "#e6dcc4"],
  "wanderer-8812": ["#10160f", "#2c3824", "#4a6a48", "#cfd6c8"],
  "gate-12": ["#0a0e0d", "#1c2420", "#8a7a52", "#eee6d2"],
  "neotokyo-logo": ["#0c1014", "#1c2834", "#4d6d82", "#c5d0d8"],
  "citizen-2201": ["#0b1016", "#243040", "#6a7f92", "#d7dde2"],
  "weapon-119": ["#121214", "#2a2c30", "#8a8f96", "#ececec"],
  "celestial-logo": ["#0c0e16", "#1c2238", "#6a6a8a", "#e4d8c8"],
  "dreamer-4821": ["#120e16", "#2a2438", "#8a6a7a", "#f0e0d0"],
  "dreamer-1104": ["#0e1218", "#222838", "#7a8aa0", "#e8e4dc"],
  "runes-logo": ["#14120e", "#2c281c", "#8a6a3a", "#e8dcc0"],
  "rune-774": ["#16140f", "#30281c", "#a07a40", "#f2e6c8"],
  "relic-882": ["#12100e", "#2a241c", "#6a5840", "#d8c8a8"],
  "relic-88": ["#141210", "#2c2620", "#7a6040", "#e6d4b4"],
  "verdant-logo": ["#0c120e", "#1c2a1e", "#3a5a3c", "#c8d4c4"],
  "origin-192": ["#10160f", "#243226", "#4a6848", "#d4e0d0"],
};

function palette(id: string) {
  return palettes[id] ?? ["#101412", "#222824", "#4a524c", "#d8dcd8"];
}

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = (value * 31 + input.charCodeAt(i)) % 997;
  }
  return value;
}

export function Atmosphere({ id, className, rounded = "rounded-lg" }: ArtProps) {
  const [c0, c1, c2, c3] = palette(id);
  const n = hash(id);
  const portalX = 58 + (n % 18);
  const portalY = 38 + (n % 12);
  const isBanner = id.includes("banner") || id.includes("gate");

  return (
    <div className={cx("relative overflow-hidden bg-surface-2", rounded, className)}>
      <svg viewBox="0 0 160 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={c0} />
            <stop offset="55%" stopColor={c1} />
            <stop offset="100%" stopColor={c0} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="40%" r="45%">
            <stop offset="0%" stopColor={c3} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c0} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="160" height="100" fill={`url(#${id}-sky)`} />
        <rect width="160" height="100" fill={`url(#${id}-glow)`} />
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            cx={(n * (i + 3) * 13) % 160}
            cy={(n * (i + 7) * 7) % 52}
            r={0.4 + (i % 3) * 0.25}
            fill={c3}
            opacity={0.25 + (i % 5) * 0.08}
          />
        ))}
        <ellipse
          cx={portalX}
          cy={portalY}
          rx={isBanner ? 28 : 22}
          ry={isBanner ? 28 : 22}
          fill={c2}
          opacity="0.22"
        />
        <circle
          cx={portalX}
          cy={portalY}
          r={isBanner ? 18 : 14}
          fill="none"
          stroke={c3}
          strokeWidth="1.2"
          opacity="0.7"
        />
        <circle
          cx={portalX}
          cy={portalY}
          r={isBanner ? 10 : 7}
          fill={c0}
          stroke={c2}
          strokeWidth="0.8"
        />
        <path
          d={`M0 78 Q40 ${70 + (n % 8)} 80 76 T160 80 L160 100 L0 100 Z`}
          fill={c1}
        />
        <path
          d={`M0 86 Q50 ${80 + (n % 6)} 90 88 T160 90 L160 100 L0 100 Z`}
          fill={c0}
          opacity="0.9"
        />
        {isBanner ? (
          <path
            d={`M${portalX - 3} 86 L${portalX} 74 L${portalX + 3} 86 Z`}
            fill={c0}
            opacity="0.85"
          />
        ) : null}
        <rect x="0" y="0" width="160" height="100" fill="none" stroke={c2} strokeOpacity="0.12" />
      </svg>
    </div>
  );
}
