"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegionalCard } from "@/components/cards/regional-card";
import { TripCard } from "@/components/cards/trip-card";
import { Search, SlidersHorizontal, ArrowDownAZ, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Banner Image */}
      <div className="w-full h-48 md:h-64 rounded-2xl bg-primary/10 border flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="relative z-20 text-white p-8 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Where to next?</h2>
          <p className="text-white/80 max-w-md">Discover new places and plan your perfect itinerary with Traveloop.</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips or places..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            Sort by
          </Button>
        </div>
      </div>

      {/* Top Regional Selections */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Top Regional Selections</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <RegionalCard title="Europe" count={120} />
          <RegionalCard title="Asia" count={85} />
          <RegionalCard title="North America" count={64} />
          <RegionalCard title="South America" count={32} />
          <RegionalCard title="Oceania" count={18} />
        </div>
      </div>

      {/* Previous Trips */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold">Previous Trips</h3>
          <a href="/trips" className="text-sm text-primary hover:underline">View all</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <TripCard 
            title="Summer in Paris" 
            location="Paris, France" 
            dateRange="Jul 12 - Jul 18, 2025" 
            status="upcoming" 
          />
          <TripCard 
            title="Tokyo Adventure" 
            location="Tokyo, Japan" 
            dateRange="Oct 05 - Oct 15, 2024" 
            status="completed" 
          />
          <TripCard 
            title="New York Weekend" 
            location="New York, USA" 
            dateRange="Dec 20 - Dec 23, 2024" 
            status="completed" 
          />
          
          {/* Plan a trip card */}
          <div className="h-full min-h-[220px]">
            <a href="/trips/create" className="block h-full">
              <div className="h-full rounded-xl border border-dashed border-border bg-transparent flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-muted-foreground transition-all cursor-pointer">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="font-medium">Plan a trip</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
