import { useState } from "react";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const methods = [
  { name: "Trade logs", detail: "Qualify through your trading history. Your trade logs provide evidence of your approach, consistency, and risk management." },
  { name: "Read-only API", detail: "Qualify through a read-only exchange API link, allowing your trading record to be reviewed without trading or withdrawal access." },
  { name: "Demo assessment", detail: "Demonstrate your trading approach through a 2-month demo assessment before being considered for investor allocations." },
];

export function TraderApplicationDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [method, setMethod] = useState(0);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="w-[calc(100%-32px)] border-border bg-card p-7 sm:p-9">
      <DialogTitle className="font-display text-2xl font-medium leading-tight">Your talent deserves opportunity.</DialogTitle><DialogDescription className="text-base leading-relaxed">Revat traders qualify through one of three verification paths. Explore the path that fits your trading experience.</DialogDescription>
      <div className="mt-2 flex gap-2" role="tablist" aria-label="Verification paths">{methods.map((item,i) => <Button key={item.name} variant={method === i ? 'gold' : 'premium'} className="flex-1 px-2 text-xs" role="tab" id={`method-tab-${i}`} aria-selected={method === i} aria-controls="method-panel" onClick={() => setMethod(i)}>{item.name}</Button>)}</div>
      <div id="method-panel" role="tabpanel" aria-labelledby={`method-tab-${method}`} className="border-y border-border py-6"><ShieldCheck className="mb-4 size-6 text-gold" /><h3 className="mb-2 text-base">{methods[method]?.name}</h3><p className="text-base leading-relaxed text-muted-foreground">{methods[method]?.detail}</p></div>
      <p className="text-sm leading-relaxed text-muted-foreground">Application submission is not connected in this preview.</p>
      <Button variant="premium" onClick={() => onOpenChange(false)}>Back to Revat <ChevronRight /></Button>
    </DialogContent></Dialog>
  );
}
