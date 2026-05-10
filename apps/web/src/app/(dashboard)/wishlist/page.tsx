"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, MapPin, Search, Plus, Map, 
  Sparkles, Calendar, Trash2, ArrowUpRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WishlistItem {
  id: string;
  name: string;
  location: string;
  image: string;
  reason: string;
}

export default function WishlistPage() {
  const router = useRouter();
  const [items, setItems] = useState<WishlistItem[]>([
    { 
      id: "1", 
      name: "Santorini", 
      location: "Greece", 
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
      reason: "Iconic blue domes and sunset views." 
    },
    { 
      id: "2", 
      name: "Kyoto", 
      location: "Japan", 
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
      reason: "Breathtaking temples and autumn colors." 
    },
    { 
      id: "3", 
      name: "Bora Bora", 
      location: "French Polynesia", 
      image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?q=80&w=800&auto=format&fit=crop",
      reason: "Overwater bungalows and crystal clear water." 
    },
  ]);

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Heart className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Bucket List</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">Dream Destinations</h1>
          <p className="text-base text-muted-foreground font-medium">Places you'll visit one day, soon.</p>
        </div>
        <Button 
          className="rounded-full h-12 px-8 font-black shadow-xl shadow-primary/20 flex items-center gap-2"
          onClick={() => router.push('/explore')}
        >
          <Plus className="h-5 w-5" />
          Explore More
        </Button>
      </div>

      {/* Grid of Dreams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] border-2 border-primary/5 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(item.id)}
                      className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-red-500 hover:text-white transition-all border border-white/20"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={12} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{item.location}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{item.name}</h3>
                  </div>
                </div>
                <CardContent className="p-8 space-y-4">
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    "{item.reason}"
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-2xl h-12 border-2 border-primary/5 font-black hover:bg-primary hover:text-white transition-all group/btn"
                    onClick={() => router.push(`/trips/create?destination=${encodeURIComponent(item.name)}`)}
                  >
                    Start Planning
                    <ArrowUpRight size={16} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State / Add Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="rounded-[2.5rem] border-4 border-dashed border-primary/10 flex flex-col items-center justify-center p-12 text-primary/40 hover:text-primary hover:border-primary/30 transition-all bg-primary/5 min-h-[400px]"
        >
          <div className="h-20 w-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-6">
            <Plus size={40} />
          </div>
          <span className="text-xl font-black tracking-tight">Add New Dream</span>
          <span className="text-xs font-bold mt-2">The world is waiting for you.</span>
        </motion.button>
      </div>
    </div>
  );
}
