"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Info,
  User,
} from "lucide-react";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      user: "admin@hivcenter.com",
      userRole: "Administrator",
      action: "USER_LOGIN",
      resource: "System",
      details: "Successful login from IP 192.168.1.100",
      severity: "info",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:25:12",
      user: "dr.johnson@hivcenter.com",
      userRole: "Doctor",
      action: "PATIENT_UPDATE",
      resource: "Patient Record (P001)",
      details: "Updated ARV regimen for patient John Anderson",
      severity: "info",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:20:45",
      user: "admin@hivcenter.com",
      userRole: "Administrator",
      action: "DOCTOR_CREATE",
      resource: "Doctor Record (D005)",
      details: "Created new doctor account for Dr. Amanda Lee",
      severity: "warning",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:15:33",
      user: "system@hivcenter.com",
      userRole: "System",
      action: "BACKUP_COMPLETE",
      resource: "Database",
      details: "Automatic database backup completed successfully (2.4 GB)",
      severity: "success",
      ipAddress: "127.0.0.1",
      userAgent: "System Process",
    },
    {
      id: 5,
      timestamp: "2024-01-15 14:10:18",
      user: "dr.chen@hivcenter.com",
      userRole: "Doctor",
      action: "APPOINTMENT_CREATE",
      resource: "Appointment (A156)",
      details: "Scheduled appointment for patient Maria Rodriguez",
      severity: "info",
      ipAddress: "192.168.1.108",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    },
    {
      id: 6,
      timestamp: "2024-01-15 14:05:22",
      user: "unknown@external.com",
      userRole: "Unknown",
      action: "LOGIN_FAILED",
      resource: "System",
      details: "Failed login attempt - invalid credentials",
      severity: "error",
      ipAddress: "203.45.67.89",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    },
    {
      id: 7,
      timestamp: "2024-01-15 14:00:15",
      user: "admin@hivcenter.com",
      userRole: "Administrator",
      action: "SETTINGS_UPDATE",
      resource: "System Settings",
      details: "Updated notification settings - enabled SMS alerts",
      severity: "warning",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 8,
      timestamp: "2024-01-15 13:55:40",
      user: "dr.davis@hivcenter.com",
      userRole: "Doctor",
      action: "REPORT_EXPORT",
      resource: "Patient Reports",
      details: "Exported monthly treatment report (PDF, 45 pages)",
      severity: "info",
      ipAddress: "192.168.1.112",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction =
      actionFilter === "all" || log.action.includes(actionFilter.toUpperCase());
    const matchesUser =
      userFilter === "all" || log.userRole.toLowerCase() === userFilter;

    return matchesSearch && matchesAction && matchesUser;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const logStats = [
    { label: "Total Logs Today", value: auditLogs.length, color: "blue" },
    {
      label: "Failed Logins",
      value: auditLogs.filter((log) => log.action === "LOGIN_FAILED").length,
      color: "red",
    },
    {
      label: "System Changes",
      value: auditLogs.filter(
        (log) => log.action.includes("UPDATE") || log.action.includes("CREATE")
      ).length,
      color: "yellow",
    },
    {
      label: "Successful Actions",
      value: auditLogs.filter(
        (log) => log.severity === "success" || log.severity === "info"
      ).length,
      color: "green",
    },
  ];

  return (
    <>
      <Header
        title="Audit Logs"
        subtitle="System activity monitoring and security audit trail"
      />

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {logStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <FileText className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by user, action, resource, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="login">Login/Logout</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="backup">Backup</SelectItem>
            </SelectContent>
          </Select>

          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-48">
              <User className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by user role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="administrator">Administrator</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-red-600 hover:bg-red-700">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Audit Logs Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Audit Trail ({filteredLogs.length} entries)</span>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Real-time View
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getSeverityIcon(log.severity)}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {log.action.replace(/_/g, " ")}
                          </span>
                          {getSeverityBadge(log.severity)}
                          <Badge variant="outline" className="text-xs">
                            {log.userRole}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          {log.details}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">User:</span>{" "}
                            {log.user}
                          </div>
                          <div>
                            <span className="font-medium">Resource:</span>{" "}
                            {log.resource}
                          </div>
                          <div>
                            <span className="font-medium">IP:</span>{" "}
                            {log.ipAddress}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>{" "}
                            {log.timestamp}
                          </div>
                        </div>

                        {log.userAgent !== "System Process" && (
                          <div className="mt-2 text-xs text-gray-400 truncate">
                            <span className="font-medium">User Agent:</span>{" "}
                            {log.userAgent}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
