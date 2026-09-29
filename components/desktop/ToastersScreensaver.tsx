"use client";

import { useEffect, useRef } from "react";
import { useOSStore } from "@/stores/useOSStore";

interface Flyer {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  kind: "toaster" | "toast";
  wingPhase: number;
  wingSpeed: number;
}

function createFlyer(
  width: number,
  height: number,
  kind: Flyer["kind"],
): Flyer {
  const fromLeft = Math.random() > 0.5;
  return {
    x: fromLeft ? -80 - Math.random() * 120 : width + Math.random() * 120,
    y: Math.random() * height,
    vx: (fromLeft ? 1 : -1) * (0.6 + Math.random() * 1.4),
    vy: 0.25 + Math.random() * 0.9,
    size: kind === "toaster" ? 42 + Math.random() * 28 : 22 + Math.random() * 14,
    rotation: (Math.random() - 0.5) * 0.4,
    spin: (Math.random() - 0.5) * 0.02,
    kind,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.15 + Math.random() * 0.2,
  };
}

function drawToaster(
  ctx: CanvasRenderingContext2D,
  f: Flyer,
  time: number,
) {
  const wing = Math.sin(time * f.wingSpeed * 60 + f.wingPhase) * 0.55;
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rotation);
  ctx.scale(f.size / 56, f.size / 56);

  // Left wing
  ctx.save();
  ctx.translate(-18, -6);
  ctx.rotate(-0.35 + wing);
  ctx.fillStyle = "#f0f0f0";
  ctx.beginPath();
  ctx.ellipse(-16, 0, 18, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Right wing
  ctx.save();
  ctx.translate(18, -6);
  ctx.rotate(0.35 - wing);
  ctx.fillStyle = "#f0f0f0";
  ctx.beginPath();
  ctx.ellipse(16, 0, 18, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Body
  const grad = ctx.createLinearGradient(-22, -16, 22, 16);
  grad.addColorStop(0, "#d4d4d8");
  grad.addColorStop(0.5, "#a1a1aa");
  grad.addColorStop(1, "#71717a");
  ctx.fillStyle = grad;
  ctx.strokeStyle = "#3f3f46";
  ctx.lineWidth = 2;
  roundRect(ctx, -22, -14, 44, 28, 4);
  ctx.fill();
  ctx.stroke();

  // Slots
  ctx.fillStyle = "#18181b";
  roundRect(ctx, -14, -10, 10, 14, 2);
  ctx.fill();
  roundRect(ctx, 4, -10, 10, 14, 2);
  ctx.fill();

  // Lever
  ctx.fillStyle = "#ef4444";
  roundRect(ctx, 18, -4, 5, 12, 1.5);
  ctx.fill();

  // Feet
  ctx.fillStyle = "#52525b";
  roundRect(ctx, -16, 12, 8, 4, 1);
  ctx.fill();
  roundRect(ctx, 8, 12, 8, 4, 1);
  ctx.fill();

  ctx.restore();
}

function drawToast(ctx: CanvasRenderingContext2D, f: Flyer) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rotation);
  ctx.scale(f.size / 28, f.size / 28);

  ctx.fillStyle = "#d97706";
  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-12, 6);
  ctx.lineTo(-12, -2);
  ctx.quadraticCurveTo(-12, -12, -4, -12);
  ctx.quadraticCurveTo(0, -16, 4, -12);
  ctx.quadraticCurveTo(12, -12, 12, -2);
  ctx.lineTo(12, 6);
  ctx.quadraticCurveTo(12, 10, 8, 10);
  ctx.lineTo(-8, 10);
  ctx.quadraticCurveTo(-12, 10, -12, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.ellipse(0, 0, 6, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function ToastersScreensaver() {
  const stopScreensaver = useOSStore((s) => s.stopScreensaver);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flyersRef = useRef<Flyer[]>([]);
  const rafRef = useRef<number>(0);
  const armedRef = useRef(false);

  useEffect(() => {
    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, 450);

    const dismiss = () => {
      if (!armedRef.current) return;
      stopScreensaver();
    };

    window.addEventListener("keydown", dismiss);
    window.addEventListener("mousemove", dismiss);
    window.addEventListener("mousedown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("wheel", dismiss);
    window.addEventListener("touchstart", dismiss);

    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("mousemove", dismiss);
      window.removeEventListener("mousedown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [stopScreensaver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(
      18,
      Math.max(10, Math.floor((window.innerWidth * window.innerHeight) / 90000)),
    );
    flyersRef.current = Array.from({ length: count }, (_, i) =>
      createFlyer(
        canvas.width,
        canvas.height,
        i % 3 === 0 ? "toast" : "toaster",
      ),
    );

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      const { width, height } = canvas;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      for (const f of flyersRef.current) {
        f.x += f.vx * dt * 1.6;
        f.y += f.vy * dt * 1.6;
        f.rotation += f.spin * dt;

        if (f.vx > 0 && f.x > width + 100) {
          f.x = -100;
          f.y = Math.random() * height;
        } else if (f.vx < 0 && f.x < -100) {
          f.x = width + 100;
          f.y = Math.random() * height;
        }
        if (f.y > height + 80) {
          f.y = -80;
          f.x = Math.random() * width;
        }

        if (f.kind === "toaster") drawToaster(ctx, f, now / 1000);
        else drawToast(ctx, f);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black"
      role="dialog"
      aria-label="Flying Toasters screensaver. Move the mouse or press a key to exit."
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-wide text-white/35">
        Move mouse or press any key to exit
      </p>
    </div>
  );
}
