import React, { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  id: number;
}

/**
 * Interactive cursor tracker that projects:
 * 1. A delicate light-red editorial ink gradient following the pointer.
 * 2. Velocity-responsive motion blur effects and trailing ink mist.
 */
export const CursorMotionGradient: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: -1000,
    y: -1000,
  });
  const [velocity, setVelocity] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);

  const prevPosRef = useRef<{ x: number; y: number; time: number }>({
    x: -1000,
    y: -1000,
    time: Date.now(),
  });

  const trailRef = useRef<TrailPoint[]>([]);
  const [, setFrame] = useState(0);

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - prevPosRef.current.time);
      const dx = e.clientX - prevPosRef.current.x;
      const dy = e.clientY - prevPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      const spd = Math.min(dist / dt, 15); // normalized speed

      const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      prevPosRef.current = { x: e.clientX, y: e.clientY, time: now };
      setMousePos({ x: e.clientX, y: e.clientY });
      setVelocity(spd);
      setAngle(currentAngle);

      // Add to trailing history
      trailRef.current.unshift({
        x: e.clientX,
        y: e.clientY,
        vx: dx,
        vy: dy,
        speed: spd,
        id: Math.random(),
      });
      if (trailRef.current.length > 5) {
        trailRef.current.pop();
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
      setVelocity(0);
      trailRef.current = [];
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Decay loop for velocity and trail blur
    const loop = () => {
      setVelocity((v) => (v > 0.05 ? v * 0.92 : 0));
      setFrame((f) => f + 1);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Compute dynamic blur in pixels based on cursor speed
  const blurAmount = Math.min(Math.max(velocity * 4, 3), 28);
  const stretchScale = 1 + Math.min(velocity * 0.25, 1.2);

  if (mousePos.x < 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Light red gradient spotlight following cursor */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: `radial-gradient(circle 300px at center, rgba(239, 68, 68, 0.11) 0%, rgba(220, 38, 38, 0.05) 40%, rgba(185, 28, 28, 0.015) 65%, transparent 75%)`,
          opacity: 0.95,
        }}
      />

      {/* 2. Motion blur trailing streak responding to cursor direction & velocity */}
      {velocity > 0.15 && (
        <div
          className="absolute w-24 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full motion-blur-trail"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: `translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretchScale})`,
            filter: `blur(${blurAmount}px)`,
            background: `linear-gradient(90deg, rgba(220, 38, 38, 0.25) 0%, rgba(239, 68, 68, 0.12) 60%, transparent 100%)`,
            opacity: Math.min(velocity * 0.4, 0.8),
          }}
        />
      )}

      {/* 3. Trailing ghost nodes for extra cinematic motion blur during brisk gestures */}
      {trailRef.current.map((pt, i) => {
        const trailBlur = Math.min(8 + i * 4 + pt.speed * 3, 24);
        const trailOpacity = Math.max(0, (0.28 - i * 0.06) * Math.min(pt.speed, 2));
        if (trailOpacity <= 0) return null;

        return (
          <div
            key={pt.id}
            className="absolute rounded-full pointer-events-none transition-all duration-75"
            style={{
              left: `${pt.x}px`,
              top: `${pt.y}px`,
              width: `${24 + i * 8}px`,
              height: `${24 + i * 8}px`,
              transform: "translate(-50%, -50%)",
              filter: `blur(${trailBlur}px)`,
              background: `radial-gradient(circle, rgba(220, 38, 38, ${trailOpacity}) 0%, transparent 70%)`,
            }}
          />
        );
      })}
    </div>
  );
};
