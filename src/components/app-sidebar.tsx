"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import {
  ChevronLeft, Home, MessagesSquare,
} from "lucide-react";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarFooterUser } from "./sidebar-footer-user";


const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Comment",
    url: "/dashboard/comment",
    icon: MessagesSquare
  }

];

export function AppSidebar() {
  const {toggleSidebar, isMobile} = useSidebar()
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
