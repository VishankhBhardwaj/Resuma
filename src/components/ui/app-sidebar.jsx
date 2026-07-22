"use client";

import {
  Home,
  FileScan,
  BriefcaseBusiness,
  Layers,
  Settings,
  PlusCircle,
  FolderKanban,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Dropbox } from "@/components/ui/Dropbox";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Interview Prep", url: "/dashboard/interviewprep", icon: BriefcaseBusiness },
  { title: "Voice Interview", url: "/dashboard/voiceprep", icon: Phone },
  { title: "Analyze Resume", url: "/dashboard/analyzeresumes", icon: FileScan },
  { title: "My Portfolios", url: "/dashboard/myportfolios", icon: FolderKanban },
  { title: "Create Portfolio", url: "/dashboard/createportfolio", icon: PlusCircle },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar className="border-r border-slate-200/80 text-slate-900 [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-slate-200/80 [&_[data-sidebar=sidebar]]:bg-white/90 [&_[data-sidebar=sidebar]]:backdrop-blur-xl">
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel
            className="mb-4 cursor-pointer gap-3 text-lg font-bold text-slate-900 transition-colors hover:text-cyan-600"
            style={{ fontFamily: "Orbitron, sans-serif" }}
            onClick={() => router.push("/")}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                <Layers className="h-4 w-4 text-cyan-600" />
              </div>
            </div>
            Resuma
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`
                          flex h-[52px] items-center gap-3 rounded-xl px-3 transition-all duration-300
                          ${
                            isActive
                              ? "border border-cyan-200 bg-gradient-to-r from-cyan-50 via-purple-50 to-transparent text-cyan-800 shadow-sm"
                              : "border border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                          }
                        `}
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive ? "text-cyan-600" : "text-slate-400"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isActive ? "font-semibold text-cyan-800" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/80 bg-transparent">
        <div className="flex w-full items-center justify-around gap-2 p-2">
          <img
            alt="User avatar"
            data-slot="avatar-image"
            className="aspect-square size-10 rounded-full ring-2 ring-cyan-200"
            src="https://github.com/shadcn.png"
          />
          <Dropbox />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
