import Image from "next/image";
import { Gamepad2, Wifi } from "lucide-react";

const BANNER_SRC =
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1784752581/Gemini_Generated_Image_qogombqogombqogo_xqpcfk.png";

export function HeroBanner() {
  return (
    <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
      {/* Ambient glow behind the banner */}
      <div className="glow-orb animate-glow-pulse absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 bg-primary/30" />
      <div className="glow-orb absolute right-4 top-6 h-40 w-40 bg-secondary/25" />

      <div className="animate-float relative w-full overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 shadow-[0_40px_100px_-20px_rgba(0,111,205,0.55)] backdrop-blur-2xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
          <Image
            src={BANNER_SRC}
            alt="PlayStation 5 et manette DualSense — location à domicile"
            fill
            priority
            sizes="(min-width: 1024px) 32rem, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Floating availability badge */}
      <div className="glass-strong absolute -right-1 top-2 flex items-center gap-2 rounded-full px-4 py-2 sm:right-4 sm:top-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-light opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-light" />
        </span>
        <span className="text-xs font-medium text-white">Disponible aujourd&apos;hui</span>
      </div>

      {/* Floating controller chip */}
      <div className="glass-strong absolute -left-2 bottom-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-2 sm:bottom-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-light">
          <Gamepad2 className="size-4 text-white" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">4 Manettes</p>
          <p className="flex items-center gap-1 text-[11px] text-foreground-subtle">
            <Wifi className="size-3" aria-hidden />
            DualSense sans fil
          </p>
        </div>
      </div>
    </div>
  );
}
