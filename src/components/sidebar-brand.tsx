"use client";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarBrand() {
  const { toggleSidebar, isMobile, state } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem
        className={cn("flex items-center gap-2 transition-all duration-300", {
          "px-2": state !== "collapsed",
        })}
      >
        <Link href="/">
          <Bot size={40} />
        </Link>
        <span
          className={cn(
            "text-md text-primary mt-2 overflow-hidden whitespace-nowrap transition-all duration-300",
            {
              "size-0": state === "collapsed",
            }
          )}
        >
          Simple Gen AI
        </span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
