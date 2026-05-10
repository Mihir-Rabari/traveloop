"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegionalCard } from "@/components/cards/regional-card";
import { TripCard } from "@/components/cards/trip-card";
import { 
  Search, SlidersHorizontal, ArrowDownAZ, Plus, Loader2, 
  TrendingUp, Map as MapIcon, Calendar as CalendarIcon, 
  ChevronRight, Sparkles, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTrips } from "@/api/hooks/use-trips";
import { useCities } from "@/api/hooks/use-cities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { useTripsQuery } = useTrips();
  const { data: tripsResponse, isLoading: tripsLoading } = useTripsQuery();
  const { usePopularCitiesQuery } = useCities();
  const { data: citiesResponse, isLoading: citiesLoading } = usePopularCitiesQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const trips = (tripsResponse as any)?.data || [];
  const popularCities = (citiesResponse as any)?.data || [];

  const filteredTrips = useMemo(() => {
    let result = trips.filter((trip: any) => 
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "name") {
      result.sort((a: any, b: any) => a.title.localeCompare(b.title));
    } else {
      result.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }

    return result;
  }, [trips, searchQuery, sortBy]);

  const filteredCities = useMemo(() => {
    return popularCities.filter((city: any) => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [popularCities, searchQuery]);

  if (tripsLoading || citiesLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-8 text-center">
        <div className="relative">
          <Loader2 className="h-24 w-24 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="h-10 w-10 text-primary/40 animate-pulse" />
          </div>
        </div>
        <p className="text-2xl md:text-4xl font-black text-primary tracking-tighter">Charting your course...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 px-4">
      {/* Premium Illustrative Banner */}
      <section className="relative h-80 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop" 
          alt="Adventure Banner" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-xl space-y-3 md:space-y-4"
          >
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Personalized Insights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Where will your <br className="hidden md:block"/> heart take you?
            </h2>
            <p className="text-base md:text-xl text-white/70 font-medium leading-relaxed max-w-md">
              Explore the world's most breathtaking destinations and craft your next legendary story.
            </p>
            <Button 
              className="rounded-full h-12 md:h-14 px-6 md:px-8 bg-white text-primary hover:bg-white/90 font-black text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
              onClick={() => router.push("/explore")}
            >
              Start Exploring
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Active Trips", value: trips.length, icon: MapIcon, color: "bg-blue-500" },
          { label: "World Regions", value: "8", icon: Globe, color: "bg-green-500" },
          { label: "Checklists", value: "12", icon: SlidersHorizontal, color: "bg-orange-500" },
          { label: "Travel Points", value: "2.4k", icon: TrendingUp, color: "bg-purple-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border-2 border-primary/5 flex items-center gap-4 hover:border-primary/20 transition-all shadow-lg hover:shadow-xl group"
          >
            <div className={`${stat.color} h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform`}>
              <stat.icon size={18} className="md:w-[22px] md:h-[22px]" />
            </div>
            <div>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl md:text-2xl font-black text-foreground tracking-tighter">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-between">
        <div className="relative w-full lg:max-w-xl group">
          <Search className="absolute left-6 md:left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
          <Input 
            placeholder="Search your adventures..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 md:h-16 pl-14 md:pl-16 pr-6 rounded-[1.5rem] md:rounded-[2rem] border-2 border-primary/5 bg-white/60 backdrop-blur-xl focus:bg-white focus:border-primary/20 transition-all text-base md:text-lg font-bold shadow-xl shadow-black/5"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button 
            variant={sortBy === "name" ? "default" : "outline"}
            className="flex-1 lg:flex-none rounded-full h-12 md:h-14 px-6 md:px-8 font-black border-2 border-primary/5 transition-all flex items-center gap-2 text-xs md:text-sm"
            onClick={() => setSortBy(sortBy === "name" ? "date" : "name")}
          >
            <ArrowDownAZ className="h-4 w-4 md:h-5 md:w-5" />
            Sort by {sortBy === "name" ? "A-Z" : "Date"}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 lg:flex-none rounded-full h-12 md:h-14 px-6 md:px-8 font-black border-2 border-primary/5 transition-all flex items-center gap-2 text-xs md:text-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 md:h-5 md:w-5" />
            Advanced
          </Button>
        </div>
      </div>

      {/* Regional Selections */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">Trending Destinations</h3>
            <p className="text-muted-foreground font-medium mt-1">Curated places specifically for your travel style.</p>
          </div>
          <Button 
            variant="link" 
            className="font-black text-primary text-lg md:text-xl hover:scale-105 transition-transform p-0 md:p-4" 
            onClick={() => router.push('/explore')}
          >
            See all places
            <ChevronRight className="ml-1 h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence>
            {filteredCities.slice(0, 4).map((city: any, i: number) => (
              <motion.div 
                key={city.id || i} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => router.push(`/explore?q=${encodeURIComponent(city.name)}`)}
              >
                <RegionalCard 
                  title={city.name} 
                  count={Math.floor(Math.random() * 20) + 5} 
                  image={city.image || `https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop&sig=${i}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Trips Section */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">Your Journey History</h3>
            <p className="text-muted-foreground font-medium mt-1">Revisit your past adventures and future plans.</p>
          </div>
          <Button variant="link" className="text-lg md:text-xl font-black text-primary p-0 md:p-4" onClick={() => router.push("/trips")}>
            Full history
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Plan a trip card */}
          <motion.div
            whileHover={{ y: -12, scale: 1.02 }}
            className="h-full min-h-[300px] md:min-h-[350px]"
          >
            <button 
              onClick={() => router.push("/trips/create")}
              className="w-full h-full rounded-[3rem] md:rounded-[4rem] border-8 border-dashed border-primary/10 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center text-primary hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer shadow-2xl group"
            >
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                <Plus size={32} className="md:w-[40px] md:h-[40px]" strokeWidth={4} />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter">Plan New Trip</span>
              <p className="text-base md:text-lg font-bold text-muted-foreground mt-2 md:mt-3">Start your next legend</p>
            </button>
          </motion.div>

          <AnimatePresence>
            {filteredTrips.map((trip: any) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => router.push(`/trips/${trip.id}`)}
              >
                <TripCard 
                  id={trip.id}
                  title={trip.title}
                  destination={trip.destination}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  image={trip.coverImage || `https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop&sig=${trip.id}`}
                  status="upcoming" 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}


