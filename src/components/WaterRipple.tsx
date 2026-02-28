'use client';

/**
 * WaterRipple — a subtle animated water ripple overlay for hero sections.
 * Uses CSS-only concentric ring animations. No canvas/WebGL needed.
 * Usage: Place <WaterRipple /> inside any hero section with position: relative.
 */
export function WaterRipple() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
      aria-hidden="true"
    >
      {/* Three offset ripple rings */}
      <div className="ripple-ring ripple-ring-1" />
      <div className="ripple-ring ripple-ring-2" />
      <div className="ripple-ring ripple-ring-3" />

      <style jsx>{`
        .ripple-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(235, 108, 28, 0.35);
          animation: ripple-expand 6s ease-out infinite;
        }

        .ripple-ring-1 {
          bottom: -20%;
          right: -10%;
          width: 300px;
          height: 300px;
          animation-delay: 0s;
        }

        .ripple-ring-2 {
          bottom: -15%;
          right: -5%;
          width: 200px;
          height: 200px;
          animation-delay: 2s;
        }

        .ripple-ring-3 {
          bottom: -25%;
          right: -15%;
          width: 400px;
          height: 400px;
          animation-delay: 4s;
        }

        @keyframes ripple-expand {
          0% {
            transform: scale(0.4);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ripple-ring {
            animation: none;
            opacity: 0.15;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
