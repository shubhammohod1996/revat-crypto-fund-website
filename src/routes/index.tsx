import { SiteCta } from "@/components/site-cta";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TraderApplicationDialog } from "@/components/trader-application-dialog";
import OrbitalSphereBackground from "@/components/ui/orbital-sphere";
import { SiteFooter } from "@/components/site-footer";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import accountsArt from "@/assets/Your-accounts.jpeg";
import riskControlsArt from "@/assets/Risk-controls-built-in.jpeg";
import visibilityArt from "@/assets/Full-visibility.jpeg";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Revat — Back the trading talent you believe in" },
    { name: "description", content: "Choose verified crypto traders. Build your Revat portfolio from your own Binance or Bybit accounts, with built-in risk controls." },
    { property: "og:title", content: "Revat — Back the trading talent you believe in" },
    { property: "og:description", content: "Trading talent is everywhere. Opportunity should be too. Discover Revat’s approach to verified crypto trading." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});


function Index() {
  const [traderOpen, setTraderOpen] = useState(false);
  const [allocation, setAllocation] = useState(1000);
  const openTrader = () => setTraderOpen(true);

  return <>
    <SiteHeader onApplyTrader={openTrader} />

    <main>
      <section className="orbital-hero-scene" aria-label="Welcome to Revat">
        <div className="hero-content site-wrap reveal orbital-hero-layout">
          <div className="orbital-hero-copy">
          
          <h1 className="hero-title">Trading talent is everywhere.<br /><span className="gold-line">Opportunity should be too.</span></h1>
          <p className="hero-description">Back verified crypto traders you choose, from your own<br className="hidden sm:block" /> exchange accounts, with built-in risk controls.</p>
          <div className="hero-actions pointer-events-auto">
            <Button variant="gold" size="hero" asChild><a href="#portfolio">Explore Investing <ArrowRight /></a></Button>
            <Button variant="premium" size="hero" onClick={openTrader}>Apply as a Trader <ArrowRight /></Button>
          </div>
          </div>
          <OrbitalSphereBackground className="hero-orbital" />
        </div>
      </section>

      <section id="traders" className="section site-wrap">
        <div className="flex items-end justify-between gap-8">
          <div><h2 className="section-title">From talent to opportunity.</h2><p className="section-description">A clear path from trader discovery to your allocation.</p></div>
          <span className="hidden pb-2 text-xs text-muted-foreground sm:block">Four steps. One shared ambition.</span>
        </div>
        <FeaturesSectionWithHoverEffects />
      </section>

      <section id="portfolio" className="portfolio-band section">
        <div className="site-wrap portfolio-layout">
          <div>
            
            <h2 className="section-title">Your portfolio.<br />Your choice of talent.</h2>
            <p className="section-description">Not one strategy. Not one trader. Build a diversified portfolio of verified talent, one allocation at a time.</p>
            <ul className="check-list"><li><Check /> Choose at least 10 approved crypto traders</li><li><Check /> Start with 1,000 USDT per trader</li><li><Check /> Keep capital in your Binance or Bybit subaccounts</li></ul>
            <p className="mt-7 flex items-center gap-2 text-base text-gold">A portfolio that stays in your hands <ArrowUpRight className="size-3" /></p>
          </div>
          <div className="portfolio-tool" aria-label="Illustrative portfolio allocation calculator">
            <h3 className="text-lg font-medium">Allocation per trader</h3>
            <p className="mt-4 text-3xl font-medium text-gold" aria-live="polite">{allocation.toLocaleString('en-US')} <span className="text-base">USDT</span></p>
            <Slider className="allocation-slider mt-8" min={1000} max={10000} step={1000} value={[allocation]} onValueChange={values => setAllocation(values[0] ?? 1000)} aria-label="Allocation per trader" />
            <div className="mt-4 flex justify-between gap-4 text-sm text-muted-foreground"><span>Min · 1,000 USDT</span><span className="text-right">Max · 10,000 USDT</span></div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-border pt-6"><div><p className="text-sm text-muted-foreground">Approved traders</p><p className="mt-2 text-2xl font-medium">10 <span className="text-sm text-muted-foreground">minimum</span></p></div><div className="text-right"><p className="text-sm text-muted-foreground">Total allocation</p><p className="mt-2 text-2xl font-medium text-gold" aria-live="polite">{(10 * allocation).toLocaleString('en-US')} <span className="text-sm">USDT</span></p></div></div>
            <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">Allocation illustration only, not an investment commitment. The maximum shown is a preview limit, not an investment cap.</p>
          </div>
        </div>
      </section>

      <section id="why" className="section site-wrap discipline-section" aria-labelledby="discipline-title">
        <h2 id="discipline-title" className="discipline-title">Built around talent. <span>Grounded in discipline.</span></h2>
        <div className="discipline-grid">
          <article className="discipline-item">
            <span className="discipline-figure">FIG 0.1</span>
            <img className="discipline-art" src={accountsArt} alt="" width={1600} height={800} loading="lazy" decoding="async" />
            <h3>Your accounts, your choice</h3>
            <p>Capital stays in your own Binance or Bybit subaccounts. Revat gets trading-only API access, with withdrawals disabled.</p>
          </article>
          <article className="discipline-item">
            <span className="discipline-figure">FIG 0.2</span>
            <img className="discipline-art discipline-art-compact" src={riskControlsArt} alt="" width={1536} height={1024} loading="lazy" decoding="async" />
            <h3>Risk controls built in</h3>
            <p>Our risk management system (RMS) is designed to step in before a trader’s subaccount loses 10% of its equity. It is a target, not a guarantee.</p>
          </article>
          <article className="discipline-item">
            <span className="discipline-figure">FIG 0.3</span>
            <img className="discipline-art discipline-art-compact" src={visibilityArt} alt="" width={1536} height={1024} loading="lazy" decoding="async" />
            <h3>Full visibility.</h3>
            <p>Investors see rankings and performance. Traders see their own positions and rank.</p>
          </article>
        </div>
      </section>

      <section className="proof-band"><div className="site-wrap proof-inner"><div className="flex items-center gap-4"><CircleCheck className="size-8 shrink-0 text-green-light" /><h2 className="text-lg font-medium">Built and tested.<br /><span className="text-muted-foreground">Ready to grow.</span></h2></div><p className="section-description">We’ve built and tested a working version of this model. Next, we’re opening it to more investors and traders. Proof-of-concept results don’t predict future performance or results at scale.</p></div></section>


      <SiteCta onApplyTrader={openTrader} investingHref="#portfolio" />
    </main>
    <SiteFooter />

    <TraderApplicationDialog open={traderOpen} onOpenChange={setTraderOpen} />
  </>;
}
