import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";

const format = (value: number) => Math.round(value).toLocaleString("en-US");
const tiers = [
  { title: "Standard terms", investor: 60, revat: 40, terms: "You keep 60% · Revat 40%" },
  { title: "Allocation above 1 million USDT", investor: 75, revat: 25, terms: "You keep about 75% · Revat about 25%" },
];

function useAnimatedProfit(profit: number) {
  const [displayed, setDisplayed] = useState(profit);
  const current = useRef(profit);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      current.current = profit;
      setDisplayed(profit);
    };
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 500);
      const value = from + (profit - from) * (1 - Math.pow(1 - progress, 3));
      current.current = value;
      setDisplayed(value);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    if (motion.matches) finish(); else frame = requestAnimationFrame(tick);
    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [profit]);
  return displayed;
}

export function ProfitSplitCalculator() {
  const [profit, setProfit] = useState(10000);
  const displayed = useAnimatedProfit(profit);
  return (
    <div className="profit-calculator" role="group" aria-labelledby="profit-calculator-title">
      <h3 id="profit-calculator-title">Profit split calculator</h3>
      <p className="profit-calculator-intro">Move the slider to see how profit would be shared under each indicative tier.</p>
      <p id="profit-slider-label" className="profit-input-label">Profit subject to sharing</p>
      <div className="profit-input-value">{format(profit)} <span>USDT</span></div>
      <Slider className="allocation-slider profit-slider" min={1000} max={100000} step={1000} value={[profit]} onValueChange={(values) => setProfit(values[0] ?? 10000)} aria-label="Profit subject to sharing in USDT" />
      <div className="profit-slider-scale" aria-hidden="true"><span>1,000</span><span>50,000</span><span>100,000</span></div>
      {tiers.map((tier, index) => (
        <section key={tier.title} className={`profit-tier${index === 1 ? " profit-tier-higher" : ""}`} aria-labelledby={`profit-tier-${index}`}>
          <h4 id={`profit-tier-${index}`}>{tier.title}<span>{tier.terms}</span></h4>
          <div className="profit-split-bar" aria-hidden="true">
            <span className="profit-split-investor" style={{ width: `${tier.investor}%` }}>{tier.investor}%</span>
            <span className="profit-split-revat" style={{ width: `${tier.revat}%` }}>{tier.revat}%</span>
          </div>
          <div className="profit-split-amounts">
            <p>You receive<br /><strong>{format(displayed * tier.investor / 100)}</strong> USDT</p>
            <p>Revat receives<br /><strong>{format(displayed * tier.revat / 100)}</strong> USDT</p>
          </div>
        </section>
      ))}
      <p className="profit-tier-gain" role="status" aria-live="polite" aria-atomic="true">At the higher tier, you would receive {format(profit * 0.15)} USDT more on the same profit.</p>
      <p className="profit-calculator-note">Illustration of fee arithmetic only, not expected returns. Other applicable costs are not shown. The 1 million USDT threshold applies to your own allocation, not Revat&apos;s total assets. Terms are indicative and agreed individually. Capital is at risk.</p>
    </div>
  );
}
