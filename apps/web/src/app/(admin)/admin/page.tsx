"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plane, DollarSign, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="col-span-1 min-h-[300px]">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">U{i}</div>
                      <div className="text-sm">User {i}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Just now</div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 min-h-[300px]">
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent>
             {/* Simple bar chart mock */}
             <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm"><span>Paris, France</span><span>845 trips</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full w-[85%]"></div></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm"><span>Tokyo, Japan</span><span>650 trips</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full w-[65%]"></div></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm"><span>Rome, Italy</span><span>520 trips</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full w-[52%]"></div></div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
