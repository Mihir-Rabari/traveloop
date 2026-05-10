import React from "react";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Logo or Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Traveloop</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Plan your perfect trip with ease
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
