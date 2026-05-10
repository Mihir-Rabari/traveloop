"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Plus, Save, Trash2, Calendar, 
  StickyNote, Bookmark, Edit3, MoreVertical, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useNotes } from "@/api/hooks/use-notes";
import { toast } from "sonner";

export default function NotesPage() {
  const { id: tripId } = useParams() as { id: string };
  const { useNotesQuery, useCreateNoteMutation, useUpdateNoteMutation } = useNotes(tripId);
  
  const { data: notesResponse, isLoading } = useNotesQuery();
  const createNoteMutation = useCreateNoteMutation();
  const updateNoteMutation = useUpdateNoteMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const notes = (notesResponse as any)?.data || [];

  const handleSave = () => {
    if (!newNote.title.trim()) return;

    if (editingId) {
      updateNoteMutation.mutate({ id: editingId, data: newNote }, {
        onSuccess: () => {
          setEditingId(null);
          setNewNote({ title: "", content: "" });
          toast.success("Note updated!");
        }
      });
    } else {
      createNoteMutation.mutate(newNote, {
        onSuccess: () => {
          setIsAdding(false);
          setNewNote({ title: "", content: "" });
          toast.success("Note saved!");
        }
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-pink-500">
            <div className="p-3 bg-pink-500/10 rounded-2xl">
              <MessageSquare className="h-8 w-8" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em]">Journal & Records</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-foreground">Trip Notes</h1>
          <p className="text-xl text-muted-foreground font-medium">
            Capture every moment, memory, and important detail of your journey.
          </p>
        </div>
        <Button 
          onClick={() => setIsAdding(true)}
          className="rounded-full h-16 px-10 font-black text-lg shadow-2xl shadow-primary/20 flex items-center gap-2"
        >
          <Plus size={24} />
          New Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Note Editor Overlay/Section */}
        <AnimatePresence>
          {(isAdding || editingId) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="lg:col-span-1"
            >
              <Card className="rounded-[3rem] border-4 border-primary/5 bg-white/80 backdrop-blur-xl shadow-2xl p-10 space-y-8 sticky top-32">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">{editingId ? "Edit Note" : "Quick Note"}</h3>
                  <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); setEditingId(null); }} className="rounded-full">
                    <Trash2 size={20} className="text-muted-foreground" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Heading</label>
                    <input 
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Give it a title..."
                      className="w-full bg-transparent border-b-4 border-primary/10 focus:border-primary outline-none py-2 text-xl font-black transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Content</label>
                    <textarea 
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Write your thoughts here..."
                      rows={8}
                      className="w-full bg-primary/5 rounded-[2rem] p-6 outline-none focus:bg-primary/10 transition-all font-medium text-lg resize-none"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSave}
                  className="w-full h-16 rounded-[2rem] font-black text-lg shadow-xl"
                  disabled={!newNote.title.trim() || !newNote.content.trim()}
                >
                  <Save className="mr-2 h-6 w-6" />
                  Save Note
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Grid */}
        <div className={cn(
          "grid gap-8",
          (isAdding || editingId) ? "lg:col-span-2 grid-cols-1" : "lg:col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {notes.map((note: any) => (
            <motion.div
              key={note.id}
              layout
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => {
                setEditingId(note.id);
                setNewNote({ title: note.title, content: note.content });
              }}
            >
              <Card className="h-full rounded-[3rem] border-4 border-primary/5 bg-white/40 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/5 rounded-2xl text-primary">
                      <StickyNote size={24} />
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-muted-foreground font-medium line-clamp-4 leading-relaxed">
                    {note.content}
                  </p>
                </div>
                
                <div className="pt-8 flex items-center justify-between border-t border-primary/5 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Saved</span>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <Edit3 size={18} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}

          {notes.length === 0 && !isAdding && (
            <div className="lg:col-span-3 text-center py-32 bg-white/40 backdrop-blur-md rounded-[4rem] border-4 border-dashed border-primary/10">
              <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-8 text-primary/40">
                <Bookmark size={48} />
              </div>
              <h3 className="text-3xl font-black text-foreground">Your travel diary is empty</h3>
              <p className="text-xl text-muted-foreground font-medium mt-4 max-w-md mx-auto">
                Start recording your journey. Every memory is worth saving.
              </p>
              <Button 
                onClick={() => setIsAdding(true)}
                variant="outline" 
                className="mt-10 rounded-full h-14 px-10 font-black border-2 border-primary/20"
              >
                Create First Entry
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
