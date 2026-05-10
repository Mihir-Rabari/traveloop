"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, 
  Plus, Filter, Download, MoreHorizontal, PieChart as PieIcon,
  CreditCard, DollarSign, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from "recharts";
import { useBudget } from "@/api/hooks/use-budget";
import { useTrips } from "@/api/hooks/use-trips";
import { format } from "date-fns";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5"];

export default function BudgetPage() {
  const { useBudgetsQuery } = useBudget();
  const { data: budgetsResponse, isLoading } = useBudgetsQuery();
  const budgets = (budgetsResponse as any)?.data || [];

  // Mock data for initial UI - would be replaced by actual trip-specific data
  const categoryData = [
    { name: "Flights", value: 1200 },
    { name: "Hotels", value: 850 },
    { name: "Food", value: 450 },
    { name: "Activities", value: 300 },
    { name: "Shopping", value: 200 },
  ];

  const recentExpenses = [
    { id: 1, title: "Lufthansa Flight to Berlin", amount: 450, category: "Transport", date: "2024-05-10" },
    { id: 2, title: "Hotel Adlon Kempinski", amount: 850, category: "Stay", date: "2024-05-09" },
    { id: 3, title: "Italian Dinner at Trattoria", amount: 65, category: "Meals", date: "2024-05-08" },
    { id: 4, title: "Museum Island Pass", amount: 35, category: "Activities", date: "2024-05-08" },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Financial Tracker</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">Trip Budgeting</h1>
          <p className="text-base text-muted-foreground font-medium max-w-lg">
            Keep your adventures affordable. Track every expense and stay within your limits.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full h-12 px-6 font-black border-2 border-primary/10 hover:bg-primary/5 text-sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="rounded-full h-12 px-6 font-black shadow-xl shadow-primary/20 flex items-center gap-2 text-sm">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {[
          { label: "Total Budget", value: "$5,000", change: "+12%", icon: DollarSign, color: "primary" },
          { label: "Spent So Far", value: "$2,850", change: "-5%", icon: CreditCard, color: "secondary" },
          { label: "Remaining", value: "$2,150", change: "Safe", icon: TrendingUp, color: "green" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-[2rem] border-2 border-primary/5 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-6 md:p-8 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 text-[9px] font-black text-green-500 uppercase tracking-widest">
                    <ArrowUpRight size={10} />
                    {stat.change}
                  </div>
                </div>
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        <Card className="rounded-[2.5rem] border-2 border-primary/5 bg-white/40 backdrop-blur-md shadow-xl overflow-hidden">
          <CardHeader className="p-8 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <PieIcon className="text-primary h-5 w-5" />
              Category Breakdown
            </CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <MoreHorizontal size={16} />
            </Button>
          </CardHeader>
          <CardContent className="p-8 pt-0 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    padding: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-2 border-primary/5 bg-white/40 backdrop-blur-md shadow-xl overflow-hidden">
          <CardHeader className="p-8 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <Calendar className="text-secondary h-5 w-5" />
              Spending Trend
            </CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Filter size={16} />
            </Button>
          </CardHeader>
          <CardContent className="p-8 pt-0 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentExpenses}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700 }} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    padding: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <section className="px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black tracking-tight">Recent Transactions</h2>
          <Button variant="link" className="font-bold text-primary text-sm">View all</Button>
        </div>
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <motion.div
              key={expense.id}
              whileHover={{ scale: 1.01, x: 8 }}
              className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md rounded-[1.5rem] border-2 border-primary/5 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-foreground">{expense.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{expense.category} • {expense.date}</p>
                </div>
              </div>
              <p className="text-lg font-black text-foreground">-${expense.amount}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
