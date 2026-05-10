"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Hash, Download, FileText, CheckCircle2 } from "lucide-react";

export default function ExpenseInvoicePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <a href="/trips" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" />
            back to My Trips
          </a>
          <h1 className="text-2xl font-bold tracking-tight">Expense Invoice / billing</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Invoices..." className="pl-9 h-9 w-48" />
          </div>
          <Button variant="outline" size="sm" className="h-9">Filter</Button>
          <Button variant="outline" size="sm" className="h-9">Sort #</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between border-b pb-6 mb-6">
              <div className="flex gap-4 items-center">
                <div className="h-20 w-20 bg-muted/50 rounded-lg flex items-center justify-center shrink-0">
                  {/* Logo Placeholder */}
                  <div className="w-10 h-10 border-4 border-primary rounded-sm opacity-50" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Trip to Europe Adventure</h2>
                  <p className="text-xs text-muted-foreground">Aug 05 - Aug 25, 2025 • 4 cities</p>
                  <p className="text-xs text-muted-foreground">created by divyang</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right md:text-left md:pl-6 md:border-l space-y-1 text-sm">
                <p><span className="text-muted-foreground">Invoice ID:</span> INV-SYS-85240</p>
                <p><span className="text-muted-foreground">Generated date:</span> May 20, 2025</p>
                <p><span className="text-muted-foreground">Payment status:</span> <span className="text-yellow-600 font-medium">Pending</span></p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-sm">Traveler Details:</h3>
              <p className="text-sm text-muted-foreground">James, Arya, Jerry, Cristina</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium text-center">Qty/details</th>
                    <th className="px-4 py-3 font-medium text-right">Unit Cost</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-b">
                  <tr className="hover:bg-muted/20">
                    <td className="px-4 py-4">1</td>
                    <td className="px-4 py-4 font-medium">hotel</td>
                    <td className="px-4 py-4">hotel booking paris</td>
                    <td className="px-4 py-4 text-center">3 nights</td>
                    <td className="px-4 py-4 text-right">2000</td>
                    <td className="px-4 py-4 text-right">6000</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="px-4 py-4">2</td>
                    <td className="px-4 py-4 font-medium">travel</td>
                    <td className="px-4 py-4">Flight bookings (DEL -{'>'} PAR)</td>
                    <td className="px-4 py-4 text-center">4</td>
                    <td className="px-4 py-4 text-right">12000</td>
                    <td className="px-4 py-4 text-right">48000</td>
                  </tr>
                  {/* Empty rows to match mockup */}
                  <tr className="h-12"><td colSpan={6}></td></tr>
                  <tr className="h-12"><td colSpan={6}></td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$54000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="font-medium">$2700</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600">-$0</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-base">Grand Total</span>
                  <span className="font-bold text-base">$56700</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Invoice</Button>
              <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Export as PDF</Button>
              <Button className="ml-auto"><CheckCircle2 className="mr-2 h-4 w-4" /> Mark as paid</Button>
            </div>
          </CardContent>
        </Card>

        {/* Budget Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-6">Budget Insights</h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full border-[10px] border-muted relative flex items-center justify-center shrink-0">
                   <div className="absolute inset-0 rounded-full border-[10px] border-primary border-t-transparent border-r-transparent rotate-45" />
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Total Budget:</span> <span className="font-medium">20000</span></p>
                  <p><span className="text-muted-foreground">Total spent:</span> <span className="font-medium">22000</span></p>
                  <p><span className="text-muted-foreground">Remaining:</span> <span className="font-medium text-destructive">-2000</span></p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6">View Full Budget</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
