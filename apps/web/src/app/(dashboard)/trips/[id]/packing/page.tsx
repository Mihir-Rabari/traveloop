"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Plus, CheckCircle2, Circle, Trash2, 
  Tag, Filter, Search, Shirt, Zap, FileText, ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { usePacking } from "@/api/hooks/use-packing";
import { toast } from "sonner";

const CATEGORIES = [
  { name: "Clothing", icon: Shirt, color: "text-blue-500" },
  { name: "Electronics", icon: Zap, color: "text-yellow-500" },
  { name: "Documents", icon: FileText, color: "text-green-500" },
  { name: "Others", icon: ShoppingBag, color: "text-purple-500" },
];

export default function PackingPage() {
  const { id: tripId } = useParams() as { id: string };
  const { usePackingQuery, useAddItemMutation, useToggleItemMutation, useDeleteItemMutation } = usePacking(tripId);
  
  const { data: packingResponse, isLoading } = usePackingQuery();
  const addItemMutation = useAddItemMutation();
  const toggleItemMutation = useToggleItemMutation();
  const deleteItemMutation = useDeleteItemMutation();

  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Others");

  const checklist = (packingResponse as any)?.data || [];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addItemMutation.mutate({ name: newItemName, category: selectedCategory }, {
      onSuccess: () => {
        setNewItemName("");
        toast.success("Item added to your bag!");
      }
    });
  };

  const handleToggle = (itemId: string) => {
    toggleItemMutation.mutate(itemId);
  };

  const handleDelete = (itemId: string) => {
    deleteItemMutation.mutate(itemId, {
      onSuccess: () => toast.error("Item removed")
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <div className="p-3 bg-secondary/10 rounded-2xl">
              <Briefcase className="h-8 w-8" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em]">Preparation</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-foreground">Packing List</h1>
          <p className="text-xl text-muted-foreground font-medium">
            Don't leave anything behind. Tick off your essentials as you pack.
          </p>
        </div>
      </div>

      {/* Add Item Form */}
      <Card className="rounded-[3rem] border-4 border-primary/5 bg-white/60 backdrop-blur-xl shadow-2xl p-4">
        <form onSubmit={handleAddItem} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="What do you need to pack?" 
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="h-16 pl-16 pr-8 rounded-full border-none bg-background/50 focus:bg-background transition-all text-lg font-bold"
            />
          </div>
          <div className="flex gap-2 p-2 bg-background/50 rounded-full overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black transition-all ${
                  selectedCategory === cat.name 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                <cat.icon size={16} />
                {cat.name}
              </button>
            ))}
          </div>
          <Button type="submit" className="h-16 px-10 rounded-full font-black text-lg shadow-xl shrink-0">
            <Plus className="mr-2 h-6 w-6" />
            Add
          </Button>
        </form>
      </Card>

      {/* Checklist Grid */}
      <div className="space-y-8 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight">Your Items</h2>
          <div className="flex items-center gap-2 text-primary font-black">
            <CheckCircle2 className="h-5 w-5" />
            {checklist.filter((i: any) => i.isCompleted).length} / {checklist.length} Packed
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {checklist.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group flex items-center justify-between p-6 rounded-[2.5rem] border-4 transition-all ${
                  item.isCompleted 
                    ? "bg-primary/5 border-primary/20 opacity-60" 
                    : "bg-white/80 border-primary/5 shadow-md hover:shadow-xl hover:border-primary/20"
                }`}
              >
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleToggle(item.id)}
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
                      item.isCompleted ? "bg-primary text-white" : "bg-muted hover:bg-primary/20"
                    }`}
                  >
                    {item.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div>
                    <p className={`text-xl font-black ${item.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={20} />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>

          {checklist.length === 0 && (
            <div className="text-center py-20 bg-primary/5 rounded-[3.5rem] border-4 border-dashed border-primary/10">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-black text-foreground">Nothing to pack yet?</h3>
              <p className="text-muted-foreground font-medium mt-2">Start adding items to your list above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
