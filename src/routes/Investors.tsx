import { SiteCta } from "@/components/site-cta";
import { SiteFooter } from "@/components/site-footer";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LockKeyhole, KeyRound, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { TraderApplicationDialog } from "@/components/trader-application-dialog";
import { BloomField } from "@/components/ui/bloom-field";
import { InvestorRiskSection } from "@/components/investor-risk-section";
import { InvestorTimeline } from "@/components/ui/investor-timeline";

export const Route = createFileRoute("/Investors")({
  head: () => ({ meta: [
    { title: "Investors — Revat" },
    { name: "description", content: "Build your Revat portfolio with verified crypto traders, your own exchange accounts, and built-in risk controls." },
    { property: "og:title", content: "Investors — Revat" },
    { property: "og:description", content: "Your portfolio. Your choice of trading talent." },
  ] }),
  component: Investors,
});

const principles = [
  { title: "Your capital stays with you.", icon: LockKeyhole, text: "It remains in your own exchange subaccounts, not in a Revat-controlled trading wallet." },
  { title: "Trading access only.", icon: KeyRound, text: "Revat’s API access has withdrawals disabled, so Revat can trade and apply risk controls without withdrawal authority through those keys." },
  { title: "Risks remain.", icon: ShieldAlert, text: "The exchange holds the assets, so exchange, custody and security risks still apply. Trading access can still expose capital to losses." },
];

function Investors() {
  const [traderOpen, setTraderOpen] = useState(false);
  return <>
    <SiteHeader onApplyTrader={() => setTraderOpen(true)} />
    <main>
      <BloomField className="investors-hero">
        <div className="site-wrap investors-hero-content">
          <p className="investors-eyebrow">Revat / Investors</p>
          <h1>Choose your traders.<br /><span>Put your capital to work.</span></h1>
          <p className="investors-intro">Back approved crypto traders through your own exchange subaccounts. Follow their performance and scale up as your confidence grows, all within Revat’s risk framework.</p>
          <div className="investors-actions">
            {/* <Button variant="gold" size="hero" asChild><a href="/#portfolio">Explore portfolio allocation <ArrowRight /></a></Button> */}
            {/* <Button variant="premium" size="hero" asChild><a href="#investor-principles">How it works <ArrowRight /></a></Button> */}
          </div>
          {/* <ul className="investors-facts" aria-label="Portfolio starting requirements">
            <li><strong>10+</strong><span>approved traders</span></li>
            <li><strong>1,000 USDT</strong><span>minimum per trader</span></li>
            <li><strong>10,000 USDT</strong><span>minimum total</span></li>
          </ul> */}
        </div>
      </BloomField>
      <InvestorTimeline />
      <section id="investor-principles" className="section investor-principles-band" aria-labelledby="investor-principles-title">
        <div className="site-wrap">
        <h2 id="investor-principles-title" className="section-title">Your accounts, your control</h2>
        <div className="investor-principles-grid">
          {principles.map(({ title, icon: Icon, text }) => <article key={title}>
            <Icon aria-hidden="true" className="text-gold" size={28} strokeWidth={1.5} />
            <h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
        {/* <p className="investors-preview-note">Portfolio allocation is illustrative. Live investing is not connected in this preview.</p> */}
        </div>
      </section>
      <InvestorRiskSection />
      <SiteCta onApplyTrader={() => setTraderOpen(true)} />
    </main>
    <SiteFooter />
    <TraderApplicationDialog open={traderOpen} onOpenChange={setTraderOpen} />
  </>;
}
