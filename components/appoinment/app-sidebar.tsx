"use client";

import { Calendar, Home, FileText, Settings } from "lucide-react";
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
  currentView:
    | "overview"
    | "appointments"
    | "medical-records"
    | "medical-record-form";
  onViewChange: (
    view: "overview" | "appointments" | "medical-records",
    appointmentId?: string
  ) => void;
  onBackToList: () => void;
  onBackToMedicalRecords: () => void;
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
    title: "Medical Records",
    icon: FileText,
    view: "medical-records" as const,
  },
];

export default function AppSidebar({
  currentView,
  onViewChange,
  onBackToList,
  onBackToMedicalRecords,
}: AppSidebarProps) {
  const handleNavigation = (
    view: "overview" | "appointments" | "medical-records"
  ) => {
    onViewChange(view);
    if (view !== "appointments") {
      onBackToList();
    }
    if (view !== "medical-records") {
      onBackToMedicalRecords();
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
                  <Image src="/logo.png" width={32} height={32} alt="Logo" />
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
