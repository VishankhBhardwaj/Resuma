import { Calendar, Home, Inbox, Search, Settings,FileScan,BriefcaseBusiness } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Interview Prep", url: "/dashboard/interviewprep", icon: Inbox },
  { title: "Analyze Resume", url: "/dashboard/analyzeresumes", icon: FileScan },
  { title: "My Portfolios", url: "/dashboard/myportfolios", icon: Search },
  { title: "Create Portfolio", url: "/dashboard/createportfolio", icon: Settings },
  { title: "Settings", url: "/dashboard/settings", icon: BriefcaseBusiness },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`
                          flex items-center gap-4 p-3 rounded-md transition h-[60px]
                          ${isActive ? "bg-[#eff6ff] border border-blue-200 text-[#1c398e]" : "text-gray-700"}
                        `}
                      >
                        <item.icon
                          className={`h-7 w-5 ${
                            isActive ? "text-[#1c398e]" : "text-gray-600"
                          }`}
                        />
                        <span
                          className={`text-base ${
                            isActive ? "font-semibold text-[#1c398e]" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
