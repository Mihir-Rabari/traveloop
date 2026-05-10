"use client";

import { motion } from "framer-motion";
import { 
  Receipt, CreditCard, DollarSign, ArrowUpRight, TrendingDown, 
  MapPin, Download, Bed, Plane, AlertCircle, FileText, CheckCircle2,
  Users, Calendar, Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useBudgets } from "@/api/hooks/use-budgets";

export default function ExpenseInvoicePage() {
  const params = useParams();
  const tripId = params.id as string;
  const { useBudgetQuery } = useBudgets(tripId);
  const { data: budgetResponse, isLoading } = useBudgetQuery();

  const budgetData = (budgetResponse as any)?.data || {};
  const expenses = budgetData.expenses || [];
  const total = budgetData.totalExpenses || 0;
  const budget = budgetData.budget?.amount || 0;
  const remaining = budgetData.remaining || 0;

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
        <p className="text-2xl font-black text-primary">Calculating your adventure costs...</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Receipt className="h-8 w-8" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Billing & Invoices</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">Expense Invoice</h1>
          <p className="text-lg text-muted-foreground font-medium">Detailed breakdown of your adventure spending.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Button variant="outline" className="rounded-full h-14 px-8 font-black border-2 border-primary/10">
              Filter
            </Button>
          </div>
          <Button variant="outline" className="rounded-full h-14 px-8 font-black border-2 border-primary/10">
            Sort #
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
        {/* Main Invoice Card */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="rounded-[3.5rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <CardContent className="p-10 space-y-12">
              {/* Invoice Header Details */}
              <div className="flex flex-col md:flex-row justify-between items-start border-b border-primary/5 pb-10 gap-10">
                <div className="flex gap-8 items-start">
                  <div className="h-32 w-32 bg-primary/10 rounded-[2rem] flex items-center justify-center border-2 border-primary/5 shadow-inner">
                    <MapPin className="h-14 w-14 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black tracking-tight text-foreground">Trip to Europe Adventure</h2>
                    <div className="flex flex-col gap-1 text-sm font-bold text-muted-foreground">
                       <span>Aug 05 - Aug 25, 2025 • 21 days</span>
                       <span>Created by Divyang</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div className="space-y-1">
                    <p className="font-black text-primary uppercase tracking-widest text-[10px]">Invoice ID</p>
                    <p className="font-bold text-foreground">INV-SYS-85240</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-primary uppercase tracking-widest text-[10px]">Generated Date</p>
                    <p className="font-bold text-foreground">May 20, 2025</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-primary uppercase tracking-widest text-[10px]">Traveler Details</p>
                    <p className="font-bold text-foreground leading-tight">James, Arjun, Jerry, Kristina</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-primary uppercase tracking-widest text-[10px]">Payment Status</p>
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/10">
                      Pending
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Table */}
              <div className="overflow-hidden rounded-[2.5rem] border-4 border-primary/5 bg-background/30 backdrop-blur-md">
                <table className="w-full text-left">
                  <thead className="bg-primary/5">
                    <tr>
                      <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest w-16">#</th>
                      <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Category</th>
                      <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Description</th>
                      <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-center">Qty/Details</th>
                      <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-right">Unit Cost</th>
                      <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {expenses.map((row: any, i: number) => {
                      const Icon = row.category === 'Accommodation' ? Bed : row.category === 'Travel' ? Plane : DollarSign;
                      return (
                        <tr key={row.id} className="hover:bg-primary/5 transition-colors group/row">
                          <td className="px-6 py-6 text-sm font-black text-muted-foreground">{i + 1}</td>
                          <td className="px-6 py-6">
                             <div className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/5`}>
                                <Icon size={12} />
                                {row.category}
                             </div>
                          </td>
                          <td className="px-6 py-6 font-bold text-foreground">{row.description}</td>
                          <td className="px-6 py-6 text-center text-sm font-medium text-muted-foreground">1</td>
                          <td className="px-6 py-6 text-right font-bold text-muted-foreground">${row.amount}</td>
                          <td className="px-6 py-6 text-right font-black text-lg text-foreground">${row.amount}</td>
                        </tr>
                      );
                    })}
                    {/* Fill empty rows to match mockup style if less than 5 items */}
                    {expenses.length < 5 && [1, 2, 3, 4, 5].slice(expenses.length).map(i => (
                      <tr key={`empty-${i}`} className="h-20 opacity-20">
                        <td colSpan={6} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex flex-col md:flex-row justify-end items-end pt-10 border-t border-primary/5 gap-8">
                <div className="w-full md:w-80 space-y-4">
                  <div className="flex justify-between items-center text-muted-foreground font-black text-sm uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-foreground">$ {total}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground font-black text-sm uppercase tracking-widest">
                    <span>Tax (0%)</span>
                    <span className="text-foreground">$ 0</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground font-black text-sm uppercase tracking-widest">
                    <span>Discount</span>
                    <span className="text-foreground">$ 0</span>
                  </div>
                  <div className="h-1 w-full bg-primary/5 rounded-full" />
                  <div className="flex justify-between items-center text-foreground font-black text-3xl tracking-tighter">
                    <span>Grand Total</span>
                    <span className="text-primary">$ {total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-6 px-4">
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full h-14 px-10 font-black border-4 border-primary/10 shadow-xl text-lg">
                Download Invoice
              </Button>
              <Button variant="outline" className="rounded-full h-14 px-10 font-black border-4 border-primary/10 shadow-xl text-lg">
                Export as PDF
              </Button>
            </div>
            <Button className="rounded-full h-14 px-12 font-black shadow-2xl text-lg bg-foreground text-background hover:bg-foreground/90">
              Mark as paid
            </Button>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-10">
          <Card className="rounded-[3rem] border-4 border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl p-10 space-y-10">
            <h3 className="text-2xl font-black tracking-tight">Budget Insights</h3>
            <div className="flex items-center justify-center relative">
               <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="15" className="text-primary/10" />
                 <circle 
                   cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="15" 
                   strokeDasharray="251.2" 
                   strokeDashoffset={251.2 - (251.2 * Math.min(total / (budget || 1), 1))} 
                   className="text-primary"
                   strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <DollarSign size={32} className="text-primary mb-1" />
                 <span className="text-sm font-black text-muted-foreground uppercase tracking-widest">Pulse</span>
               </div>
            </div>
            <div className="space-y-6">
              {[
                { label: "Total Budget", val: budget, color: "text-muted-foreground" },
                { label: "Total Spent", val: total, color: "text-foreground" },
                { label: "Remaining", val: remaining, color: remaining < 0 ? "text-destructive" : "text-green-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between font-black text-sm uppercase tracking-widest">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className={item.color}>$ {item.val}</span>
                </div>
              ))}
            </div>
            <Button variant="default" className="w-full h-16 rounded-full font-black text-xl shadow-2xl bg-primary text-primary-foreground">
              View Full Budget
            </Button>
          </Card>

          <Card className="rounded-[3rem] border-4 border-primary/10 bg-primary text-primary-foreground p-10 space-y-6 shadow-2xl relative overflow-hidden">
             <div className="absolute -bottom-10 -left-10 opacity-20">
               <Receipt size={150} />
             </div>
             <h3 className="text-2xl font-black tracking-tight">Quick Tip</h3>
             <p className="font-bold opacity-90 leading-relaxed text-lg">
               You are currently 10% over your allocated budget for this trip. Consider reviewing your upcoming activity costs.
             </p>
             <Button variant="outline" className="w-full h-14 rounded-full font-black border-2 border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all text-lg">
                View Advice
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
