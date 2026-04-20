"use client";

import { useAuth } from "@/contexts/auth-context";
import { PinLock } from "@/components/pin-lock";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Bot,
  Coins,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Home", icon: LayoutDashboard, href: "/" },
  { title: "Agent Fleet", icon: Bot, href: "/agents" },
];

const systemItems = [
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return <PinLock />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-900 overflow-hidden">
        <Sidebar className="border-slate-700 shrink-0">
          <SidebarHeader className="border-b border-slate-700 p-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Coins className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="font-bold text-white">Mission Control</h1>
                <p className="text-xs text-slate-400">Legacy Syndicate</p>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-400">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                        className="text-slate-300 hover:text-white hover:bg-slate-800 data-[active=true]:bg-orange-500/10 data-[active=true]:text-orange-400"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-400">System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {systemItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={pathname === item.href}
                        className="text-slate-300 hover:text-white hover:bg-slate-800 data-[active=true]:bg-orange-500/10 data-[active=true]:text-orange-400"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-slate-700 text-orange-400">
                  RR
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Romo</p>
                <p className="text-xs text-slate-400 truncate">Administrator</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 border-b border-slate-700 flex items-center gap-4 px-4 bg-slate-800/50 shrink-0">
            <SidebarTrigger className="text-slate-400 hover:text-white" />
            <Separator orientation="vertical" className="h-6 bg-slate-700" />
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-white truncate">
                {navItems.find((item) => item.href === pathname)?.title ||
                  systemItems.find((item) => item.href === pathname)?.title ||
                  "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Online</span>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-6 bg-slate-900">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
