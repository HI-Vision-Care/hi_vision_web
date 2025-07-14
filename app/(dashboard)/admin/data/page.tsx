"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { backupHistory, systemStats } from "@/constants";
import { Header } from "@/components/admin";

export default function DataManagement() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Header
        title="Data Management"
        subtitle="Database backup, restore, and system data management"
      />

      <div className="p-6">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
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
                  <div className={`p-3 rounded-full bg-${stat.color}-50`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Backup Operations */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-red-600" />
                Backup Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button className="bg-red-600 hover:bg-red-700 w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Create Full Backup
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Incremental Backup
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Restore from Backup
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Backup Schedule</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Full Backup:</span>
                    <span className="font-medium">Daily at 2:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incremental:</span>
                    <span className="font-medium">Every 6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention:</span>
                    <span className="font-medium">30 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Export/Import */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Data Export/Import
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Patient Data
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Doctor Records
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export System Reports
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Export Formats</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">CSV</Badge>
                  <Badge variant="outline">Excel</Badge>
                  <Badge variant="outline">PDF</Badge>
                  <Badge variant="outline">JSON</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage Usage */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-purple-600" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Patient Records</span>
                  <span>1.2 GB</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-gray-500">45% of total storage</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>System Logs</span>
                  <span>800 MB</span>
                </div>
                <Progress value={30} className="h-2" />
                <p className="text-xs text-gray-500">30% of total storage</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Backups</span>
                  <span>400 MB</span>
                </div>
                <Progress value={15} className="h-2" />
                <p className="text-xs text-gray-500">15% of total storage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Backup History
              </span>
              <Button variant="outline" size="sm" className="bg-transparent">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backupHistory.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {backup.status === "completed" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {backup.status === "failed" && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    {backup.status === "running" && (
                      <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                    )}

                    <div>
                      <p className="font-medium">{backup.type}</p>
                      <p className="text-sm text-gray-600">{backup.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <p className="font-medium">{backup.size}</p>
                        <p className="text-gray-500">{backup.duration}</p>
                      </div>
                      {getStatusBadge(backup.status)}
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
