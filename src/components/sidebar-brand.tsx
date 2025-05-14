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
        className={cn("flex items-center pt-4 gap-2 transition-all duration-300", {
          "px-2": state !== "collapsed",
        })}
      >
        <Link href="/">
          <div className="rounded-md bg-teal-500 flex justify-center items-center w-8 h-8 border-2 border-primary">
            S
          </div>
        </Link>
        <span
          className={cn(
            "text-md text-primary overflow-hidden whitespace-nowrap transition-all duration-300",
            {
              "size-0": state === "collapsed",
            }
          )}
        >
          SimpleGen
        </span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
