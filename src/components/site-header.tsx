import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
const logoSrc = "/Revat-Logo-new.svg";

const navItems = [
  { href: "/Investors", id: "investors", label: "Investors" },
  { href: "/#traders", id: "traders", label: "Traders" },
  { href: "/#blogs", id: "blogs", label: "Blogs" },
  { href: "/#contact", id: "contact", label: "Contact Us" },
] as const;

type SiteHeaderProps = {
  onApplyTrader: () => void;
};

export function SiteHeader({ onApplyTrader }: SiteHeaderProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isInvestors = pathname === "/Investors";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActive(isInvestors ? "investors" : "");
    if (isInvestors) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: [0, 0.2, 0.45, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isInvestors]);

  const apply = () => {
    setOpen(false);
    onApplyTrader();
  };

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="site-wrap site-header-inner">
        <a href="/" className="brand-link" aria-label="Revat home">
          <img src={logoSrc} alt="Revat Crypto Fund" className="brand-logo" />
        </a>

        <nav className="nav-pill" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={pathname === "/" && item.id !== "investors" ? `#${item.id}` : item.href}
              aria-current={active === item.id ? (item.id === "investors" ? "page" : "location") : undefined}
              className={cn("nav-pill-link", active === item.id && "is-active")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Button variant="gold" className="header-cta hidden sm:inline-flex" onClick={apply}>
            Apply as a Trader
            <ArrowUpRight />
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="header-menu"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-background">
              <SheetHeader>
                <SheetTitle className="font-display">Revat</SheetTitle>
                <SheetDescription>Choose a destination, or apply as a trader.</SheetDescription>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={pathname === "/" && item.id !== "investors" ? `#${item.id}` : item.href}
                    aria-current={active === item.id ? (item.id === "investors" ? "page" : "location") : undefined}
                    className={cn("mobile-nav-link", active === item.id && "is-active")}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <Button variant="gold" className="header-cta mt-8 w-full" onClick={apply}>
                Apply as a Trader
                <ArrowUpRight />
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
