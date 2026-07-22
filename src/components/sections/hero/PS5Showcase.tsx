"use client";

import { motion } from "framer-motion";
import { Gamepad2, Wifi, Zap } from "lucide-react";

export function PS5Showcase() {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-lg items-center justify-center sm:h-[500px] lg:h-[560px]">
      {/* Ambient glow orbs */}
      <div className="glow-orb animate-glow-pulse absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 bg-primary/30" />
      <div className="glow-orb absolute right-4 top-6 h-40 w-40 bg-secondary/25" />

      {/* Floating console panel */}
      <motion.div
        className="animate-float relative flex aspect-[4/5] w-64 flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[0_40px_100px_-20px_rgba(0,111,205,0.55)] backdrop-blur-2xl sm:w-72 lg:w-80"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
            <Gamepad2 className="size-5 text-primary-light" aria-hidden />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-foreground-muted">
            <Wifi className="size-3" aria-hidden />
            Connectée
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-6">
          {/* Abstract console silhouette */}
          <div className="relative h-44 w-24 rounded-[1.75rem] bg-gradient-to-b from-white via-white/90 to-white/70 shadow-[0_0_60px_10px_rgba(0,168,255,0.35)] sm:h-52 sm:w-28">
            <div className="absolute inset-x-0 top-1/2 h-16 -translate-y-1/2 bg-gradient-to-b from-primary/25 via-primary-light/40 to-transparent" />
            <div className="absolute inset-x-3 top-4 h-1.5 rounded-full bg-black/10" />
            <div className="absolute inset-x-3 bottom-4 h-1.5 rounded-full bg-black/10" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-foreground-subtle">Performance</p>
            <p className="text-sm font-semibold text-white">4K · 120fps</p>
          </div>
          <Zap className="size-4 text-primary-light" aria-hidden />
        </div>
      </motion.div>

      {/* Floating controller chip */}
      <motion.div
        className="glass-strong absolute -left-2 bottom-8 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-2 sm:bottom-14"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-light">
          <Gamepad2 className="size-4 text-white" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">4 Manettes</p>
          <p className="text-[11px] text-foreground-subtle">DualSense sans fil</p>
        </div>
      </motion.div>

      {/* Floating availability badge */}
      <motion.div
        className="glass-strong absolute -right-1 top-2 flex items-center gap-2 rounded-full px-4 py-2 sm:right-4 sm:top-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-light opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-light" />
        </span>
        <span className="text-xs font-medium text-white">Disponible aujourd&apos;hui</span>
      </motion.div>
    </div>
  );
}
