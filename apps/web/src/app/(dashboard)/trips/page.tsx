"use client";

import { useState } from "react";
import { TripCard } from "@/components/cards/trip-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowDownAZ, Plus } from "lucide-react";

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "upcoming" | "completed">("ongoing");

  const trips = {
    ongoing: [
      { id: 1, title: "Summer in Paris", location: "Paris, France", dateRange: "Jul 12 - Jul 18, 2025", status: "ongoing" as const },
    ],
    upcoming: [
      { id: 2, title: "Tokyo Adventure", location: "Tokyo, Japan", dateRange: "Oct 05 - Oct 15, 2025", status: "upcoming" as const },
      { id: 3, title: "Swiss Alps Skiing", location: "Zermatt, Switzerland", dateRange: "Dec 10 - Dec 20, 2025", status: "upcoming" as const },
    ],
    completed: [
      { id: 4, title: "New York Weekend", location: "New York, USA", dateRange: "Dec 20 - Dec 23, 2024", status: "completed" as const },
      { id: 5, title: "Bali Retreat", location: "Bali, Indonesia", dateRange: "Aug 10 - Aug 24, 2024", status: "completed" as const },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Trips</h1>
        <Button onClick={() => window.location.href = '/trips/create'}>
          <Plus className="mr-2 h-4 w-4" />
          Plan a new trip
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-2 rounded-lg border">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips..." className="pl-9 h-9" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <div className="flex items-center p-1 bg-muted rounded-md shrink-0">
            {(["ongoing", "upcoming", "completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-all capitalize ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="h-9">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Render only active tab trips for now, or group them like the mockup? */}
        {/* Mockup Screen 6 shows "Ongoing", "Up-coming", "Completed" as sections. */}
        
        {trips.ongoing.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Ongoing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trips.ongoing.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          </div>
        )}

        {trips.upcoming.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-500">Upcoming</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trips.upcoming.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          </div>
        )}

        {trips.completed.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-400">Completed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trips.completed.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
