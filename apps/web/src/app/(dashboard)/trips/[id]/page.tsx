"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ItinerarySection } from "@/components/itinerary/itinerary-section";
import { Plus, Share2, Loader2, CalendarDays, Briefcase, MessageSquare } from "lucide-react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useTrips } from "@/api/hooks/use-trips";
import { useItinerary } from "@/api/hooks/use-itinerary";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useFormattedDate } from "@/lib/hooks/use-formatted-date";
import { cn } from "@/lib/utils";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const tripId = params.id as string;
  const { useTripQuery, useShareTripMutation } = useTrips();
  const { useStopsQuery, useCreateStopMutation, useDeleteStopMutation } = useItinerary();
  
  const [shareEmail, setShareEmail] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareMutation = useShareTripMutation(tripId);
  const createStopMutation = useCreateStopMutation();
  const deleteStopMutation = useDeleteStopMutation();


  const { data: tripResponse, isLoading: isTripLoading } = useTripQuery(tripId);
  const { data: stopsResponse, isLoading: isStopsLoading } = useStopsQuery(tripId);

  const trip = (tripResponse as any)?.data || {};
  const stops = (stopsResponse as any)?.data || [];

  const handleShare = async () => {
    if (!shareEmail) return;
    try {
      await shareMutation.mutateAsync(shareEmail);
      toast.success(`Invitation sent to ${shareEmail}`);
      setShareEmail("");
      setIsShareOpen(false);
    } catch (error) {
      toast.error("Failed to share trip");
    }
  };

  if (isTripLoading || isStopsLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary">Loading your adventure...</p>
      </div>
    );
  }

  const addSection = () => {
    createStopMutation.mutate({
      tripId,
      title: "New Activity",
      description: "",
      date: new Date().toISOString(),
      location: "Somewhere Beautiful",
      type: "ACTIVITY",
      order: stops.length,
    });
  };

  const removeSection = (id: string) => {
    deleteStopMutation.mutate(id);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8">
      {/* Trip Cover Image - Premium Addition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-80 rounded-[2.5rem] overflow-hidden group shadow-xl mx-4"
      >
        <img 
          src={trip.coverImage || "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop"} 
          alt={trip.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </motion.div>

      {/* Trip Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              Itinerary
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
              <CalendarDays className="h-3 w-3" />
              <TripDateHeader start={trip.startDate} end={trip.endDate} />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-tight">{trip.title}</h1>
            <p className="text-base text-muted-foreground font-medium mt-1">{trip.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full h-10 px-6 font-bold border-2 border-primary/10 hover:bg-primary/5 text-sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-8 max-w-md border-2 border-primary/10 bg-card/90 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight">Invite Collaborators</DialogTitle>
                <p className="text-sm text-muted-foreground font-medium">Plan this journey together with friends.</p>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Email Address</label>
                  <Input 
                    placeholder="friend@adventure.com" 
                    className="h-12 rounded-xl border-2 border-primary/5 bg-background font-bold text-sm" 
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full h-12 rounded-full font-black text-base shadow-lg"
                  onClick={handleShare}
                  disabled={shareMutation.isPending}
                >
                  {shareMutation.isPending ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Send Invitation"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            className="rounded-full h-10 px-8 font-black shadow-lg hover:shadow-primary/20 transition-all text-sm"
            onClick={addSection}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Day
          </Button>
        </div>
      </div>

      {/* Trip Navigation Tabs */}
      <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border-2 border-primary/5 w-fit mx-4">
        {[
          { name: "Itinerary", href: `/trips/${tripId}`, icon: CalendarDays },
          { name: "Packing List", href: `/trips/${tripId}/packing`, icon: Briefcase },
          { name: "Trip Notes", href: `/trips/${tripId}/notes`, icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => router.push(tab.href)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-[1.25rem] text-xs font-black transition-all",
              pathname === tab.href 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
            )}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-4">
        {/* Day Timeline Selector */}
        <div className="hidden lg:flex flex-col gap-3 sticky top-24 h-fit">
          {["D1", "D2", "D3", "D4", "D5"].map((day, i) => (
            <button
              key={day}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-base font-black transition-all border-2 ${
                i === 0 
                ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                : "bg-card/40 border-primary/5 text-muted-foreground hover:border-primary/20"
              }`}
            >
              {day}
            </button>
          ))}
          <button className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-dashed border-primary/20 text-primary hover:bg-primary/5 transition-all">
            <Plus size={20} />
          </button>
        </div>

        {/* Itinerary Area */}
        <div className="space-y-6">
          <div className="relative pl-6 md:pl-8">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[2px] md:left-[4px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-full" />

            <div className="space-y-6">
              <AnimatePresence>
                {stops.map((stop: any) => (
                  <ItinerarySection
                    key={stop.id}
                    section={{
                      id: stop.id,
                      title: stop.title || "New Activity",
                      description: stop.description || stop.notes || "",
                      dateRange: stop.date,
                      budget: stop.budget ? `$${stop.budget}` : "$0",
                      type: (stop.type || "ACTIVITY").toLowerCase(),
                      location: stop.location,
                      activities: stop.activities || [],
                    }}
                    onRemove={removeSection}
                  />
                ))}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-20 rounded-[1.5rem] border-2 border-dashed border-primary/10 flex flex-col items-center justify-center text-primary hover:bg-primary/5 transition-all group"
                onClick={addSection}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Plus className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-black tracking-tight">Add Activity</span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripDateHeader({ start, end }: { start: string; end: string }) {
  const startStr = useFormattedDate(start);
  const endStr = useFormattedDate(end);
  return (
    <span>
      {startStr && endStr ? `${startStr} - ${endStr}` : "TBD"}
    </span>
  );
}
