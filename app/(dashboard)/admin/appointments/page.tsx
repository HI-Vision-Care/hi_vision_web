"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
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
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Clock,
  UserCheck,
} from "lucide-react";

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const appointments = [
    {
      id: 1,
      patientId: "P001",
      patientName: "John Anderson",
      doctorName: "Dr. Sarah Johnson",
      date: "2024-01-15",
      time: "09:00",
      type: "Follow-up",
      status: "confirmed",
      priority: "normal",
      duration: 30,
      notes: "Regular check-up and medication review",
    },
    {
      id: 2,
      patientId: "P002",
      patientName: "Maria Rodriguez",
      doctorName: "Dr. Michael Chen",
      date: "2024-01-15",
      time: "10:30",
      type: "Consultation",
      status: "pending",
      priority: "high",
      duration: 45,
      notes: "New patient consultation",
    },
    {
      id: 3,
      patientId: "P003",
      patientName: "David Kim",
      doctorName: "Dr. Emily Davis",
      date: "2024-01-15",
      time: "14:00",
      type: "Lab Review",
      status: "completed",
      priority: "normal",
      duration: 20,
      notes: "Review recent lab results",
    },
    {
      id: 4,
      patientId: "P004",
      patientName: "Sarah Wilson",
      doctorName: "Dr. Sarah Johnson",
      date: "2024-01-15",
      time: "15:30",
      type: "Treatment",
      status: "confirmed",
      priority: "normal",
      duration: 60,
      notes: "ARV therapy adjustment",
    },
    {
      id: 5,
      patientId: "P005",
      patientName: "Robert Brown",
      doctorName: "Dr. Robert Wilson",
      date: "2024-01-15",
      time: "16:00",
      type: "Emergency",
      status: "urgent",
      priority: "urgent",
      duration: 30,
      notes: "Urgent consultation required",
    },
    {
      id: 6,
      patientId: "P006",
      patientName: "Lisa Chen",
      doctorName: "Dr. Amanda Lee",
      date: "2024-01-16",
      time: "09:30",
      type: "Pediatric",
      status: "confirmed",
      priority: "normal",
      duration: 40,
      notes: "Pediatric HIV follow-up",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    let matchesDate = true;

    if (dateFilter === "today") {
      const today = "2024-01-15"; // MOCK: giả lập ngày hôm nay
      matchesDate = appointment.date === today;
    } else if (dateFilter === "tomorrow") {
      const tomorrow = "2024-01-16";
      matchesDate = appointment.date === tomorrow;
    } else if (dateFilter === "week") {
      const from = "2024-01-15";
      const to = "2024-01-21";
      matchesDate = appointment.date >= from && appointment.date <= to;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return (
          <Badge variant="destructive" className="text-xs">
            Urgent
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-orange-100 text-orange-800 text-xs">High</Badge>
        );
      case "normal":
      default:
        return (
          <Badge variant="outline" className="text-xs">
            Normal
          </Badge>
        );
    }
  };

  const appointmentStats = [
    {
      label: "Today's Appointments",
      value: appointments.filter((a) => a.date === "2024-01-15").length,
      color: "blue",
    },
    {
      label: "Confirmed",
      value: appointments.filter((a) => a.status === "confirmed").length,
      color: "green",
    },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
      color: "yellow",
    },
    {
      label: "Urgent",
      value: appointments.filter((a) => a.status === "urgent").length,
      color: "red",
    },
  ];

  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <Sidebar />

      <div className="">
        <Header
          title="Appointment Management"
          subtitle="Schedule, track, and manage all patient appointments"
        />

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {appointmentStats.map((stat, index) => (
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
                    <Calendar className={`h-8 w-8 text-${stat.color}-600`} />
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
                placeholder="Search by patient name, doctor, ID, or appointment type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>

          {/* Appointments List */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Appointments ({filteredAppointments.length})</span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Export List
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString(
                              "en-US",
                              { weekday: "short" }
                            )}
                          </div>
                          <div className="text-lg font-bold">
                            {new Date(appointment.date).getDate()}
                          </div>
                          <div className="text-sm font-medium">
                            {appointment.time}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-lg">
                              {appointment.patientName}
                            </h3>
                            <span className="text-gray-500">
                              ({appointment.patientId})
                            </span>
                            {getStatusBadge(appointment.status)}
                            {getPriorityBadge(appointment.priority)}
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <UserCheck className="h-4 w-4" />
                              <span>{appointment.doctorName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.duration} min</span>
                            </div>
                            <div>
                              <span className="font-medium">
                                {appointment.type}
                              </span>
                            </div>
                          </div>

                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-2">
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
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
