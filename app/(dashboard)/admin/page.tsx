"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Shield,
  Database,
  Pill,
  BarChart3,
} from "lucide-react";

import {
  doctorPerformance,
  monthlyStats,
  recentActivities,
  systemAlerts,
  systemStat,
} from "@/constants";
import { Header } from "@/components/admin";
import Sidebar from "@/components/admin/sidebar";

export default function AdminDashboard() {
  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <Sidebar />

      <div className="">
        <Header
          title="Admin Dashboard"
          subtitle="HIV Treatment Management System - Administrative Control Panel"
        />

        <div className="p-6">
          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStat.map((stat, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Doctor Performance */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-red-600" />
                    Doctor Performance Overview
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctorPerformance.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-gray-600">
                            {doctor.patients} patients • {doctor.shifts} shifts
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            ★ {doctor.satisfaction}
                          </span>
                          <Badge
                            variant={
                              doctor.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {doctor.status === "active" ? "Active" : "On Leave"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  System Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {alert.type === "urgent" && (
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      {alert.type === "warning" && (
                        <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                      )}
                      {alert.type === "info" && (
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      )}
                      {alert.type === "success" && (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              alert.priority === "high"
                                ? "destructive"
                                : alert.priority === "medium"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {alert.priority} priority
                          </Badge>
                          <p className="text-xs text-gray-500">5 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent System Activities */}
            <Card className="bg-white shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Recent System Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {activity.user}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Add New Doctor
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Patients
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Assign Shifts
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Pill className="h-4 w-4 mr-2" />
                    ARV Management
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    Backup System
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Statistics */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Monthly System Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {monthlyStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 bg-${stat.color}-50 rounded-lg`}
                  >
                    <div
                      className={`text-2xl font-bold text-${stat.color}-600`}
                    >
                      {stat.value}
                    </div>
                    <div className={`text-sm text-${stat.color}-800`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
