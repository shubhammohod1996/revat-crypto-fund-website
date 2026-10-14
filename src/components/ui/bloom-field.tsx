import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Static Bloom Field mesh using the supplied muavin radial-gradient parameters. */
export function BloomField({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("bloom-field", className)}>{children}</section>;
}
