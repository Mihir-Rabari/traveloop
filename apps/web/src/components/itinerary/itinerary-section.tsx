"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, ChevronDown, ChevronUp, Calendar, DollarSign, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
  type: "travel" | "hotel" | "activity";
}

export function ItinerarySection({
  section,
  index,
  onRemove,
}: {
  section: Section;
  index: number;
  onRemove: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="border-border overflow-hidden bg-card">
        {/* Header / Draggable Handle Area */}
        <div className="bg-muted/30 px-4 py-3 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing p-1 -ml-1">
              <GripVertical className="h-4 w-4" />
            </div>
            <span className="font-semibold text-sm">Section {index + 1}: {section.type.charAt(0).toUpperCase() + section.type.slice(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => onRemove(section.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Input defaultValue={section.title} placeholder="Section Title (e.g. Hotel Check-in)" className="font-medium" />
                  <textarea
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="All necessary information about this section..."
                    defaultValue={section.description}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Input defaultValue={section.dateRange} placeholder="Date Range: xxx to yyy" className="h-9 text-sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Input defaultValue={section.budget} placeholder="Budget of this section" className="h-9 text-sm" />
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
