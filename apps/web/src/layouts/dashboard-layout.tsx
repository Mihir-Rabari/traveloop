"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plane, LayoutDashboard, Search, User, Settings, LogOut, Wallet } from "lucide-react";
// import Link from "next/link"; // We will add Links later when routes are setup

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Trips", href: "/trips", icon: Plane },
    { name: "Explore", href: "/explore", icon: Search },
    { name: "Budget", href: "/budget", icon: Wallet },
  ];

  const secondaryNavigation = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <h1 className="text-xl font-bold">Traveloop</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -mr-2 rounded-md hover:bg-muted"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(sidebarOpen || (typeof window !== "undefined" && window.innerWidth >= 768)) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`
              fixed inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col
              md:relative md:translate-x-0
              ${!sidebarOpen ? 'hidden md:flex' : 'flex'}
            `}
          >
            <div className="p-6 hidden md:block">
              <h1 className="text-2xl font-bold tracking-tight">Traveloop</h1>
            </div>

            <nav className="flex-1 px-4 py-6 md:py-0 space-y-1 overflow-y-auto">
              <div className="space-y-1 mb-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon size={18} />
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="space-y-1">
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Account
                </h3>
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon size={18} />
                    {item.name}
                  </a>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut size={18} />
                  Log out
                </button>
              </div>
            </nav>
            
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[-1] md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header/Command Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="flex-1 flex">
            {/* Command Menu Placeholder */}
            <div className="w-full max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search everywhere... (Press ⌘K)" 
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border-transparent rounded-lg text-sm focus:border-ring focus:ring-ring focus:outline-none transition-all"
              />
            </div>
          </div>
          <div className="ml-4 flex items-center gap-4">
            {/* User Avatar Placeholder */}
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-8"
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      {/* Mobile Bottom Nav (Optional, based on requirements, but sidebar covers it mostly) */}
    </div>
  );
}
