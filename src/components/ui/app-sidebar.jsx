import { Calendar, Home, Inbox, Search, Settings, FileScan, BriefcaseBusiness, Layers } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Dropbox } from "@/components/ui/Dropbox"

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
  const router = useRouter();
  const handleClick = () => {
    router.push("/")
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl text-black font-bold mb-4 cursor-pointer" onClick={handleClick}>
            <div className="w-7 h-7 mr-4">
              <Layers className="w-full h-full" />
            </div>Application</SidebarGroupLabel>

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
                          className={`h-7 w-5 ${isActive ? "text-[#1c398e]" : "text-gray-600"
                            }`}
                        />
                        <span
                          className={`text-base ${isActive ? "font-semibold text-[#1c398e]" : ""
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
      <SidebarFooter>
        <div className="flex flex-row  w-full justify-around border-t border-gray-300 p-2">
          <img data-slot="avatar-image" className="aspect-square size-full rounded-full w-10 h-10" src="https://github.com/shadcn.png"></img>
          <Dropbox />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
