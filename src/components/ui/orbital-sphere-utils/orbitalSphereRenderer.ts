export type OrbitalSphereOptions = { hue: number; speed: number; density: number };
export const ORBITAL_SPHERE_DEFAULTS: OrbitalSphereOptions = { hue: 0, speed: 0.22, density: 700 };

/** Lightweight projected particle sphere; CSS tokens provide the brand palette. */
export function createOrbitalSphereRenderer(canvas: HTMLCanvasElement, options: () => OrbitalSphereOptions) {
  const ctx = canvas.getContext("2d");
  let width = 0, height = 0, disposed = false, angle = 0, lastTime = 0;
  let gold = "", green = "";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const project = (x: number, y: number, z: number, radius: number) => {
    const perspective = 3.8 / (3.8 - z);
    return { x: width / 2 + x * radius * perspective, y: height / 2 + y * radius * perspective, z, perspective };
  };
  return {
    resize(w: number, h: number) {
      width = Math.max(0, w); height = Math.max(0, h);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const style = getComputedStyle(canvas);
      gold = style.getPropertyValue("--orbital-gold").trim();
      green = style.getPropertyValue("--orbital-green").trim();
    },
    render() {
      if (!ctx || disposed || !width || !height) return;
      const now = performance.now();
      if (!reducedMotion.matches) angle += Math.min((now - lastTime) / 1000, 0.05) * options().speed;
      lastTime = now;
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.34;
      const count = Math.max(100, Math.min(1600, Math.round(options().density)));
      const points = Array.from({ length: count }, (_, i) => {
        const y = 1 - (i / (count - 1)) * 2;
        const ring = Math.sqrt(1 - y * y);
        const theta = i * 2.399963229728653 + angle;
        return { ...project(Math.cos(theta) * ring, y, Math.sin(theta) * ring, radius), id: i };
      }).sort((a, b) => a.z - b.z);
      for (const point of points) {
        // Stable particle phases create individual twinkles as the sphere rotates.
        const pulse = reducedMotion.matches ? 0.75 : (Math.sin(angle * 11 + point.id * 2.399963) + 1) / 2;
        const depth = (point.z + 1) / 2;
        const sparkle = point.id % 19 === 0;
        ctx.globalAlpha = (0.25 + depth * 0.75) * (0.3 + pulse * 0.7);
        ctx.fillStyle = sparkle || point.z > 0.55 ? gold : green;
        if (sparkle) {
          ctx.shadowBlur = 6 + pulse * 10;
          ctx.shadowColor = gold;
        }
        ctx.beginPath();
        ctx.arc(point.x, point.y, (0.95 + pulse * (sparkle ? 1.1 : 0.6)) * point.perspective, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let ring = 0; ring < 3; ring++) {
        ctx.strokeStyle = ring === 1 ? gold : green; ctx.lineWidth = 0.7; ctx.globalAlpha = 0.42;
        ctx.beginPath();
        for (let step = 0; step <= 160; step++) {
          const t = step / 160 * Math.PI * 2;
          const tilt = ring * 0.85 + 0.35;
          const x = Math.cos(t) * 1.3, y = Math.sin(t) * Math.cos(tilt) * 1.3, z = Math.sin(t) * Math.sin(tilt) * 1.3;
          const p = project(x * Math.cos(angle * 0.4) + z * Math.sin(angle * 0.4), y, z * Math.cos(angle * 0.4) - x * Math.sin(angle * 0.4), radius);
          if (step === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
          if (step === Math.floor(((angle * 15 + ring * 47) % 160 + 160) % 160)) {
            const pulse = reducedMotion.matches ? 0.85 : (Math.sin(angle * 13 + ring * 2) + 1) / 2;
            const size = 4 + pulse * 3;
            ctx.save();
            ctx.globalAlpha = 0.6 + pulse * 0.4;
            ctx.shadowBlur = 12 + pulse * 16;
            ctx.shadowColor = gold;
            ctx.fillStyle = gold;
            ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
            ctx.restore();
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    dispose() { disposed = true; ctx?.clearRect(0, 0, width, height); },
  };
}
