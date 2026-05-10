"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Plane, LayoutDashboard, Search, User, Settings, 
  LogOut, Wallet, MapPin, ChevronLeft, Bell, Globe, Sparkles,
  Briefcase, Heart, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/api/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const { user, logout, useMeQuery, isAuthenticated } = useAuth();
  const { error, isLoading } = useMeQuery();
  const router = useRouter();
  const pathname = usePathname();

  // Handle store hydration
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated && (!isAuthenticated || error)) {
      router.push("/login");
    }
  }, [hasHydrated, isAuthenticated, error, router]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Trips", href: "/trips", icon: Plane },
    { name: "Explore", href: "/explore", icon: Globe },
    { name: "Budget", href: "/budget", icon: Wallet },
  ];

  const travelTools = [
    { name: "Packing List", href: "/packing", icon: Briefcase },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Notes", href: "/notes", icon: MessageSquare },
  ];

  const userMenu = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="h-screen bg-[#FDFCF7] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Mobile Header (Top) */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-xl shrink-0 z-[60]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="text-primary-foreground h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">traveloop</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl bg-primary/5 text-primary"
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Drawer (Sidebar) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[80] w-[280px] bg-white flex flex-col md:hidden rounded-r-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin className="text-primary-foreground h-5 w-5" />
                  </div>
                  <span className="text-xl font-black tracking-tighter">traveloop</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navigation.map((item) => (
                  <SidebarLink key={item.name} item={item} isActive={isActive(item.href)} onClick={() => { router.push(item.href); setSidebarOpen(false); }} />
                ))}
                <div className="h-px bg-primary/5 my-4" />
                {travelTools.map((item) => (
                  <SidebarLink key={item.name} item={item} isActive={isActive(item.href)} onClick={() => { router.push(item.href); setSidebarOpen(false); }} />
                ))}
              </nav>
              <div className="p-4 border-t">
                <Button variant="ghost" onClick={logout} className="w-full justify-start gap-4 text-destructive hover:bg-destructive/5 font-bold">
                  <LogOut size={20} />
                  Sign Out
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Left) */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r-2 border-primary/5 bg-white/40 backdrop-blur-2xl transition-all duration-500 relative rounded-r-[3rem] z-50 shadow-2xl shrink-0",
          isCollapsed ? "w-20" : "w-[280px]"
        )}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-5 top-10 w-10 h-10 bg-white rounded-full border-2 border-[#FDFCF7] shadow-xl flex items-center justify-center text-primary hover:scale-110 transition-transform z-[60]"
        >
          <ChevronLeft className={cn("transition-transform duration-500", isCollapsed && "rotate-180")} size={18} />
        </button>

        <div className={cn("p-8 transition-all", isCollapsed ? "px-4" : "px-8")}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push("/")}>
            <div className="min-w-[40px] h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <MapPin className="text-primary-foreground h-6 w-6" />
            </div>
            {!isCollapsed && (
              <span className="text-2xl font-black tracking-tighter text-foreground">traveloop</span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-8 overflow-y-auto custom-scrollbar pt-4">
          <div className="space-y-1.5">
            {!isCollapsed && <p className="px-4 text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] mb-3">Discovery</p>}
            {navigation.map((item) => (
              <SidebarLink key={item.name} item={item} isActive={isActive(item.href)} isCollapsed={isCollapsed} onClick={() => router.push(item.href)} />
            ))}
          </div>

          <div className="space-y-1.5">
            {!isCollapsed && <p className="px-4 text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] mb-3">Planning</p>}
            {travelTools.map((item) => (
              <SidebarLink key={item.name} item={item} isActive={isActive(item.href)} isCollapsed={isCollapsed} onClick={() => router.push(item.href)} />
            ))}
          </div>
        </nav>

        <div className={cn("p-6 transition-all", isCollapsed ? "p-3" : "p-6")}>
          <div className={cn(
            "bg-white/60 backdrop-blur-md rounded-[2rem] border-2 border-primary/5 flex items-center shadow-lg transition-all overflow-hidden",
            isCollapsed ? "justify-center p-2" : "gap-3 p-4"
          )}>
            <div className="h-10 w-10 rounded-full border border-primary/20 overflow-hidden shrink-0">
              <img src={user?.avatar || "/avatar.png"} alt="P" className="w-full h-full object-cover" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-black truncate">{user?.name || "Explorer"}</p>
                <p className="text-[9px] font-black text-primary uppercase tracking-widest">Pro Member</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area (Right) */}
      <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Top Header (Desktop) */}
        <header className="hidden md:flex items-center justify-between px-10 py-6 bg-transparent shrink-0">
          <div className="flex-1 flex">
            <div className="w-full max-w-lg relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
              <input 
                type="text" 
                placeholder="Search your next adventure..." 
                className="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-xl border-2 border-transparent rounded-[2rem] text-sm font-bold focus:bg-white focus:border-primary/20 focus:outline-none transition-all shadow-xl shadow-black/5"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="ml-6 flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 bg-white/60 backdrop-blur-md relative shadow-lg hover:scale-105 transition-transform">
              <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="h-8 w-[1px] bg-primary/10 mx-1" />
            <Button 
              className="rounded-2xl h-12 px-6 font-black text-sm shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => router.push("/trips/create")}
            >
              <Sparkles size={16} />
              New Trip
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12 custom-scrollbar">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ 
  item, 
  isActive, 
  isCollapsed = false, 
  onClick 
}: { 
  item: any; 
  isActive: boolean; 
  isCollapsed?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-4 rounded-[1.75rem] transition-all duration-300 group relative",
        isActive 
          ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30" 
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
      )}
    >
      <item.icon size={isCollapsed ? 28 : 22} className={cn("transition-transform group-hover:scale-110", isActive && "scale-110")} />
      {!isCollapsed && <span className="font-bold text-lg">{item.name}</span>}
      {isActive && !isCollapsed && (
        <motion.div layoutId="active" className="absolute right-4 w-2 h-2 bg-primary-foreground rounded-full" />
      )}
    </button>
  );
}

