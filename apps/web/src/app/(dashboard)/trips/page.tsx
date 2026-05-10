"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TripCard } from "@/components/cards/trip-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plane, Calendar, MapPin, Search, SlidersHorizontal, Plus, Loader2 } from "lucide-react";
import { useTrips } from "@/api/hooks/use-trips";
import { motion } from "framer-motion";

export default function TripsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ongoing" | "upcoming" | "completed">("ongoing");
  const { useTripsQuery } = useTrips();
  const { data: tripsResponse, isLoading } = useTripsQuery();

  const allTrips = (tripsResponse as any)?.data || [];
  
  const now = new Date();
  const trips = {
    ongoing: allTrips.filter((t: any) => new Date(t.startDate) <= now && new Date(t.endDate) >= now),
    upcoming: allTrips.filter((t: any) => new Date(t.startDate) > now),
    completed: allTrips.filter((t: any) => new Date(t.endDate) < now),
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary">Gathering your adventures...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Plane className="h-6 w-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Your Journey</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-tight">My Trips</h1>
          <p className="text-base text-muted-foreground font-medium">All your adventures in one beautiful place.</p>
        </div>
        <Button 
          className="rounded-full h-12 px-8 text-sm font-black shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2"
          onClick={() => router.push('/trips/create')}
        >
          <Plus className="h-5 w-5" />
          Plan New Trip
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between px-4">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search your trips..." 
            className="h-11 pl-12 pr-6 rounded-full border-2 border-primary/5 bg-card/40 backdrop-blur-md focus:border-primary/20 transition-all text-sm font-bold shadow-sm"
          />
        </div>
        
        <div className="bg-card/40 backdrop-blur-md p-1.5 rounded-full border-2 border-primary/5 flex items-center gap-1">
          {(["ongoing", "upcoming", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[11px] font-black rounded-full transition-all capitalize ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {activeTab === "ongoing" && trips.ongoing.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 px-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <h2 className="text-2xl font-black tracking-tight text-foreground">Currently Exploring</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.ongoing.map((trip: any) => (
                <TripCard key={trip.id} {...trip} status="ongoing" />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "upcoming" && trips.upcoming.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 px-4">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border-2 border-blue-500/20">
                <Calendar className="h-4 w-4" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">Future Adventures</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.upcoming.map((trip: any) => (
                <TripCard key={trip.id} {...trip} status="upcoming" />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "completed" && trips.completed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 px-4">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                <MapPin className="h-4 w-4" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">Cherished Memories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.completed.map((trip: any) => (
                <TripCard key={trip.id} {...trip} status="completed" />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
