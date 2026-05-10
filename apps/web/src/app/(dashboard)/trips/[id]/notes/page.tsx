"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Plus, Trash2, Pin } from "lucide-react";

export default function TripNotesPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "by Day" | "by stop">("All");

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <a href="/trips" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" />
            back to My Trips
          </a>
          <h1 className="text-2xl font-bold tracking-tight">Trip notes</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search notes..." className="pl-9 h-9 w-48" />
          </div>
          <Button variant="outline" size="sm" className="h-9">Group by</Button>
          <Button variant="outline" size="sm" className="h-9">Filter</Button>
          <Button variant="outline" size="sm" className="h-9">Sort by...</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <select className="flex h-10 w-full md:w-64 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <option>Trip: Paris, & Rome Adventure</option>
          </select>
          <div className="flex items-center gap-2">
            {(["All", "by Day", "by stop"] as const).map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="h-8 rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add note
        </Button>
      </div>

      <div className="space-y-4">
        {/* Mock Notes from Screen 13 */}
        {[
          { title: "Hotel check-in details - Rome stop", desc: "check in after 2pm, room 302, breakfast included (7-10am)\nDay 2: June 14 2025" },
          { title: "Restaurant Recommendations", desc: "Trattoria Da Enzo al 29 - great pasta. Need to book in advance.\nDay 3: June 15 2025" },
          { title: "Train to Florence info", desc: "Train departs at 08:30 AM from Roma Termini. Platform 4.\nDay 5: June 17 2025" }
        ].map((note, i) => (
          <Card key={i} className="relative group overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <CardContent className="p-4 pl-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Pin className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{note.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
