"use client";

import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Layout({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-background text-foreground overflow-x-hidden min-h-screen overflow-y-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}