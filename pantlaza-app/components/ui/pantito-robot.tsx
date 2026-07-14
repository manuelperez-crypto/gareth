export const PantitoRobot = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 260 340"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Pantito — Asistente IA de Pantlaza"
  >
    {/* ── Glow aura ── */}
    <ellipse cx="130" cy="310" rx="80" ry="14" fill="#1d4ed8" opacity="0.25" />

    {/* ── Antenna base ── */}
    <rect x="124" y="28" width="12" height="30" rx="6" fill="#0f2c5e" />

    {/* ── Antenna orb (gold, glowing) ── */}
    <circle cx="130" cy="22" r="12" fill="#f59e0b" opacity="0.25" />
    <circle cx="130" cy="22" r="8" fill="#f59e0b" />
    <circle cx="127" cy="19" r="2.5" fill="white" opacity="0.7" />

    {/* ── Head ── */}
    <rect x="55" y="55" width="150" height="100" rx="28" fill="#1d4ed8" />
    {/* Head inner panel */}
    <rect x="68" y="67" width="124" height="76" rx="20" fill="#0f2c5e" />

    {/* ── Eyes ── */}
    {/* Left eye */}
    <circle cx="96" cy="100" r="18" fill="#f59e0b" />
    <circle cx="96" cy="100" r="10" fill="#0f2c5e" />
    <circle cx="96" cy="100" r="5" fill="#f59e0b" opacity="0.6" />
    <circle cx="100" cy="95" r="3.5" fill="white" opacity="0.85" />
    <circle cx="92" cy="107" r="1.5" fill="white" opacity="0.4" />

    {/* Right eye */}
    <circle cx="164" cy="100" r="18" fill="#f59e0b" />
    <circle cx="164" cy="100" r="10" fill="#0f2c5e" />
    <circle cx="164" cy="100" r="5" fill="#f59e0b" opacity="0.6" />
    <circle cx="168" cy="95" r="3.5" fill="white" opacity="0.85" />
    <circle cx="160" cy="107" r="1.5" fill="white" opacity="0.4" />

    {/* ── Smile ── */}
    <path
      d="M105 125 Q130 142 155 125"
      stroke="#f59e0b"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* ── Cheek blush ── */}
    <ellipse cx="80" cy="120" rx="10" ry="6" fill="#f59e0b" opacity="0.18" />
    <ellipse cx="180" cy="120" rx="10" ry="6" fill="#f59e0b" opacity="0.18" />

    {/* ── Neck ── */}
    <rect x="112" y="155" width="36" height="18" rx="7" fill="#1d4ed8" />
    <rect x="118" y="158" width="24" height="5" rx="2.5" fill="#0f2c5e" />

    {/* ── Body ── */}
    <rect x="45" y="170" width="170" height="120" rx="28" fill="#1d4ed8" />

    {/* Body side bolts */}
    <circle cx="58" cy="195" r="5" fill="#0f2c5e" />
    <circle cx="202" cy="195" r="5" fill="#0f2c5e" />
    <circle cx="58" cy="265" r="5" fill="#0f2c5e" />
    <circle cx="202" cy="265" r="5" fill="#0f2c5e" />

    {/* ── Chest panel ── */}
    <rect x="65" y="185" width="130" height="92" rx="16" fill="#0f2c5e" />

    {/* Panel screen top row */}
    <rect x="78" y="198" width="44" height="10" rx="5" fill="#3b82f6" opacity="0.8" />
    <rect x="130" y="198" width="52" height="10" rx="5" fill="#f59e0b" opacity="0.75" />

    {/* Panel progress bars */}
    <rect x="78" y="216" width="104" height="6" rx="3" fill="#1d4ed8" />
    <rect x="78" y="216" width="72" height="6" rx="3" fill="#3b82f6" />

    <rect x="78" y="229" width="104" height="6" rx="3" fill="#1d4ed8" />
    <rect x="78" y="229" width="88" height="6" rx="3" fill="#93c5fd" opacity="0.6" />

    {/* Pantlaza mini logo on chest */}
    <polygon points="118,255 130,238 142,255" fill="#ffffff" opacity="0.9" />
    <polygon points="124,246 130,238 136,246" fill="#f59e0b" />
    <line x1="118" y1="255" x2="142" y2="255" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

    {/* ── Left arm ── */}
    <rect x="5" y="178" width="38" height="88" rx="19" fill="#1d4ed8" />
    {/* Left hand */}
    <circle cx="24" cy="272" r="18" fill="#1d4ed8" />
    <circle cx="24" cy="272" r="12" fill="#0f2c5e" />
    {/* Left fingers */}
    <rect x="10" y="282" width="8" height="18" rx="4" fill="#1d4ed8" />
    <rect x="20" y="284" width="8" height="18" rx="4" fill="#1d4ed8" />
    <rect x="30" y="282" width="8" height="18" rx="4" fill="#1d4ed8" />

    {/* ── Right arm ── */}
    <rect x="217" y="178" width="38" height="88" rx="19" fill="#1d4ed8" />
    {/* Right hand */}
    <circle cx="236" cy="272" r="18" fill="#1d4ed8" />
    <circle cx="236" cy="272" r="12" fill="#0f2c5e" />
    {/* Right fingers */}
    <rect x="222" y="282" width="8" height="18" rx="4" fill="#1d4ed8" />
    <rect x="232" y="284" width="8" height="18" rx="4" fill="#1d4ed8" />
    <rect x="242" y="282" width="8" height="18" rx="4" fill="#1d4ed8" />

    {/* ── Legs ── */}
    <rect x="80" y="286" width="40" height="40" rx="14" fill="#0f2c5e" />
    <rect x="140" y="286" width="40" height="40" rx="14" fill="#0f2c5e" />

    {/* ── Feet ── */}
    <rect x="68" y="316" width="58" height="20" rx="10" fill="#0f2c5e" />
    <rect x="134" y="316" width="58" height="20" rx="10" fill="#0f2c5e" />

    {/* Foot highlight */}
    <rect x="74" y="319" width="24" height="5" rx="2.5" fill="#1d4ed8" opacity="0.5" />
    <rect x="140" y="319" width="24" height="5" rx="2.5" fill="#1d4ed8" opacity="0.5" />
  </svg>
)
