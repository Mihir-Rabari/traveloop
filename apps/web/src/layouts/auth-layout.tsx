"use client";

import React from "react";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Warm background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Content Card - Screen 1 Style */}
        <div className="bg-card/40 backdrop-blur-xl border-4 border-primary/20 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(51,48,44,0.1)] p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -mr-8 -mt-8" />
          
          {children}
        </div>
      </motion.div>
    </div>
  );
}
