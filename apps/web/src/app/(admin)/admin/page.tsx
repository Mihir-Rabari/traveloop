"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Plane, Activity, TrendingUp, Map, Star, 
  Search, Filter, ChevronRight, MoreHorizontal,
  BarChart3, PieChart as PieChartIcon, LayoutDashboard, Settings
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAdmin } from "@/api/hooks/use-admin";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"Users" | "Cities" | "Activities" | "Trends">("Users");
  
  const { useStatsQuery, useUsersQuery, useTripsQuery } = useAdmin();
  
  const { data: statsResponse, isLoading: statsLoading } = useStatsQuery();
  const { data: usersResponse, isLoading: usersLoading } = useUsersQuery();
  const { data: tripsResponse, isLoading: tripsLoading } = useTripsQuery();

  const stats = (statsResponse as any)?.data || {};
  const recentUsers = (usersResponse as any)?.data || [];
  const recentTrips = (tripsResponse as any)?.data || [];

  if (statsLoading || usersLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary">Synchronizing Platform Pulse...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <LayoutDashboard className="h-8 w-8" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Control Center</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">Admin Panel</h1>
          <p className="text-lg text-muted-foreground font-medium">Monitor growth and manage the Traveloop community.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search data..." 
              className="pl-12 h-14 w-64 rounded-full border-2 border-primary/10 bg-background/50 font-bold focus:border-primary/20" 
            />
          </div>
          <Button variant="outline" className="rounded-full h-14 w-14 p-0 border-2 border-primary/10">
            <Settings size={24} />
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <div className="flex items-center gap-4 px-4 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: "Users", label: "Manage Users", icon: Users },
          { id: "Cities", label: "Popular Cities", icon: Map },
          { id: "Activities", label: "Popular Activities", icon: Star },
          { id: "Trends", label: "User Trends & Analytics", icon: TrendingUp }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id as any)}
            className={`rounded-full px-8 h-14 font-black transition-all gap-3 ${
              activeTab === tab.id 
              ? "bg-primary text-primary-foreground shadow-2xl" 
              : "border-2 border-primary/10 hover:bg-primary/5"
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
        {/* Main Analytics Content */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="rounded-[3rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl p-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <BarChart3 size={200} className="text-primary" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black tracking-tight">{activeTab} Overview</h3>
                <Button variant="ghost" className="font-black text-primary hover:bg-primary/5 rounded-full px-6 h-12">
                  Export Report <ChevronRight size={18} className="ml-1" />
                </Button>
              </div>

              {/* Mock Chart Area */}
              <div className="h-[400px] w-full flex items-end justify-between gap-4 pt-10">
                {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.8 }}
                    className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-2xl relative group"
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      +{Math.floor(h * 123)} pts
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs font-black text-muted-foreground uppercase tracking-widest pt-4 border-t border-primary/5">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>
          </Card>

          {/* User List Mockup */}
          <Card className="rounded-[3rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-primary/5 flex justify-between items-center bg-primary/5">
              <h3 className="text-2xl font-black tracking-tight">Recent Activity</h3>
              <Button size="sm" variant="outline" className="rounded-full font-black border-2 border-primary/10">View All</Button>
            </div>
            <div className="divide-y divide-primary/5">
              {recentUsers.slice(0, 5).map((user: any, i: number) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg border-2 border-primary/5 uppercase">
                      {(user.name || user.email).charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-lg group-hover:text-primary transition-colors">{user.name || "Unknown User"}</h4>
                      <p className="text-sm font-medium text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">{user.role || "Member"}</span>
                    <p className="text-xs font-bold text-muted-foreground mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-10">
          <Card className="rounded-[3rem] border-4 border-primary/10 bg-primary text-primary-foreground p-10 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12">
              <Activity size={200} />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Platform Pulse</p>
              <h3 className="text-4xl font-black tracking-tighter">99.9% Health</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Server Load</span>
                <span>24%</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/4 rounded-full" />
              </div>
            </div>
            <Button className="w-full h-14 rounded-full bg-white text-primary font-black hover:bg-white/90 transition-all shadow-xl">
              System Diagnostics
            </Button>
          </Card>

          <Card className="rounded-[3rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl p-10 shadow-2xl space-y-8">
            <h3 className="text-2xl font-black tracking-tight">Growth Insights</h3>
            <div className="space-y-8">
              {[
                { label: "Total Users", val: stats.users || 0, color: "text-green-500", icon: Users },
                { label: "Total Trips", val: stats.trips || 0, color: "text-blue-500", icon: Plane },
                { label: "Total Spent", val: `$${(stats.totalSpent || 0).toLocaleString()}`, color: "text-primary", icon: TrendingUp }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <stat.icon size={22} />
                    </div>
                    <span className="font-bold text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className={`text-xl font-black ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Small Pie Chart Mock */}
          <Card className="rounded-[3rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl p-10 shadow-2xl flex flex-col items-center text-center space-y-6">
            <div className="relative w-40 h-40">
               <svg viewBox="0 0 100 100" className="rotate-[-90deg] w-full h-full drop-shadow-2xl">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="20" className="text-primary/10" />
                 <circle 
                   cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="20" 
                   strokeDasharray="251.2" 
                   strokeDashoffset="62.8" 
                   className="text-primary"
                   strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-black">75%</span>
                 <span className="text-[10px] font-black uppercase text-muted-foreground">Target</span>
               </div>
            </div>
            <div>
              <h4 className="font-black text-xl">Monthly Goal</h4>
              <p className="text-sm font-medium text-muted-foreground">We're ahead of schedule!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
