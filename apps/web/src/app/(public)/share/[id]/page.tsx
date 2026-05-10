"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Share2, Copy } from "lucide-react";

export default function PublicTripPage() {
  return (
    <div className="space-y-8">
      <div className="w-full h-48 md:h-64 rounded-2xl bg-muted overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop" 
          alt="Rome" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Trip to Europe Adventure</h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> Rome, Paris</span>
            <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> Aug 05 - Aug 25, 2025</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-xl border">
        <div>
          <p className="text-sm font-medium">Created by Divyang</p>
          <p className="text-xs text-muted-foreground">Shared publicly</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <Button className="flex-1 sm:flex-none"><Copy className="mr-2 h-4 w-4" /> Copy Trip</Button>
           <Button variant="outline" className="flex-1 sm:flex-none"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Itinerary Overview</h2>
        
        {/* Simple timeline read-only view */}
        <div className="space-y-4">
          <Card>
            <div className="flex border-b border-border/50 bg-muted/10 px-4 py-3">
              <span className="font-semibold text-sm">Day 1: Arrival & Hotel Check-in</span>
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex gap-4">
                <div className="text-sm font-medium text-muted-foreground w-16 shrink-0">02:00 PM</div>
                <div className="text-sm">Check in at Rome Hotel, rest and refresh.</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <div className="flex border-b border-border/50 bg-muted/10 px-4 py-3">
              <span className="font-semibold text-sm">Day 2: Colosseum & City</span>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4 border-b border-border/50 pb-4">
                <div className="text-sm font-medium text-muted-foreground w-16 shrink-0">09:30 AM</div>
                <div className="text-sm">Guided tour of Colosseum with skip-the-line tickets.</div>
              </div>
              <div className="flex gap-4">
                <div className="text-sm font-medium text-muted-foreground w-16 shrink-0">01:00 PM</div>
                <div className="text-sm">Lunch at Trattoria Da Enzo al 29.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
