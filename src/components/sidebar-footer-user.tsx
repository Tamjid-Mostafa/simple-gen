"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export function SidebarFooterUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full bg-primary/20 rounded-md",
              userButtonTrigger: "w-full justify-start",
              userButtonBox: " text-sm py-2 px-2 rounded-md flex-row-reverse",
              avatarBox: "border-2 border-white rounded-full",
              userButtonOuterIdentifier: "",
            },
          }}
          showName
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
