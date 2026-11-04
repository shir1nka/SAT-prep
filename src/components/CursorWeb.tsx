"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  twinkle: number;
};

type Pointer = {
  x: number;
  y: number;
  active: boolean;
};

type Palette = {
  dot: string;
  line: string;
  glow: string;
};

const LINK_DISTANCE = 150;
const POINTER_DISTANCE = 230;

function readPalette(): Palette {
  const dark = document.documentElement.classList.contains("dark");
  return dark
    ? { dot: "150, 93, 255", line: "150, 93, 255", glow: "120, 80, 255" }
    : { dot: "117, 52, 226", line: "117, 52, 226", glow: "135, 72, 245" };
}

export default function CursorWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let palette = readPalette();
    let particles: Particle[] = [];

    const pointer: Pointer = { x: 0, y: 0, active: false };

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: 0.9 + Math.random() * 1.6,
      twinkle: Math.random() * Math.PI * 2,
    });

    const targetCount = () => {
      const area = width * height;
      return Math.round(Math.min(140, Math.max(32, area / 15000)));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = targetCount();
      while (particles.length < target) particles.push(makeParticle());
      if (particles.length > target) particles.length = target;

      // Keep every particle inside the new viewport.
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }

      draw(performance.now());
    };

    const step = (p: Particle, time: number) => {
      p.x += p.vx;
      p.y += p.vy;
      p.twinkle += 0.015;

      if (pointer.active) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < POINTER_DISTANCE * POINTER_DISTANCE && dist2 > 1) {
          const dist = Math.sqrt(dist2);
          // Gentle pull: the web leans toward the cursor without collapsing.
          const force = (1 - dist / POINTER_DISTANCE) * 0.045;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Soft friction keeps drifts calm.
      p.vx *= 0.985;
      p.vy *= 0.985;

      const minSpeed = 0.05;
      if (Math.abs(p.vx) < minSpeed) p.vx += (Math.random() - 0.5) * 0.02;
      if (Math.abs(p.vy) < minSpeed) p.vy += (Math.random() - 0.5) * 0.02;

      const maxSpeed = 1.4;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      // Wrap around the edges so the web never runs out of nodes.
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;

      return time;
    };

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        for (const p of particles) step(p, time);
      }

      // Halo around the cursor.
      if (pointer.active) {
        const halo = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          POINTER_DISTANCE
        );
        halo.addColorStop(0, `rgba(${palette.glow}, 0.10)`);
        halo.addColorStop(0.45, `rgba(${palette.glow}, 0.04)`);
        halo.addColorStop(1, `rgba(${palette.glow}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, POINTER_DISTANCE, 0, Math.PI * 2);
        ctx.fill();
      }

      // Lines between the nodes.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < LINK_DISTANCE * LINK_DISTANCE) {
            const dist = Math.sqrt(dist2);
            const strength = 1 - dist / LINK_DISTANCE;
            ctx.strokeStyle = `rgba(${palette.line}, ${strength * 0.28})`;
            ctx.lineWidth = strength > 0.55 ? 1.1 : 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Threads from the nodes to the cursor.
        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < POINTER_DISTANCE * POINTER_DISTANCE) {
            const dist = Math.sqrt(dist2);
            const strength = 1 - dist / POINTER_DISTANCE;
            ctx.strokeStyle = `rgba(${palette.line}, ${strength * 0.55})`;
            ctx.lineWidth = 0.8 + strength * 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // Dots (drawn last so they sit above the threads).
      for (const p of particles) {
        const flicker = reduceMotion
          ? 0.75
          : 0.55 + Math.sin(p.twinkle) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.dot}, ${flicker})`;
        ctx.fill();
      }

      if (pointer.active) {
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.dot}, 0.9)`;
        ctx.fill();
      }
    }

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion) {
        draw(performance.now());
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      if (reduceMotion) draw(performance.now());
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      if (reduceMotion) draw(performance.now());
    };

    const handleVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        start();
      } else {
        cancelAnimationFrame(frame);
      }
    };

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    resize();
    start();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
