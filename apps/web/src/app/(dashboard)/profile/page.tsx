"use client";

import { Mail, Phone, MapPin, Edit3, Award, Heart, Share2, Settings, Plane, Bed, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/cards/trip-card";
import { useAuth } from "@/api/hooks/use-auth";
import { useTrips } from "@/api/hooks/use-trips";

export default function ProfilePage() {
  const { useMeQuery } = useAuth();
  const { data: userResponse, isLoading: isUserLoading } = useMeQuery();
  const { useTripsQuery } = useTrips();
  const { data: tripsResponse, isLoading: isTripsLoading } = useTripsQuery();

  const user = (userResponse as any)?.data || {};
  const trips = (tripsResponse as any)?.data || [];

  if (isUserLoading || isTripsLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary">Unpacking your profile...</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Premium Profile Header Section */}
      <div className="relative mb-24">
        {/* Banner Wrapper */}
        <div className="relative h-60 md:h-72 rounded-[3rem] overflow-hidden border-2 border-primary/5 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" 
            alt="Profile Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Settings Buttons - Inside Banner */}
          <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
            <Button variant="outline" className="rounded-full h-12 px-6 font-black border-2 border-white/20 bg-white/10 backdrop-blur-md text-sm text-white hover:bg-white hover:text-primary transition-all">
              <Share2 size={18} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-6 font-black border-2 border-white/20 bg-white/10 backdrop-blur-md text-sm text-white hover:bg-white hover:text-primary transition-all">
              <Settings size={18} className="mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* PFP - Floating Over Banner */}
        <div className="absolute -bottom-16 left-10 md:left-16 z-30">
          <div className="relative group">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[10px] border-background shadow-2xl overflow-hidden bg-card"
            >
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"} 
                alt="User Avatar" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-4 right-4 bg-primary text-primary-foreground p-3.5 rounded-full shadow-2xl border-[4px] border-background group-hover:bg-primary/90 transition-all z-40"
            >
              <Edit3 size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* User Info & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 pt-8 md:pt-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight">{user.name || "Adventurer"}</h1>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
              {user.bio || "No bio yet. Adventure awaits!"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: Mail, value: user.email, label: "Email Address" },
              { icon: Phone, value: user.phone || "Not set", label: "Phone Number" },
              { icon: MapPin, value: user.location || "Earth", label: "Current Location" },
              { icon: Award, value: user.role === 'ADMIN' ? 'Administrator' : 'Elite Traveler', label: "Member Status" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-card/40 backdrop-blur-md p-4 rounded-[1.5rem] border-2 border-primary/5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">{item.label}</p>
                  <p className="text-sm md:text-base font-black text-foreground line-clamp-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Stats */}
        <Card className="rounded-[2.5rem] border-2 border-primary/10 bg-card/40 backdrop-blur-xl shadow-xl p-8 space-y-8 h-fit">
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tight">Travel Stats</h3>
            <div className="space-y-4">
              {[
                { label: "Trips Planned", value: trips.length.toString(), icon: Plane },
                { label: "Cities Visited", value: "0", icon: MapPin },
                { label: "Wishlist Items", value: "0", icon: Heart },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm">
                    <stat.icon size={18} />
                    <span>{stat.label}</span>
                  </div>
                  <span className="text-xl font-black text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-primary/10" />
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tight">Recent Badges</h3>
            <div className="flex flex-wrap gap-3">
              {["🌍", "🏔️", "🍕", "📷"].map((emoji, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-xl shadow-inner border border-primary/5">
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Featured Trips */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tighter text-foreground">Featured Trips</h2>
          <Button variant="link" className="font-bold text-primary text-base">View all memories</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trips.slice(0, 3).map((trip: any) => (
            <TripCard 
              key={trip.id} 
              id={trip.id}
              title={trip.title}
              destination={trip.destination}
              startDate={trip.startDate}
              endDate={trip.endDate}
              image={trip.coverImage || `https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop&sig=${trip.id}`}
              status="completed" 
            />
          ))}
          {trips.length === 0 && <div className="text-muted-foreground font-bold col-span-full py-10">No trips planned yet. Start your first journey!</div>}
        </div>
      </section>
    </div>
  );
}
