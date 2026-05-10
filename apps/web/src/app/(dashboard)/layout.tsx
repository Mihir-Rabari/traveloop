import { DashboardLayout } from "@/layouts/dashboard-layout";
import React from "react";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
