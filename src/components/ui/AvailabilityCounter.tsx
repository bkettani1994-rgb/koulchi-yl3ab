"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_UNITS = 6;

function computeRemaining() {
  const hour = new Date().getHours();
  // Availability naturally tightens as the day progresses.
  const reserved = Math.min(TOTAL_UNITS - 1, Math.floor(hour / 4));
  return Math.max(1, TOTAL_UNITS - reserved);
}

export function AvailabilityCounter({ className }: { className?: string }) {
  const [remaining, setRemaining] = useState(3);

  useEffect(() => {
    setRemaining(computeRemaining());
  }, []);

  return (
    <div
      className={cn(
        "glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-white",
        className,
      )}
      role="status"
    >
      <Flame className="size-4 text-secondary-light" aria-hidden />
      <span>
        Plus que <span className="font-semibold text-secondary-light">{remaining}</span> PS5
        disponibles aujourd&apos;hui
      </span>
    </div>
  );
}
