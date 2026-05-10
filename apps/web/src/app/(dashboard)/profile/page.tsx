"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Edit3 } from "lucide-react";
import { TripCard } from "@/components/cards/trip-card";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-32 h-32 rounded-full border-4 border-background shadow-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative group">
           <img src="https://i.pravatar.cc/150?u=divyang" alt="User" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
             <Edit3 className="text-white h-6 w-6" />
           </div>
        </div>
        
        <Card className="flex-1 w-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">Divyang</h1>
                <p className="text-muted-foreground text-sm">Passionate traveler and explorer</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>divyang@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>San Francisco, USA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <hr className="border-border" />

      {/* Preplanned Trips */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Preplanned Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Mock trips */}
           <TripCard title="European Summer" location="Europe" dateRange="Multiple Dates" status="upcoming" />
           <TripCard title="Asia Backpacking" location="Asia" dateRange="Flexible" status="upcoming" />
           <TripCard title="USA Roadtrip" location="USA" dateRange="Fall 2025" status="upcoming" />
        </div>
      </div>

      {/* Previous Trips */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Previous Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Mock trips */}
           <TripCard title="Bali Retreat" location="Indonesia" dateRange="Aug 2024" status="completed" />
           <TripCard title="Tokyo Week" location="Japan" dateRange="Oct 2024" status="completed" />
           <TripCard title="NYC Winter" location="USA" dateRange="Dec 2024" status="completed" />
        </div>
      </div>
    </div>
  );
}
