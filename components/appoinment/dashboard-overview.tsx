"use client";

import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";

interface DashboardOverviewProps {
  appointments: Appointment[];
  onAppointmentSelect: (appointment: Appointment) => void;
}

export function DashboardOverview({
  appointments,
  onAppointmentSelect,
}: DashboardOverviewProps) {
  const todayAppointments = appointments.filter(
    (apt) => apt.date === "2024-01-15"
  );
  const scheduledCount = todayAppointments.filter(
    (apt) => apt.status === "SCHEDULED"
  ).length;
  const ongoingCount = todayAppointments.filter(
    (apt) => apt.status === "ONGOING"
  ).length;
  const completedCount = todayAppointments.filter(
    (apt) => apt.status === "COMPLETED"
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-yellow-200 text-warning-foreground";
      case "COMPLETED":
        return "bg-green-300 text-success-foreground";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Wilson. Here&apos;s your overview for today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {scheduledCount} scheduled, {ongoingCount} ongoing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {scheduledCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Waiting for consultation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {ongoingCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently in consultation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {completedCount}
            </div>
            <p className="text-xs text-muted-foreground">Finished today</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <CardDescription>
            Your appointments for January 15, 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    {appointment.time}
                  </div>
                  <div>
                    <div className="font-medium">
                      {appointment.patient.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.type} • {appointment.duration} min
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAppointmentSelect(appointment)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
