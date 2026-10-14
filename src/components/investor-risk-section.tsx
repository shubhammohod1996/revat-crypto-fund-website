import { ProfitSplitCalculator } from "@/components/ui/profit-split-calculator";

export function InvestorRiskSection() {
  return (
    <section id="risk-management" className="investor-risk-section section site-wrap" aria-labelledby="risk-management-title">
      <div className="investor-risk-heading">
        <h2 id="risk-management-title">Risk management</h2>
        <p>Our risk management system (RMS) is designed to step in before losses reach 10% of an individual trading subaccount’s equity. This is a risk-control target, not a guaranteed maximum loss or a portfolio-wide limit. Fast markets, slippage, liquidity limits, liquidation, or exchange or API disruption can cause losses beyond it.</p>
      </div>
      <div className="investor-profit-layout">
        <div className="investor-profit-terms">
          <h3>Scale your capital.<br /><span>Keep more of your profits.</span></h3>
          <div className="profit-terms-table-wrap">
            <table className="profit-terms-table">
              <caption className="sr-only">Indicative profit-sharing terms by your allocation</caption>
              <thead><tr><th scope="col">Your allocation</th><th scope="col">You keep</th><th scope="col">Revat’s share</th></tr></thead>
              <tbody>
                <tr><th scope="row">Standard terms</th><td>60% of profits</td><td>40%</td></tr>
                <tr><th scope="row">Above 1 million USDT</th><td>About 75% of profits</td><td>About 25%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="profit-terms-note">Terms are indicative and agreed individually. The higher tier applies to your own allocation above 1 million USDT.</p>
        </div>
        <ProfitSplitCalculator />
      </div>
    </section>
  );
}
