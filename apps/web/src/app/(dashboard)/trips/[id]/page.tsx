"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ItinerarySection } from "@/components/itinerary/itinerary-section";
import { Plus, ArrowLeft, Share2, Download, Settings } from "lucide-react";
// import Link from "next/link";
import { AnimatePresence } from "framer-motion";

export default function TripDetailsPage() {
  const [sections, setSections] = useState([
    {
      id: "1",
      title: "Flight to Rome",
      description: "Flight bookings (DEL -> FCO). Includes 2 check-in bags.",
      dateRange: "Jun 14, 2025 08:00 AM",
      budget: "$800",
      type: "travel" as const,
    },
    {
      id: "2",
      title: "Hotel Check-in - Rome Stop",
      description: "Check in after 2pm, room 302, breakfast included (7-10am).",
      dateRange: "Jun 14, 2025 02:00 PM",
      budget: "$400",
      type: "hotel" as const,
    },
    {
      id: "3",
      title: "Colosseum Tour",
      description: "Guided tour with skip-the-line access.",
      dateRange: "Jun 15, 2025 09:30 AM",
      budget: "$150",
      type: "activity" as const,
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Math.random().toString(36).substring(7),
        title: "",
        description: "",
        dateRange: "",
        budget: "",
        type: "activity",
      },
    ]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      {/* Trip Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <a href="/trips" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to My Trips
          </a>
          <h1 className="text-3xl font-bold tracking-tight">Trip to Europe Adventure</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Aug 05 - Aug 25, 2025 • 4 cities • created by divyang
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden w-full h-9">
             <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Itinerary Builder Area (Screen 5) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold tracking-tight">Itinerary</h2>
        </div>

        <div className="space-y-4">
          {/* Note: Implementing full drag-and-drop requires something like dnd-kit or react-beautiful-dnd.
              For this UI structure, we prepare the layout assuming those libraries will wrap the list. */}
          <AnimatePresence>
            {sections.map((section, index) => (
              <ItinerarySection
                key={section.id}
                index={index}
                section={section}
                onRemove={removeSection}
              />
            ))}
          </AnimatePresence>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 border-dashed bg-transparent hover:bg-muted/50"
          onClick={addSection}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add another Section
        </Button>
      </div>
    </div>
  );
}
