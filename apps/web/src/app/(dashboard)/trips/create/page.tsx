"use client";

import { useState, useEffect, Suspense } from "react";
import { useTrips } from "@/api/hooks/use-trips";
import { Plane, CalendarDays, MapPin, Plus, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

function CreateTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlDestination = searchParams.get("destination") || "";
  
  const { useCreateTripMutation } = useTrips();
  const createTripMutation = useCreateTripMutation();

  const [formData, setFormData] = useState({
    title: "",
    destination: urlDestination,
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (urlDestination && !formData.destination) {
      setFormData(prev => ({ ...prev, destination: urlDestination }));
    }
  }, [urlDestination]);

  const handleSave = () => {
    if (!formData.title || !formData.destination || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields!");
      return;
    }

    // Format dates to ISO for backend Zod validator
    const payload = {
      title: formData.title,
      description: `Exploring ${formData.destination}. ${formData.description}`,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      visibility: "PRIVATE" as const,
    };

    createTripMutation.mutate(payload, {
      onSuccess: (response: any) => {
        const tripId = response.data?.id;
        if (tripId) {
          router.push(`/trips/${tripId}`);
        } else {
          router.push("/trips");
        }
      },
      onError: (err) => {
        console.error("Failed to create trip:", err);
        alert("Something went wrong while saving your trip.");
      }
    });
  };
  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Plane className="h-6 w-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">New Adventure</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">Plan a new trip</h1>
          <p className="text-base text-muted-foreground font-medium">Let's sketch out your next dream destination.</p>
        </div>
        <Button 
          className="rounded-full h-12 px-8 text-base font-black shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2 bg-[#FFD15B] text-black hover:bg-[#FFC533]"
          onClick={handleSave}
          disabled={createTripMutation.isPending}
        >
          {createTripMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          {createTripMutation.isPending ? "Saving..." : "Save Trip"}
        </Button>
      </div>

      <Card className="rounded-[2rem] border-2 border-primary/5 bg-white/60 backdrop-blur-xl overflow-hidden shadow-xl">
        <CardContent className="p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-3">
              <Label htmlFor="trip-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Trip Name</Label>
              <Input 
                id="trip-name" 
                placeholder="e.g. Summer in Europe" 
                className="h-14 rounded-2xl px-6 border-2 border-primary/5 bg-background/50 focus:border-primary transition-all text-sm font-bold"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="primary-destination" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Primary Destination</Label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="primary-destination" 
                  placeholder="Where to?" 
                  className="h-14 pl-14 pr-6 rounded-2xl border-2 border-primary/5 bg-background/50 focus:border-primary transition-all text-sm font-bold" 
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="start-date" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Start Date</Label>
              <div className="relative group">
                <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="start-date" 
                  type="date" 
                  className="h-14 pl-14 pr-6 rounded-2xl border-2 border-primary/5 bg-background/50 focus:border-primary transition-all text-sm font-bold" 
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="end-date" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">End Date</Label>
              <div className="relative group">
                <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="end-date" 
                  type="date" 
                  className="h-14 pl-14 pr-6 rounded-2xl border-2 border-primary/5 bg-background/50 focus:border-primary transition-all text-sm font-bold" 
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-3xl font-black tracking-tight text-foreground">Quick Select</h2>
          <Button 
            variant="outline" 
            className="rounded-full px-6 h-11 font-black border-2 border-primary/10 hover:bg-primary/5 text-xs"
            onClick={() => document.getElementById("primary-destination")?.focus()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Custom
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop" },
            { name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop" },
            { name: "Banff, Canada", img: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=800&auto=format&fit=crop" },
            { name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" },
            { name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" },
            { name: "Swiss Alps", img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=800&auto=format&fit=crop" },
          ].map((place, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group"
              onClick={() => setFormData({ ...formData, destination: place.name })}
            >
              <Card className="overflow-hidden rounded-[2.5rem] border-2 border-primary/5 bg-white/60 backdrop-blur-md cursor-pointer hover:shadow-2xl transition-all duration-500 hover:border-primary/20">
                <div className="h-44 bg-muted/50 w-full relative overflow-hidden">
                   <img src={place.img} alt={place.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20">
                        <Plus className="h-8 w-8 text-white" />
                      </div>
                   </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-black text-xl text-foreground tracking-tight">{place.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Trending Destination</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CreateTripPage() {
  return (
    <Suspense fallback={
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-xl font-black text-primary italic">Loading Trip Planner...</p>
      </div>
    }>
      <CreateTripForm />
    </Suspense>
  );
}
