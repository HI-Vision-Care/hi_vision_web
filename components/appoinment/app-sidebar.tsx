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
import { DashboardView, ViewChangeOptions } from "@/types";
import { navigation } from "@/constants";

interface AppSidebarProps {
  currentView: DashboardView;
  onViewChange: (options: ViewChangeOptions) => void;
  onBackToList: () => void;
  onBackToMedicalRecords: () => void;
  onBackToSchedule: () => void;
  onBackToMedications: () => void;
}

export default function AppSidebar({
  currentView,
  onViewChange,
  onBackToList,
  onBackToMedicalRecords,
  onBackToSchedule,
  onBackToMedications,
}: AppSidebarProps) {
  const handleNavigation = (view: DashboardView) => {
    onViewChange({ view });
    if (view !== "appointments") {
      onBackToList();
    }
    if (view !== "medical-records") {
      onBackToMedicalRecords();
    }
    if (view !== "schedule") {
      onBackToSchedule();
    }
    if (view !== "medications") {
      onBackToMedications();
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
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
