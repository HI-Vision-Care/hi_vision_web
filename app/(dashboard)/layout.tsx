import Sidebar from "@/components/admin/sidebar";
import type React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <Sidebar />
      <div className="lg:ml-64">{children}</div>
    </div>
  );
}
