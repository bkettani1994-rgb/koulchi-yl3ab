import { Button } from "@/components/ui/Button";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur-xl lg:hidden">
      <Button href="#reservation" variant="primary" size="lg" className="w-full">
        Réserver maintenant
      </Button>
    </div>
  );
}
