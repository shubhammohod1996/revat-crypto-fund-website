const steps = [
  {
    title: "Explore the talent",
    description: "Use the leaderboard to review approved traders. Rankings are a starting point, not a promise of future returns.",
  },
  {
    title: "Build your portfolio",
    description: "Choose at least 10 traders and put at least 1,000 USDT behind each, so at least 10,000 USDT in total. Spreading capital reduces reliance on any one trader, though strategies can still lose together.",
  },
  {
    title: "Connect your subaccounts",
    description: "Provide trading-only API keys for 10 Binance or Bybit subaccounts, with withdrawals disabled. Revat uses them to place your trades and apply its risk controls. Availability depends on exchange requirements.",
  },
  {
    title: "Follow and scale",
    description: "Track traders on your investor dashboard and the leaderboard. Increase allocations as your confidence grows, subject to agreed terms.",
  },
];

export function InvestorTimeline() {
  return (
    <section id="investor-steps" className="investor-timeline-section" aria-labelledby="investor-timeline-heading">
      <div className="site-wrap">
        <h2 id="investor-timeline-heading" className="investor-timeline-heading">
          Your capital takes part in the trading results of the traders you select.{" "}
          <span>When trading produces profits, they are shared under your agreed terms. Results depend on trader performance and market conditions, and losses are possible.</span>
        </h2>
        <ol className="investor-timeline">
          {steps.map(({ title, description }, index) => (
            <li key={title} className="investor-timeline-step">
              <span className="investor-timeline-number">Step {String(index + 1).padStart(2, "0")}</span>
              <span className="investor-timeline-marker" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
