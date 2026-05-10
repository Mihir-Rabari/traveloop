"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, MapPin, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useCities } from "@/api/hooks/use-cities";
import { Loader2, Plus } from "lucide-react";

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  
  const { usePopularCitiesQuery, useSearchCitiesQuery } = useCities();
  
  const { data: popularResponse, isLoading: popularLoading } = usePopularCitiesQuery();
  const { data: searchResponse, isLoading: searchLoading } = useSearchCitiesQuery(searchQuery);

  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  const results = searchQuery 
    ? (searchResponse as any)?.data || [] 
    : (popularResponse as any)?.data || [];

  if (popularLoading && !searchQuery) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary">Discovering the world for you...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4">
      {/* Illustrative Guide Banner */}
      <section className="relative h-72 rounded-[2.5rem] overflow-hidden group shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop" 
          alt="Travel Guide" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl space-y-3"
          >
            <div className="bg-primary/20 backdrop-blur-md text-primary-foreground w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              Curated for you
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">Explore Hidden Gems</h1>
            <p className="text-base text-white/80 font-medium">
              Discover unique experiences and secret spots shared by fellow travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-lg group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search activities, cities, culture..." 
            className="h-12 pl-12 pr-6 rounded-full border-2 border-primary/5 bg-card/40 backdrop-blur-md focus:border-primary/20 transition-all text-sm font-bold shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="rounded-full h-12 px-6 font-black border-2 border-primary/10 hover:bg-primary/5 transition-all flex items-center gap-2 text-sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <div className="flex items-center gap-1 bg-card/40 backdrop-blur-md p-1.5 rounded-full border-2 border-primary/5">
            {["All", "Adventure", "Food", "Culture"].map((cat) => (
              <button key={cat} className="px-5 py-2 text-[11px] font-black rounded-full hover:bg-primary/5 transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.length > 0 ? (
          results.map((result: any) => (
            <motion.div
              key={result.id}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-[2.5rem] border-2 border-primary/5 bg-white/90 backdrop-blur-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-primary/20 group flex flex-col h-full shadow-lg p-0">
                {/* Image Container - Full width, absolute touch to edges */}
                <div className="h-64 bg-muted relative overflow-hidden shrink-0 w-full m-0 p-0 border-b-2 border-primary/5">
                   <img 
                    src={`https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop&sig=${result.id}`} 
                    alt={result.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop";
                    }}
                   />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur text-[10px] font-black px-5 py-2.5 rounded-full shadow-2xl border border-primary/5 text-primary">
                    Popular
                  </div>
                  
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="bg-black/60 backdrop-blur-md text-white p-2.5 rounded-2xl border border-white/20">
                      <Tag size={14} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white drop-shadow-2xl">
                      City
                    </span>
                  </div>
                </div>

                <CardContent className="p-10 flex-1 flex flex-col justify-between bg-white/20">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors leading-none">
                      {result.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm font-bold">
                      <MapPin className="h-4 w-4 mr-2 text-primary/60" />
                      {result.location || result.country}
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <Button 
                      className="w-full h-16 rounded-full text-lg font-black shadow-2xl shadow-primary/10 hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 bg-[#FFD15B] text-black hover:bg-[#FFC533]"
                      onClick={() => router.push(`/trips/create?destination=${encodeURIComponent(result.name)}`)}
                    >
                      <Plus className="h-6 w-6" />
                      Plan Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            {searchLoading ? (
               <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
            ) : (
              <>
                <div className="text-5xl text-muted-foreground/20 font-black">Oops!</div>
                <p className="text-lg text-muted-foreground font-medium">No destinations found for "{searchQuery}"</p>
                <Button variant="outline" className="rounded-full h-11 px-8 font-black text-sm" onClick={() => setSearchQuery("")}>Clear Search</Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-20 w-20 text-primary animate-spin" />
        <p className="text-3xl font-black text-primary italic text-center">Finding your next destination...</p>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
