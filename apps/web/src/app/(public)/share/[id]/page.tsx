"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarDays, Share2, Copy, Heart, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useShare } from "@/api/hooks/use-share";

export default function PublicTripPage() {
  const params = useParams();
  const tripId = params.id as string;
  const { usePublicTripQuery } = useShare();
  const { data: tripResponse, isLoading } = usePublicTripQuery(tripId);

  const trip = (tripResponse as any)?.data || {};

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary">Unfolding the adventure...</p>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 pt-10">
      {/* Cinematic Trip Banner */}
      <section className="relative h-[450px] rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl group">
        <img 
          src="/banner.png" 
          alt="Trip Banner" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                <MapPin size={24} />
              </div>
              <span className="text-sm font-black text-white uppercase tracking-[0.3em]">Shared Adventure</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-tight max-w-2xl">{trip.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg font-bold text-white/90">
              <span className="flex items-center gap-2">
                <CalendarDays size={20} className="text-primary" />
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                {trip.destination}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button className="rounded-full h-16 px-10 font-black shadow-2xl hover:shadow-primary/20 transition-all bg-primary text-primary-foreground text-lg">
              <Copy className="mr-3 h-6 w-6" />
              Copy Trip
            </Button>
            <Button variant="outline" className="rounded-full h-16 w-16 p-0 border-4 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
              <Heart size={28} />
            </Button>
          </div>
        </div>
      </section>

      {/* Creator Info Bar */}
      <div className="mx-4 flex flex-col md:flex-row items-center justify-between p-8 rounded-[3rem] bg-card/40 backdrop-blur-xl border-4 border-primary/5 shadow-xl gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 overflow-hidden shadow-lg bg-background">
            <img src="/avatar.png" alt="Creator" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary">Planned By</p>
            <h3 className="text-2xl font-black text-foreground">{trip.user?.name || "Explorer"}</h3>
            <p className="text-sm font-bold text-muted-foreground">{trip.user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full h-14 px-8 font-black border-2 border-primary/10">
            <Share2 className="mr-2 h-5 w-5" />
            Share Trip
          </Button>
          <Button variant="ghost" className="rounded-full h-14 px-8 font-black text-primary hover:bg-primary/5">
            Follow Explorer
          </Button>
        </div>
      </div>

      {/* Public Itinerary Overview */}
      <section className="space-y-12 px-4">
        <div className="flex items-center gap-6">
          <h2 className="text-4xl font-black tracking-tighter text-foreground">The Itinerary</h2>
          <div className="h-1 flex-1 bg-primary/10 rounded-full" />
        </div>
        
        <div className="space-y-10 relative pl-12 border-l-4 border-dashed border-primary/10">
          {(trip.stops || []).length > 0 ? (
            trip.stops.map((stop: any, i: number) => (
              <motion.div 
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-4 border-background shadow-lg">
                  <MapPin size={20} />
                </div>
                <Card className="rounded-[2.5rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
                  <div className="p-10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">{stop.type || "Stop"}</span>
                        <h3 className="text-3xl font-black tracking-tight text-foreground mt-2">{stop.title}</h3>
                        <p className="text-sm font-bold text-muted-foreground mt-1">{stop.location}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-foreground">{new Date(stop.date).toLocaleDateString()}</p>
                         <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">${stop.budget || 0}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-muted-foreground leading-relaxed">
                      {stop.description}
                    </p>
                    {stop.activities?.length > 0 && (
                      <div className="pt-6 space-y-4 border-t border-primary/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary">Key Activities</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {stop.activities.map((act: any) => (
                            <div key={act.id} className="flex items-center gap-3 bg-primary/5 p-3 rounded-2xl border border-primary/10">
                              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary">
                                <Activity size={16} />
                              </div>
                              <span className="font-bold text-sm">{act.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="py-10 text-muted-foreground font-bold">No public itinerary shared yet.</div>
          )}
        </div>
      </section>

      {/* Call to Action for Visitors */}
      <section className="px-4 text-center space-y-8 py-20 bg-primary/5 rounded-[4rem] border-4 border-dashed border-primary/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-5xl font-black tracking-tighter text-foreground leading-tight">Want to plan your own dream adventure?</h2>
          <p className="text-xl font-medium text-muted-foreground">Join Traveloop today and start crafting cinematic journeys like this one.</p>
          <div className="flex items-center justify-center gap-6 pt-4">
            <Button className="rounded-full h-16 px-12 font-black text-xl shadow-2xl">
              Get Started for Free
            </Button>
            <Button variant="outline" className="rounded-full h-16 px-12 font-black text-xl border-2 border-primary/10">
              Explore More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
