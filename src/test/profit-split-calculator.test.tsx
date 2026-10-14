import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProfitSplitCalculator } from "@/components/ui/profit-split-calculator";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("Profit split calculator", () => {
  it("preserves both supplied tiers and updates their amounts at the slider bounds", () => {
    vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    vi.spyOn(window, "matchMedia").mockReturnValue({ ...media, matches: true });
    render(<ProfitSplitCalculator />);
    const standard = within(screen.getByRole("region", { name: /Standard terms/ }));
    const higher = within(screen.getByRole("region", { name: /Allocation above 1 million/ }));
    expect(standard.getByText("6,000")).toBeInTheDocument();
    expect(standard.getByText("4,000")).toBeInTheDocument();
    expect(higher.getByText("7,500")).toBeInTheDocument();
    expect(higher.getByText("2,500")).toBeInTheDocument();
    const slider = screen.getByRole("slider", { name: "Profit subject to sharing in USDT" });
    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100000");
    expect(standard.getByText("60,000")).toBeInTheDocument();
    expect(standard.getByText("40,000")).toBeInTheDocument();
    expect(higher.getByText("75,000")).toBeInTheDocument();
    expect(higher.getByText("25,000")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("15,000 USDT more");
    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "1000");
    expect(standard.getByText("600")).toBeInTheDocument();
    expect(standard.getByText("400")).toBeInTheDocument();
    expect(higher.getByText("750")).toBeInTheDocument();
    expect(higher.getByText("250")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("150 USDT more");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "2000");
  });
});
