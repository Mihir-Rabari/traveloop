"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, CheckSquare } from "lucide-react";

export default function ChecklistPage() {
  const [categories, setCategories] = useState([
    {
      id: "1",
      title: "Clothing",
      items: [
        { id: "c1", label: "T-Shirts (x5)", checked: true },
        { id: "c2", label: "Jeans (x2)", checked: false },
        { id: "c3", label: "Jacket", checked: false },
      ]
    },
    {
      id: "2",
      title: "Electronics",
      items: [
        { id: "e1", label: "Phone Charger", checked: true },
        { id: "e2", label: "Laptop & Charger", checked: true },
        { id: "e3", label: "Power Bank", checked: false },
        { id: "e4", label: "Universal Adapter", checked: false },
      ]
    },
    {
      id: "3",
      title: "Documents",
      items: [
        { id: "d1", label: "Passport", checked: false },
        { id: "d2", label: "Visa Copies", checked: false },
        { id: "d3", label: "Travel Insurance", checked: false },
      ]
    }
  ]);

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return category;
    }));
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedItems = categories.reduce((sum, cat) => sum + cat.items.filter(i => i.checked).length, 0);
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <a href="/trips" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" />
            back to My Trips
          </a>
          <h1 className="text-3xl font-bold tracking-tight">Packing Checklist</h1>
        </div>
        <Button>
          <CheckSquare className="mr-2 h-4 w-4" />
          Templates
        </Button>
      </div>

      <Card className="bg-primary/5 border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Packing Progress</span>
                <span>{progress}% ({checkedItems}/{totalItems})</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <div className="bg-muted/30 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold">{category.title}</h3>
              <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-full">
                {category.items.filter(i => i.checked).length} / {category.items.length}
              </span>
            </div>
            <CardContent className="p-4 space-y-3">
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(category.id, item.id)}
                  />
                  <label
                    htmlFor={item.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${item.checked ? 'text-muted-foreground line-through' : ''}`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
              <div className="pt-2 flex gap-2">
                <Input placeholder="Add new item..." className="h-8 text-sm" />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button variant="outline" className="h-[200px] border-dashed text-muted-foreground hover:text-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}
