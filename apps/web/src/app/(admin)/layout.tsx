import { DashboardLayout } from "@/layouts/dashboard-layout";
import React from "react";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  // We can reuse DashboardLayout, maybe pass a prop for admin sidebar or just use the same.
  return <DashboardLayout>{children}</DashboardLayout>;
}
