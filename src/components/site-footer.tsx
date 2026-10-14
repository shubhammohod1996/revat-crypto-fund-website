import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/revat-logo.asset.json";

export function SiteFooter() {
  return (
    <footer id="contact"><div className="site-wrap"><div className="mb-7 flex flex-wrap items-center justify-between gap-5"><a href="/" aria-label="Revat home"><img className="brand-logo" src={logo.url} alt="Revat Crypto Fund" /></a><span className="text-sm text-muted-foreground">A new direction for trading talent.</span></div><p className="footer-risk">Crypto trading involves substantial risk, including loss of capital. Risk controls and diversification can’t guarantee profits or prevent all losses. Trading-only API access limits withdrawals but doesn’t remove trading, exchange, or security risk.</p><div className="mt-7 flex justify-between border-t border-border pt-5 text-sm text-muted-foreground"><span>© 2026 Revat. All rights reserved.</span><a href="/#traders" className="flex items-center gap-1 hover:text-gold">Discover Revat <ArrowUpRight className="size-3" /></a></div></div></footer>
  );
}
