import React from "react";

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-8 py-4 border-b bg-card flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Traveloop</h1>
        <a href="/register" className="text-sm font-medium text-primary hover:underline">Create your own trip</a>
      </header>
      <main className="p-4 md:p-8 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}
