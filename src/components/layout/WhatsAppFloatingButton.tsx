"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/constants";

export function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-5 z-40 flex size-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_16px_40px_-8px_rgba(0,111,205,0.7)] lg:bottom-8"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary-light/40" />
      <MessageCircle className="size-6" aria-hidden />
    </motion.a>
  );
}
