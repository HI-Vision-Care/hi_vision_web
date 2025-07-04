"use client";

import { ArrowLeft, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCompleteAppointment,
  useConfirmAppointmentByDoctor,
} from "@/services/appointment/hooks";

interface AppointmentDetailProps {
  appointment: {
    appointmentID: string;
    patientName: string;
    doctorName: string;
    serviceName: string;
    appointmentDate: string;
    isAnonymous: boolean;
    note?: string;
    createAt: string;
    status: string;
  };
  onStatusUpdate?: (appointmentId: string, newStatus: string) => void;
  onBack: () => void;
  onViewChange: (view: "medical-records", appointmentId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "SCHEDULED":
      return "bg-blue-100 text-blue-800";
    case "ONGOING":
      return "bg-yellow-200 text-warning-foreground";
    case "COMPLETED":
      return "bg-green-300 text-success-foreground";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function AppointmentDetail({
  appointment,
  onStatusUpdate,
  onBack,
  onViewChange,
}: AppointmentDetailProps) {
  const { mutate: confirmAppointment, isLoading: loadingConfirm } =
    useConfirmAppointmentByDoctor();
  const { mutate: completeAppointment, isLoading: loadingComplete } =
    useCompleteAppointment();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Appointment Details
          </h1>
          <p className="text-muted-foreground">
            {new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {new Date(appointment.appointmentDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge className={getStatusColor(appointment.status)}>
          {appointment.status}
        </Badge>
        <Button
          variant="outline"
          className="bg-primary text-white hover:bg-primary/80"
          onClick={() =>
            onViewChange("medical-record-form", appointment.appointmentID)
          }
        >
          New Record
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Appointment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Service
                  </label>
                  <p className="font-medium">{appointment.serviceName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Doctor
                  </label>
                  <p className="font-medium">{appointment.doctorName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Patient
                  </label>
                  <p className="font-medium">{appointment.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Anonymous
                  </label>
                  <p className="font-medium">
                    {appointment.isAnonymous ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              {appointment.note && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Note
                  </label>
                  <p className="mt-1">{appointment.note}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Created At
                </label>
                <p className="font-medium">
                  {new Date(appointment.createAt).toLocaleString()}
                </p>
              </div>
              {/* Status Actions nếu muốn */}
              {onStatusUpdate && (
                <div className="flex gap-2 pt-2">
                  {appointment.status === "SCHEDULED" && (
                    <Button
                      onClick={() =>
                        confirmAppointment(appointment.appointmentID)
                      }
                      className="bg-yellow-200 text-black hover:bg-yellow-400"
                      disabled={loadingConfirm}
                    >
                      Start Examination
                    </Button>
                  )}
                  {appointment.status === "ONGOING" && (
                    <Button
                      onClick={() =>
                        completeAppointment(appointment.appointmentID)
                      }
                      className="bg-green-300 hover:bg-green-400"
                      disabled={loadingComplete}
                    >
                      Complete Appointment
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Patient Information Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="font-medium">{appointment.patientName}</p>
              </div>
              {/* Có thể add doctorName ở đây nếu muốn */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
