import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">E-SHOP</span>
                <span className="truncate text-xs text-gray-400">Qorax-Maal</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <div className="flex flex-col px-3 py-1 text-gray-600 text-sm">
              <Link
                to="/"
                className="border-b border-gray-300 mb-2 px-2 py-1  transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:translate-x-1"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="mb-2 px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:translate-x-1"
              >
                Products
              </Link>
              <Link
                to="/blogs"
                className="mb-2 px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:translate-x-1"
              >
                Blogs
              </Link>
              <Link
                to="/about"
                className="mb-2 px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:translate-x-1"
              >
                About
              </Link>
              <Link
                to="/contect"
                className="mb-2 px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:translate-x-1"
              >
                About
              </Link>
            </div>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
