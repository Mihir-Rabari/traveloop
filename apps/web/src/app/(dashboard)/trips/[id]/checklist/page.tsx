"use client";

import { React } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, CheckSquare } from "lucide-react";

import { useParams } from "next/navigation";
import { usePacking } from "@/api/hooks/use-packing";
import { motion } from "framer-motion";
import { Package, Laptop, Shirt, FileText, CheckCircle2, Loader2 } from "lucide-react";

export default function ChecklistPage() {
  const params = useParams();
  const tripId = params.id as string;
  
  const { 
    usePackingQuery, 
    useToggleItemMutation, 
    useAddItemMutation 
  } = usePacking(tripId);

  const { data: packingResponse, isLoading } = usePackingQuery();
  const toggleMutation = useToggleItemMutation();

  const categories = (packingResponse as any)?.data || [];

  const toggleItem = (itemId: string) => {
    toggleMutation.mutate(itemId);
  };

  const totalItems = categories.reduce((sum: number, cat: any) => sum + (cat.items?.length || 0), 0);
  const checkedItems = categories.reduce((sum: number, cat: any) => sum + (cat.items?.filter((i: any) => i.isPacked).length || 0), 0);
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('tech') || t.includes('electronic')) return Laptop;
    if (t.includes('clothes') || t.includes('wear')) return Shirt;
    if (t.includes('document')) return FileText;
    return Package;
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
        <p className="text-2xl font-black text-primary">Loading your essentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Package className="h-8 w-8" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Packing List</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">Essentials</h1>
          <p className="text-lg text-muted-foreground font-medium">Don't leave the important stuff behind.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full h-14 px-8 font-black border-2 border-primary/10">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Templates
          </Button>
        </div>
      </div>

      {/* High Fidelity Progress Card */}
      <Card className="rounded-[3rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl p-10 px-4 mx-4">
        <CardContent className="p-0 space-y-6">
          <div className="flex justify-between items-end">
            <div className="text-2xl font-black text-foreground">Packing Status</div>
            <div className="text-3xl font-black text-primary">{progress}%</div>
          </div>
          <div className="h-8 w-full bg-primary/5 rounded-full border-2 border-primary/10 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary shadow-[0_0_20px_rgba(253,212,108,0.5)] rounded-full" 
            />
          </div>
          <p className="text-center text-muted-foreground font-bold">{checkedItems} items packed out of {totalItems}</p>
        </CardContent>
      </Card>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
        {categories.map((category) => (
          <Card key={category.id} className="rounded-[2.5rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="p-8 pb-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/5">
                  {(() => { const Icon = getIcon(category.title); return <Icon size={24} />; })()}
                </div>
                <h3 className="text-2xl font-black tracking-tight">{category.title}</h3>
              </div>
              <span className="text-xs font-black text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-widest border border-primary/5">
                {category.items?.filter((i: any) => i.isPacked).length || 0} / {category.items?.length || 0}
              </span>
            </div>
            <CardContent className="p-8 pt-4 space-y-4">
              <div className="space-y-3">
                {(category.items || []).map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 group/item">
                    <Checkbox 
                      id={item.id} 
                      checked={item.isPacked}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="w-6 h-6 rounded-lg border-2 border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={item.id}
                      className={`text-lg font-bold leading-none cursor-pointer transition-all ${item.isPacked ? 'text-muted-foreground line-through opacity-50' : 'text-foreground hover:text-primary'}`}
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
              </div>
              <div className="pt-6 flex gap-4">
                <Input 
                  placeholder="Pack something else..." 
                  className="h-12 rounded-full border-2 border-primary/5 bg-background/50 focus:border-primary/20 font-bold" 
                />
                <Button className="h-12 w-12 rounded-full p-0 shrink-0 shadow-lg">
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Category Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-auto min-h-[300px] rounded-[2.5rem] border-4 border-dashed border-primary/10 bg-card/40 flex flex-col items-center justify-center text-primary hover:bg-primary/5 hover:border-primary/30 transition-all shadow-xl group"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <span className="text-xl font-black">Add Category</span>
        </motion.button>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
        <Button variant="outline" className="rounded-full h-16 px-10 font-black border-4 border-primary/10 hover:bg-primary/5 transition-all text-lg">
          Reset All Items
        </Button>
        <Button className="rounded-full h-16 px-12 font-black shadow-2xl text-lg group">
          <CheckSquare className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
          Share Checklist
        </Button>
      </div>
    </div>
  );
}
