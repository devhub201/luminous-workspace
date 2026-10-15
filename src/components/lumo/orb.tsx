import { useEffect, useRef } from "react";
import { usePreferences } from "./preferences";
export type OrbState =
  "idle" | "listening" | "thinking" | "speaking" | "success" | "error" | "loading";
/** Canvas energy shell, drawn in depth order. No WebGL or media dependency. */
export function Orb({
  state = "idle",
  compact = false,
  amplitude = 0,
}: {
  state?: OrbState;
  compact?: boolean;
  amplitude?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const current = useRef({ state, amplitude });
  current.current = { state, amplitude };
  const { preferences } = usePreferences();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 600;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      last = 0,
      time = 0,
      speed = 0.4,
      visible = true;
    const visibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", visibility);
    const draw = (stamp: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || stamp - last < 33) return;
      const dt = Math.min((stamp - last) / 1000, 0.05);
      last = stamp;
      const active = preferences.motion && !reduce.matches;
      const s = current.current.state;
      speed += ((s === "thinking" ? 1.2 : s === "listening" ? 0.65 : 0.3) - speed) * 0.04;
      if (active) time += dt * speed;
      const t = time;
      const cyan =
        s === "error" ? "241,164,91" : preferences.accent === "blue" ? "82,154,255" : "53,216,231";
      const blue = "47,112,232";
      ctx.clearRect(0, 0, size, size);
      const pulse =
        active && s === "listening" ? current.current.amplitude * 6 : s === "success" ? 4 : 0;
      const radius = 157 + pulse;
      const halo = ctx.createRadialGradient(300, 300, 115, 300, 300, 268);
      halo.addColorStop(0, `rgba(${blue},0)`);
      halo.addColorStop(0.53, `rgba(${cyan},.045)`);
      halo.addColorStop(1, `rgba(${cyan},0)`);
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, size, size);
      // Nearly black inner mass with dimensional, edge-biased light.
      const core = ctx.createRadialGradient(267, 254, 15, 300, 300, radius);
      core.addColorStop(0, "rgba(7,16,22,1)");
      core.addColorStop(0.73, "rgba(5,15,24,1)");
      core.addColorStop(0.96, "rgba(9,39,52,.94)");
      core.addColorStop(1, `rgba(${cyan},.28)`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(300, 300, radius, 0, Math.PI * 2);
      ctx.fill();
      // Spherical paths rotate through independent planes. Back paths remain dim.
      const paths: Array<{
        points: Array<[number, number]>;
        depth: number;
        alpha: number;
        index: number;
      }> = [];
      for (let j = 0; j < 33; j++) {
        const points: Array<[number, number]> = [];
        let depth = 0;
        const tilt = 0.62 + Math.sin(j * 2.18) * 0.54;
        const rot = j * 0.39 + t * (j % 2 ? 0.31 : -0.23);
        const r = radius * (0.96 + 0.07 * Math.sin(j * 3.2));
        for (let k = 0; k <= 150; k++) {
          const a = (k / 150) * Math.PI * 2;
          const noise = 1 + 0.017 * Math.sin(a * 7 + j + t * 2);
          const x = Math.cos(a) * r * noise;
          const y = Math.sin(a) * r * Math.cos(tilt);
          const z = Math.sin(a) * r * Math.sin(tilt);
          const rx = x * Math.cos(rot) - y * Math.sin(rot);
          const ry = x * Math.sin(rot) + y * Math.cos(rot);
          points.push([300 + rx * (1 + z / 950), 300 + ry * (1 + z / 950)]);
          depth += z;
        }
        paths.push({ points, depth, alpha: 0.1 + (j % 5) * 0.038, index: j });
      }
      paths.sort((a, b) => a.depth - b.depth);
      for (const path of paths) {
        ctx.strokeStyle = `rgba(${path.index % 4 ? cyan : blue},${path.alpha})`;
        ctx.lineWidth = path.index % 7 === 0 ? 1.3 : 0.65;
        ctx.beginPath();
        path.points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
        // An illuminated moving segment, rather than a white central dot.
        const start = Math.floor((t * 15 + path.index * 11) % 130);
        ctx.strokeStyle = `rgba(${cyan},${path.index % 3 ? 0.3 : 0.62})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        path.points
          .slice(start, start + 17)
          .forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
      }
      // Thin off-axis outer instrumentation, with deliberate gaps.
      for (let j = 0; j < 3; j++) {
        ctx.save();
        ctx.translate(300, 300);
        ctx.rotate(-0.4 + j * 0.65 + t * 0.06);
        ctx.strokeStyle = `rgba(${j === 1 ? blue : cyan},${0.15 + j * 0.03})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.ellipse(0, 0, 185 + j * 17, 85 + j * 22, 0, 0.15, 5.6);
        ctx.stroke();
        ctx.restore();
      }
      // Limited surface points, constrained to the energy shell.
      for (let j = 0; j < 20; j++) {
        const a = j * 2.399 + t * 0.12;
        const y = 1 - (2 * (j + 0.5)) / 20;
        const r = Math.sqrt(1 - y * y);
        const x = r * Math.cos(a),
          z = r * Math.sin(a);
        if (z < 0) continue;
        ctx.fillStyle = `rgba(${cyan},${0.2 + z * 0.5})`;
        ctx.beginPath();
        ctx.arc(300 + x * radius, 300 + y * radius, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [preferences.motion, preferences.accent]);
  return (
    <div className={`orb ${compact ? "orb-compact" : ""}`} data-state={state}>
      <canvas ref={ref} role="img" aria-label={`LUMO energy core, ${state}`} />
      <div className="orb-crosshair crosshair-top" />
      <div className="orb-crosshair crosshair-bottom" />
    </div>
  );
}
