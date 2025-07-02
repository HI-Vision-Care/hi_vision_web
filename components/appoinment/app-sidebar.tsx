"use client";

import {
  Calendar,
  Home,
  Users,
  FileText,
  Settings,
  Stethoscope,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

interface AppSidebarProps {
  currentView: "overview" | "appointments";
  onViewChange: (view: "overview" | "appointments") => void;
  onBackToList: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    icon: Home,
    view: "overview" as const,
  },
  {
    title: "Appointments",
    icon: Calendar,
    view: "appointments" as const,
  },
  {
    title: "Patients",
    icon: Users,
    view: "patients" as const,
  },
  {
    title: "Medical Records",
    icon: FileText,
    view: "records" as const,
  },
];

export function AppSidebar({
  currentView,
  onViewChange,
  onBackToList,
}: AppSidebarProps) {
  const handleNavigation = (view: "overview" | "appointments") => {
    onViewChange(view);
    if (view !== "appointments") {
      onBackToList();
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-amber-50 text-primary-foreground">
                  <Image src="/logo.svg" alt="Logo" width={120} height={40} />
                </div>
              </Link>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Hi-Vision</span>
                <span className="text-xs">Doctor Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.view)}
                    isActive={currentView === item.view}
                    className="cursor-pointer"
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="size-4" />
                  <span>Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
