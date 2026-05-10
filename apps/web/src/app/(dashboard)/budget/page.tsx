"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PieChart, TrendingUp, AlertCircle } from "lucide-react";
// In a real app, we'd use recharts here
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function BudgetDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Budget Overview</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500.00</div>
            <p className="text-xs text-muted-foreground mt-1">Across all planned trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,240.00</div>
            <p className="text-xs text-muted-foreground mt-1">65.9% of total budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-500">$4,260.00</div>
            <p className="text-xs text-muted-foreground mt-1">Available to allocate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            {/* Placeholder for Recharts Pie Chart */}
            <div className="w-48 h-48 rounded-full border-[16px] border-muted relative flex items-center justify-center">
               <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent rotate-45" />
               <PieChart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-8 flex gap-4 text-sm">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> Flights (45%)</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-muted" /> Hotels (30%)</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary" /> Activities (25%)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Flight to Rome", category: "Travel", amount: "-$800.00", date: "Today" },
                { name: "Colosseum Tour", category: "Activity", amount: "-$150.00", date: "Yesterday" },
                { name: "Hotel Deposit", category: "Accommodation", amount: "-$400.00", date: "May 08, 2025" },
                { name: "Travel Insurance", category: "Misc", amount: "-$120.00", date: "May 05, 2025" },
              ].map((expense, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div>
                    <p className="font-medium">{expense.name}</p>
                    <p className="text-xs text-muted-foreground">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="font-medium text-destructive">{expense.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
