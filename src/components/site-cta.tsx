import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type SiteCtaProps = {
  onApplyTrader: () => void;
  investingHref?: string;
};

export function SiteCta({ onApplyTrader, investingHref = "/#portfolio" }: SiteCtaProps) {
  return (
    <section id="start" className="final-section"><div className="site-wrap"><h2>Choose the talent<br />you <span className="text-gold">believe in.</span></h2><p className="section-description">Build your Revat portfolio.</p><div className="facts"><span>10+ traders</span><span className="text-gold">/</span><span>1,000 USDT per trader</span><span className="text-gold">/</span><span>10,000 USDT minimum total</span></div><div className="hero-actions"><Button variant="gold" size="hero" asChild><a href={investingHref}>Explore Investing <ArrowRight /></a></Button><Button variant="premium" size="hero" onClick={onApplyTrader}>Apply as a Trader <ArrowRight /></Button></div></div></section>
  );
}
