export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <svg width="100%" height="100%" className="opacity-[0.35]">
        <defs>
          <pattern
            id="cv-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#c9c1b4"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="cv-fade" cx="50%" cy="15%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="cv-mask">
            <rect width="100%" height="100%" fill="url(#cv-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#cv-grid)" mask="url(#cv-mask)" />
      </svg>
    </div>
  );
}