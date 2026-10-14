import { useEffect, useRef } from "react";
import { createOrbitalSphereRenderer, ORBITAL_SPHERE_DEFAULTS, type OrbitalSphereOptions } from "@/components/ui/orbital-sphere-utils/orbitalSphereRenderer";

export type OrbitalSphereBackgroundProps = Partial<OrbitalSphereOptions> & { className?: string };
export function OrbitalSphereBackground({ className = "", ...props }: OrbitalSphereBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...ORBITAL_SPHERE_DEFAULTS, ...props });
  optionsRef.current = { ...ORBITAL_SPHERE_DEFAULTS, ...props };
  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current;
    if (!host || !canvas) return;
    const renderer = createOrbitalSphereRenderer(canvas, () => optionsRef.current);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = true;
    const tick = () => {
      frame = 0;
      renderer.render();
      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden) tick();
    };
    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
      renderer.render();
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      sync();
    });
    resizeObserver.observe(host); intersection.observe(host);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    resize(); sync();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect(); intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      renderer.dispose();
    };
  }, []);
  return <div ref={hostRef} className={`threeui-background orbital-sphere ${className}`} aria-hidden="true">
    <canvas ref={canvasRef} style={{ filter: `hue-rotate(${optionsRef.current.hue}deg)` }} />
  </div>;
}
export default OrbitalSphereBackground;
