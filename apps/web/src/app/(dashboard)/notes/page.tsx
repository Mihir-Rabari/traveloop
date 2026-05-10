"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Plus, Search, StickyNote, 
  Clock, Trash2, Edit3, MoreVertical, 
  MapPin, Calendar, Star, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  color: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: "1", 
      title: "Berlin Restaurant Ideas", 
      content: "Must try Mustafas Gemuse Kebap and find a good Schnitzel place in Kreuzberg.", 
      date: "2h ago",
      tags: ["Food", "Berlin"],
      color: "bg-orange-500/10 border-orange-500/20"
    },
    { 
      id: "2", 
      title: "Packing Strategy", 
      content: "Roll clothes instead of folding. Don't forget the universal adapter and physical map.", 
      date: "Yesterday",
      tags: ["Tips"],
      color: "bg-blue-500/10 border-blue-500/20"
    },
    { 
      id: "3", 
      title: "Photography Spots", 
      content: "Golden hour at the Brandenburg Gate. Check if tripods are allowed inside the Dome.", 
      date: "3 days ago",
      tags: ["Photo", "Berlin"],
      color: "bg-purple-500/10 border-purple-500/20"
    },
  ]);

  const removeNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 bg-primary/10 rounded-xl">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Thoughts</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">Travel Notes</h1>
          <p className="text-base text-muted-foreground font-medium">Capture every spark of inspiration for your next trip.</p>
        </div>
        <Button className="rounded-full h-12 px-8 font-black shadow-xl shadow-primary/20 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Note
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search your notes..." 
            className="h-11 pl-10 pr-4 rounded-full border-2 border-primary/5 bg-white/60 focus:border-primary/20 transition-all text-sm font-bold"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {["All", "Personal", "Trips", "Ideas"].map((filter) => (
            <button key={filter} className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/60 border-2 border-primary/5 hover:bg-primary hover:text-white transition-all whitespace-nowrap">
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={cn(
                "rounded-[2rem] border-2 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group",
                note.color
              )}>
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-xl bg-white/80 flex items-center justify-center text-foreground shadow-sm">
                      <StickyNote size={20} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit3 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeNote(note.id)} className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-black tracking-tight text-foreground">{note.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed line-clamp-4">
                      {note.content}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{note.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {note.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white/50 text-[8px] font-black uppercase tracking-tighter">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Note Button Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="rounded-[2rem] border-4 border-dashed border-primary/10 flex flex-col items-center justify-center p-12 text-primary/40 hover:text-primary hover:border-primary/30 transition-all bg-primary/5 min-h-[280px]"
        >
          <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Plus size={32} />
          </div>
          <span className="text-lg font-black tracking-tight">Create Quick Note</span>
        </motion.button>
      </div>
    </div>
  );
}
