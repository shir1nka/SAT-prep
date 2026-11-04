"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function CursorWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let mouse: Point | null = null;
    const points: Point[] = [];
    let animationFrame: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    });

    const dark = document.documentElement.classList.contains("dark");
    const lineColor = dark ? "rgba(150, 93, 255, 0.15)" : "rgba(150, 93, 255, 0.08)";
    const dotColor = dark ? "rgba(150, 93, 255, 0.4)" : "rgba(150, 93, 255, 0.3)";

    let lastSpawn = 0;
    const spawnInterval = 45;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (mouse && now - lastSpawn > spawnInterval) {
        points.push({ x: mouse.x, y: mouse.y });
        lastSpawn = now;
      }

      if (mouse) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          120
        );
        gradient.addColorStop(0, dark ? "rgba(150, 93, 255, 0.12)" : "rgba(150, 93, 255, 0.06)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.y += 0.4;
        p.x += Math.sin(Date.now() / 1000 + i) * 0.3;

        const age = points.length - i;
        const alpha = Math.max(0, 1 - age / points.length);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace(/[\d.]+\)/, `${alpha * 0.4})`);
        ctx.fill();

        if (mouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = lineColor.replace(
              /[\d.]+\)/,
              `${Math.max(0, 1 - dist / 300) * 0.15})`
            );
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineColor.replace(
              /[\d.]+\)/,
              `${Math.max(0, 1 - dist / 120) * 0.08})`
            );
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (age > 80) {
          points.splice(i, 1);
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none" />;
}
