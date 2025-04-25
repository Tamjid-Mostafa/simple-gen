"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export function SidebarFooterUser() {
  const { toggleSidebar, isMobile, state } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem className="overflow-hidden border-t pt-2">
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger: "w-full justify-start",
              userButtonBox:
                "text-sm py-2 px-[5px] rounded-md flex-row-reverse",
              avatarBox: "border-2 border-white rounded-full",
              userButtonOuterIdentifier: `whitespace-nowrap `,
            },
          }}
          showName
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
