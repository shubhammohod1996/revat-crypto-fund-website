import { IconCompass, IconShieldCheck, IconWallet, IconChartBar } from "@tabler/icons-react";

const features = [
  { title: "Discover", description: "Exceptional crypto traders, sourced from a wider pool of talent. Find the people you believe in.", icon: IconCompass },
  { title: "Verify", description: "Trade logs, a read-only API link, or a 2-month demo assessment. Talent, backed by evidence.", icon: IconShieldCheck },
  { title: "Allocate", description: "Choose at least 10 approved traders. Allocate at least 1,000 USDT to each, and scale at your pace.", icon: IconWallet },
  { title: "Monitor", description: "Follow your traders through live dashboards and leaderboards. Stay informed, every step of the way.", icon: IconChartBar },
];

/** Reference feature layout, intentionally static with no hover effects. */
export function FeaturesSectionWithHoverEffects() {
  return (
    <ol className="process-features">
      {features.map(({ title, description, icon: Icon }) => (
        <li key={title} className="process-feature">
          <Icon className="process-feature-icon" size={30} stroke={1.5} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
        </li>
      ))}
    </ol>
  );
}
