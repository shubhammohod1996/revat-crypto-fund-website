import { cn } from "@/lib/utils";

interface GradientCardProps {
  title: string;
  description: string;
  imageUrl: string;
  number: number;
  tone: "forest" | "gold";
}

export function GradientCard({ title, description, imageUrl, number, tone }: GradientCardProps) {
  return (
    <li className={cn("revat-step-card", `revat-step-card--${tone}`)}>
      <div className="revat-step-copy">
        <span className="revat-step-number" aria-hidden="true">0{number}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="revat-step-art" aria-hidden="true">
        <img src={imageUrl} alt="" loading="lazy" width={816} height={816} />
      </div>
    </li>
  );
}