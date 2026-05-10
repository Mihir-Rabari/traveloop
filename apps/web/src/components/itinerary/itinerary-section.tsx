import { MapPin, Plane, Bed, Trash2, Clock, Plus, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useActivities } from "@/api/hooks/use-activities";
import { useItinerary } from "@/api/hooks/use-itinerary";
import { useFormattedTime } from "@/lib/hooks/use-formatted-date";
import { toast } from "sonner";
import { useState } from "react";

interface Section {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
  type: "travel" | "hotel" | "activity";
  location?: string;
  activities?: any[];
}

const typeIcons = {
  travel: Plane,
  hotel: Bed,
  activity: MapPin,
};

const typeColors = {
  travel: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  hotel: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  activity: "bg-green-500/10 text-green-500 border-green-500/20",
};

export function ItinerarySection({
  section,
  onRemove,
}: {
  section: Section;
  onRemove: (id: string) => void;
}) {
  const Icon = typeIcons[section.type] || MapPin;
  const colorClass = typeColors[section.type] || typeColors.activity;
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  
  const city = section.location?.split(",")[0] || "";
  const { useCityActivitiesQuery } = useActivities(city);
  const { data: activitiesResponse, isLoading: isActivitiesLoading } = useCityActivitiesQuery();
  const activities = (activitiesResponse as any)?.data || [];

  const { useCreateActivityMutation } = useItinerary();
  const createActivityMutation = useCreateActivityMutation();


  const handleAddActivity = async (activity: any) => {
    try {
      await createActivityMutation.mutateAsync({
        stopId: section.id,
        title: activity.title,
        description: activity.category,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        location: section.location,
        cost: Number(activity.cost),
      });
      toast.success(`Added ${activity.title} to your itinerary!`);
      setIsDiscoveryOpen(false);
    } catch (error) {
      toast.error("Failed to add activity");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative group"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[37px] md:-left-[45px] top-8 w-6 h-6 rounded-full bg-background border-4 border-primary z-10 shadow-lg group-hover:scale-125 transition-transform" />

      <Card className="rounded-[2.5rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Icon & Category */}
            <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 border-2 ${colorClass}`}>
              <Icon size={32} strokeWidth={2.5} />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-foreground">{section.title}</h3>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{section.location || "Location not set"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-background/50 px-4 py-2 rounded-full border-2 border-primary/5 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <StopTimeDisplay date={section.dateRange} />
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:bg-destructive/10" onClick={() => onRemove(section.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground font-medium leading-relaxed">
                {section.description || "No description provided for this activity."}
              </p>

              <div className="pt-6 space-y-6 border-t border-primary/5">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-foreground">Activities</h4>
                  <Dialog open={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full font-bold border-2 border-primary/10 hover:bg-primary/5 h-10 px-4">
                        <Star className="h-4 w-4 mr-2 text-primary fill-primary/20" />
                        Explore Things to Do
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2.5rem] p-10 max-w-2xl border-4 border-primary/10 bg-card/90 backdrop-blur-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-black tracking-tight">Discover {city}</DialogTitle>
                        <p className="text-muted-foreground font-medium italic">Handpicked activities for your stop.</p>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                        {isActivitiesLoading ? (
                          <div className="col-span-full flex justify-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                          </div>
                        ) : activities.map((act: any) => (
                          <motion.div
                            key={act.id}
                            whileHover={{ y: -5 }}
                            className="bg-background rounded-[2rem] border-2 border-primary/5 hover:border-primary/20 transition-all cursor-pointer group/card overflow-hidden"
                            onClick={() => handleAddActivity(act)}
                          >
                            <div className="h-32 overflow-hidden">
                              <img 
                                src={`https://images.unsplash.com/photo-1500835595327-8337aa2fd3f5?q=80&w=400&auto=format&fit=crop&sig=${act.id}`} 
                                alt={act.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                              />
                            </div>
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-black uppercase tracking-widest text-primary/60">{act.category}</span>
                                <div className="flex items-center gap-1 text-primary">
                                  <Star className="h-4 w-4 fill-primary" />
                                  <span className="text-sm font-bold">{act.rating}</span>
                                </div>
                              </div>
                              <h5 className="text-xl font-black mb-2 line-clamp-1">{act.title}</h5>

                              <div className="flex items-center justify-between mt-4">
                                <span className="font-black text-lg">${act.cost}</span>
                                <Button size="sm" className="rounded-full font-black opacity-0 group-hover/card:opacity-100 transition-all">
                                  Add to Trip
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-4">
                  {(section.activities || []).map((act: any) => (
                    <div key={act.id} className="flex items-center justify-between bg-primary/5 p-4 rounded-2xl border border-primary/10 group/act">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary border border-primary/10">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{act.title}</p>
                          <p className="text-xs font-medium text-muted-foreground">
                            <ActivityTime time={act.startTime} />
                            • ${act.budget || 0}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive opacity-0 group-hover/act:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  {(!section.activities || section.activities.length === 0) && (
                    <p className="text-sm font-medium text-muted-foreground italic">No activities planned for this stop yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ActivityTime({ time }: { time: string }) {
  const formatted = useFormattedTime(time);
  return <>{formatted || "TBD"}</>;
}

function StopTimeDisplay({ date }: { date: string }) {
  const formatted = useFormattedTime(date);
  return <span className="text-sm font-black text-foreground">{formatted || "All Day"}</span>;
}
