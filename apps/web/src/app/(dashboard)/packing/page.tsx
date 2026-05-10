"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Plus, CheckCircle2, Circle, Trash2, 
  Search, Filter, Luggage, Umbrella, Camera, 
  MapPin, ShoppingBag, Laptop, Shirt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PackingItem {
  id: string;
  text: string;
  category: string;
  packed: boolean;
}

const CATEGORIES = [
  { name: "Essentials", icon: Briefcase, color: "bg-blue-500" },
  { name: "Clothing", icon: Shirt, color: "bg-orange-500" },
  { name: "Electronics", icon: Laptop, color: "bg-purple-500" },
  { name: "Toiletries", icon: Umbrella, color: "bg-teal-500" },
  { name: "Other", icon: ShoppingBag, color: "bg-gray-500" },
];

export default function PackingPage() {
  const [items, setItems] = useState<PackingItem[]>([
    { id: "1", text: "Passport & Travel Documents", category: "Essentials", packed: true },
    { id: "2", text: "Phone Charger & Power Bank", category: "Electronics", packed: false },
    { id: "3", text: "Comfortable Walking Shoes", category: "Clothing", packed: false },
    { id: "4", text: "Camera & Extra Batteries", category: "Electronics", packed: true },
    { id: "5", text: "Toothbrush & Toothpaste", category: "Toiletries", packed: false },
  ]);
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Essentials");
  const [searchQuery, setSearchQuery] = useState("");

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const item: PackingItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: newItem,
      category: selectedCategory,
      packed: false,
    };
    setItems([item, ...items]);
    setNewItem("");
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: items.length,
    packed: items.filter(i => i.packed).length,
    percent: items.length > 0 ? Math.round((items.filter(i => i.packed).length / items.length) * 100) : 0
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Luggage className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Preparation</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">Packing List</h1>
          <p className="text-base text-muted-foreground font-medium">Don't leave the important things behind.</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/60 backdrop-blur-xl p-4 rounded-[2rem] border-2 border-primary/5 shadow-xl flex items-center gap-4 min-w-[200px]">
          <div className="relative w-12 h-12 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-primary/10" />
               <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={126} strokeDashoffset={126 - (126 * stats.percent) / 100} className="text-primary transition-all duration-1000" />
             </svg>
             <span className="absolute text-[10px] font-black">{stats.percent}%</span>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Progress</p>
            <p className="text-sm font-black text-foreground">{stats.packed} / {stats.total} Packed</p>
          </div>
        </div>
      </div>

      {/* Quick Add Form */}
      <Card className="rounded-[2.5rem] border-2 border-primary/5 bg-white/40 backdrop-blur-md shadow-xl overflow-hidden p-2">
        <form onSubmit={addItem} className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Input 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="What are you bringing?"
              className="h-14 pl-6 pr-6 rounded-[1.75rem] border-none bg-transparent focus-visible:ring-0 text-lg font-bold"
            />
          </div>
          <div className="flex items-center gap-2 px-2 pb-2 md:pb-0">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-4 rounded-full bg-primary/5 border-2 border-primary/5 text-xs font-black focus:outline-none appearance-none cursor-pointer hover:bg-primary/10 transition-colors"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <Button type="submit" className="h-10 w-10 md:w-auto md:px-6 rounded-full font-black shadow-lg">
              <Plus size={18} className="md:mr-2" />
              <span className="hidden md:inline">Add Item</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Main List Area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="h-10 pl-10 pr-4 rounded-full border-2 border-primary/5 bg-white/60 focus:border-primary/20 transition-all text-xs font-bold"
            />
          </div>
          <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
            <Filter size={14} className="mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const category = CATEGORIES.find(c => c.name === item.category) || CATEGORIES[4];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-[1.75rem] border-2 transition-all duration-300",
                    item.packed 
                      ? "bg-primary/5 border-transparent opacity-60" 
                      : "bg-white/80 border-primary/5 shadow-sm hover:shadow-xl hover:border-primary/20"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                        item.packed 
                          ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30" 
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      )}
                    >
                      {item.packed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                    <div>
                      <p className={cn(
                        "text-base font-black tracking-tight transition-all",
                        item.packed && "line-through text-muted-foreground"
                      )}>
                        {item.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", category.color)} />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 rounded-full text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 size={18} />
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="h-20 w-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto text-primary/20">
                <Luggage size={40} />
              </div>
              <p className="text-xl font-black text-muted-foreground">No items found. Start packing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
