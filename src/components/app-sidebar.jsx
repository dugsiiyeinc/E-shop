import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartBarBig,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PackageCheck,
  PieChart,
  Settings2,
  SquarePen,
  SquareTerminal,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();
  //  console.log(location.pathname)
  return (
    <Sidebar collapsible="icon" {...props} className="z-100">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
        <div className="flex flex-col gap-0 px-3 py-4">
          <div className="text-xs text-gray-500 mb-3">Dashboard</div>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-sm flex items-center py-1.5 px-1 rounded-md mb-2 transition-colors duration-200 ${
                isActive && location.pathname === "/admin"
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard className="mr-3 w-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="products"
            className={({ isActive }) =>
              `text-sm flex items-center py-1.5 px-1 rounded-md mb-2 transition-colors duration-200 ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <ChartBarBig className="mr-3 w-5" />
            Products
          </NavLink>

          
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `text-sm flex items-center py-1.5 px-1 rounded-md mb-2 transition-colors duration-200 ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <PackageCheck className="mr-3 w-5" />
            Orders
          </NavLink>

          
          <NavLink
            to="users"
            className={({ isActive }) =>
              `text-sm flex items-center py-1.5 px-1 rounded-md mb-2 transition-colors duration-200 ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <User className="mr-3 w-5" />
            Users
          </NavLink>
        </div>

        <div className="flex flex-col gap-0 px-3 py-4">
          <div className="text-xs text-gray-500 mb-3">Artcile</div>
          <NavLink
            to="blogs"
            className={({ isActive }) =>
              `text-sm flex items-center py-1.5 px-1 rounded-md mb-2 transition-colors duration-200 ${
                isActive && location.pathname === "/admin"
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <SquarePen className="mr-3 w-5" />
            Blogs
          </NavLink>
          
        
        </div>

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
