"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowDownAZ, MapPin, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const mockResults = [
  { id: 1, title: "Paragliding in Interlaken", location: "Interlaken, Switzerland", price: "$180", category: "Adventure" },
  { id: 2, title: "Colosseum Underground Tour", location: "Rome, Italy", price: "$85", category: "Culture" },
  { id: 3, title: "Sushi Making Class", location: "Tokyo, Japan", price: "$120", category: "Food" },
  { id: 4, title: "Snorkeling at Great Barrier Reef", location: "Cairns, Australia", price: "$210", category: "Nature" },
  { id: 5, title: "Louvre Museum Skip-the-line", location: "Paris, France", price: "$45", category: "Art" },
  { id: 6, title: "Desert Safari & BBQ Dinner", location: "Dubai, UAE", price: "$95", category: "Experience" },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = mockResults.filter((r) => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight w-full md:w-auto">Explore Activities</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search activities, cities..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              <div className="h-48 bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md">
                  {result.price}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2">
                  <Tag className="h-3 w-3" />
                  {result.category}
                </div>
                <h3 className="font-semibold text-lg line-clamp-1">{result.title}</h3>
                <div className="flex items-center text-muted-foreground mt-1 text-sm">
                  <MapPin className="h-3 w-3 mr-1 shrink-0" />
                  <span className="line-clamp-1">{result.location}</span>
                </div>
                <Button className="w-full mt-4" variant="secondary">Add to Trip</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No activities found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
