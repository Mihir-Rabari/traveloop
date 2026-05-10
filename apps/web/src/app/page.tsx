"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegionalCard } from "@/components/cards/regional-card";
import { TripCard } from "@/components/cards/trip-card";
import { Search, MapPin, Plus, ArrowRight, Loader2, Globe2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/api/hooks/use-auth";
import { useTrips } from "@/api/hooks/use-trips";
import { useCities } from "@/api/hooks/use-cities";
import { toast } from "sonner";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { useTripsQuery } = useTrips();
  const { data: tripsResponse, isLoading: tripsLoading } = useTripsQuery();
  const { usePopularCitiesQuery } = useCities();
  const { data: citiesResponse, isLoading: citiesLoading } = usePopularCitiesQuery();

  const [searchQuery, setSearchQuery] = useState("");

  const userTrips = (tripsResponse as any)?.data || [];
  const popularCities = (citiesResponse as any)?.data || [];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for adventures in "${searchQuery}"...`);
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/explore');
    }
  };

  const navigateToCreate = () => {
    if (isAuthenticated) {
      router.push('/trips/create');
    } else {
      toast.error("Please login to plan your trip!");
      router.push('/login');
    }
  };

  const handleCommunityClick = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: 'Connecting to Traveloop Global...',
      success: 'Our traveler community is currently being curated. We will notify you when it launches!',
      error: 'Failed to connect.',
    });
  };

  if (tripsLoading && isAuthenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary animate-pulse">Prepping your adventure...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/5">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => router.push('/')}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <MapPin className="text-primary-foreground h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">traveloop</span>
        </motion.div>
        <div className="flex items-center gap-6">
          <Button variant="ghost" className="font-bold text-muted-foreground hover:text-primary transition-colors" onClick={() => router.push('/explore')}>Explore</Button>
          <Button 
            variant="ghost" 
            className="font-bold text-muted-foreground hover:text-primary transition-colors"
            onClick={handleCommunityClick}
          >
            Community
          </Button>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="font-bold text-muted-foreground hover:text-primary transition-colors" onClick={() => router.push('/dashboard')}>Dashboard</Button>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-full border-4 border-primary/20 overflow-hidden cursor-pointer shadow-lg hover:border-primary transition-all" 
                onClick={() => router.push('/profile')}
              >
                <img src={user?.avatar || "/avatar.png"} alt="User" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-full px-8 py-6 font-bold shadow-xl hover:shadow-primary/20 transition-all" onClick={() => router.push('/login')}>Get Started</Button>
            </motion.div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-24">
        {/* Banner Section */}
        <section className="relative h-[600px] rounded-[4rem] overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop" 
            alt="Adventure Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl space-y-8"
            >
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md text-primary-foreground w-fit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Next-Gen Travel Planning
              </div>
              <h1 className="text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Plan your <span className="text-primary underline decoration-primary/30 underline-offset-8">perfect</span> <br />
                adventure today.
              </h1>
              <p className="text-xl text-white/80 font-medium max-w-lg leading-relaxed">
                The intelligent, illustrative way to organize, collaborate, and discover travels three times faster than before.
              </p>
              
              {/* Search Bar Overlay */}
              <form onSubmit={handleSearch} className="relative max-w-xl group pt-4">
                <Input 
                  placeholder="Where do you want to go?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-20 pl-16 pr-40 rounded-full border-none bg-white/95 backdrop-blur-md shadow-2xl text-xl font-bold text-charcoal focus-visible:ring-primary transition-all placeholder:text-muted-foreground/50"
                />
                <Search className="absolute left-6 top-[60%] -translate-y-1/2 text-muted-foreground h-7 w-7 group-focus-within:text-primary transition-colors" />
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-3 top-[60%] -translate-y-1/2"
                >
                  <Button 
                    type="submit"
                    className="rounded-full px-10 h-14 font-black text-lg shadow-xl transition-all"
                  >
                    Explore
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Top Regional Selections */}
        <section className="space-y-10">
          <div className="flex items-center justify-between px-4">
            <div className="space-y-1">
              <h2 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
                <Globe2 className="h-8 w-8 text-primary" />
                Top Regional Selections
              </h2>
              <p className="text-muted-foreground font-medium">Handpicked destinations based on global traveler trends.</p>
            </div>
            <Button 
              variant="link" 
              className="font-black text-primary text-xl flex items-center gap-2 hover:gap-4 transition-all"
              onClick={() => router.push('/explore')}
            >
              View all destinations <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCities.length > 0 ? (
              popularCities.slice(0, 4).map((city: any) => (
                <motion.div 
                  key={city.id}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={() => {
                    toast.info(`Exploring ${city.name}...`);
                    router.push(`/explore?q=${encodeURIComponent(city.name)}`);
                  }}
                >
                  <RegionalCard 
                    title={city.name} 
                    count={Math.floor(Math.random() * 20) + 15} 
                    image={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop&sig=${city.id}`}
                  />
                </motion.div>

              ))
            ) : citiesLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-primary/5 rounded-[2.5rem] animate-pulse border-2 border-primary/5" />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground font-bold italic">
                No destinations available at the moment.
              </div>
            )}
          </div>
        </section>

        {/* Previous Trips Section */}
        {isAuthenticated && userTrips.length > 0 && (
          <section className="space-y-10 pb-20">
            <div className="flex items-center justify-between px-4">
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-primary" />
                  Your Previous Adventures
                </h2>
                <p className="text-muted-foreground font-medium">Relive your memories and plan your next chapter.</p>
              </div>
              <Button 
                variant="link" 
                className="font-black text-primary text-xl flex items-center gap-2 hover:gap-4 transition-all"
                onClick={() => router.push('/trips')}
              >
                Full History <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {userTrips.slice(0, 3).map((trip: any) => (
                <motion.div
                  key={trip.id}
                  whileHover={{ y: -10, scale: 1.02 }}
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
                    status="completed" 
                  />

                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Floating Action Button */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-12 right-12 z-50"
      >
        <Button 
          className="rounded-full h-20 px-10 shadow-[0_20px_60px_rgba(253,242,208,0.4)] bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xl flex items-center gap-4 border-4 border-background"
          onClick={navigateToCreate}
        >
          <Plus className="h-8 w-8 stroke-[4px]" />
          Plan a trip
        </Button>
      </motion.div>
    </div>
  );
}

