"use client";
import Link from "next/link";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Bot } from "lucide-react";

export function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 pt-4 px-2">
        <Link href="/">
          <Bot size={40} />
        </Link>
        <span className="text-xl text-primary mt-2">Simple Gen AI</span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
