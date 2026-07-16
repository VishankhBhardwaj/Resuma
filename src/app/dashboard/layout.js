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
      <main className="relative flex-1 min-h-screen overflow-x-hidden overflow-y-auto bg-[#f8fafc] text-slate-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.04)_1px,transparent_1px)] bg-size-[28px_28px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-400/15 blur-[100px]"
        />
        <div className="relative z-10">
          <SidebarTrigger className="m-3 text-slate-600 hover:bg-white hover:text-cyan-600" />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
