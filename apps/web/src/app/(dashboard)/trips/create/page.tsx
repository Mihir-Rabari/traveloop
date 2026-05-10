"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Plus, Save } from "lucide-react";

export default function CreateTripPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plan a new trip</h1>
          <p className="text-sm text-muted-foreground mt-1">Fill in the details below to get started</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Trip
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="trip-name">Trip Name</Label>
              <Input id="trip-name" placeholder="e.g. Summer in Europe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary-destination">Primary Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="primary-destination" placeholder="Select a place" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="start-date" type="date" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="end-date" type="date" className="pl-9" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Suggestions for Places to Visit / Activities</h2>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Custom
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Suggestion Cards based on Screen 4 wireframe */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden group cursor-pointer hover:border-primary transition-all">
              <div className="h-32 bg-muted/50 w-full relative">
                 <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                 {/* Placeholder for image */}
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm">Suggested Place {i + 1}</h3>
                <p className="text-xs text-muted-foreground mt-1">Brief description of the place.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
