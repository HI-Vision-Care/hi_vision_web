"use client";

import {
  Activity,
  ArrowLeft,
  BadgeInfo,
  BriefcaseMedical,
  Calendar,
  Clock,
  Hospital,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useCompleteAppointment,
  useConfirmAppointmentByDoctor,
} from "@/services/appointment/hooks";
import { AppointmentDetailProps } from "@/types";
import { APPOINTMENT_STATUS_COLORS } from "@/constants";
import { useLabResultsByPatientId } from "@/services/doctor/hooks";

function formatAppointmentTimeUTC(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Luôn dùng UTC
  });
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day} at ${hour}:${minute}`;
}

export default function AppointmentDetail({
  appointment,
  onBack,
  onViewChange,
}: AppointmentDetailProps) {
  const { mutate: confirmAppointment } = useConfirmAppointmentByDoctor();
  const { mutate: completeAppointment } = useCompleteAppointment();
  const patientId = appointment.patient?.patientID;
  const {
    data: labResults = [],
    isLoading: isLabLoading,
    error: labError,
  } = useLabResultsByPatientId(patientId);
  console.log(patientId);

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
            {formatAppointmentTimeUTC(appointment.appointmentDate)}
          </p>
        </div>
        <Badge
          className={
            APPOINTMENT_STATUS_COLORS[appointment.status] ||
            APPOINTMENT_STATUS_COLORS.DEFAULT
          }
        >
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
                  <p className="font-medium">
                    {appointment.medicalService?.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Doctor
                  </label>
                  <p className="font-medium">{appointment.doctor?.name}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Patient
                  </label>
                  <p className="font-medium">{appointment.patient?.name}</p>
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
              <Separator />
              <div className="flex gap-2 pt-2">
                {appointment.status === "SCHEDULED" && (
                  <Button
                    onClick={() =>
                      confirmAppointment(appointment.appointmentID)
                    }
                    className="bg-yellow-200 text-black hover:bg-yellow-400"
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
                  >
                    Complete Appointment
                  </Button>
                )}
              </div>

              {/* Status Actions */}
            </CardContent>
          </Card>

          {/* Lab Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Lab Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLabLoading ? (
                <div>Loading lab results...</div>
              ) : labError ? (
                <div className="text-red-500">Error loading lab results.</div>
              ) : labResults.length === 0 ? (
                <div>No lab results found.</div>
              ) : (
                <div className="space-y-4">
                  {labResults.map((result) => (
                    <div
                      key={result.recordID}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{result.testType}</div>
                        <div className="text-xs text-muted-foreground">
                          {result.testDate && (
                            <>
                              Date:{" "}
                              {new Date(result.testDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reference: {result.referenceRange}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {result.resultValue} {result.unit}
                        </div>
                        <div className="text-xs">{result.resultText}</div>
                        <div className="text-xs text-muted-foreground">
                          By: {result.performedBy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Patient Information Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                {appointment.patient?.account?.avatar && (
                  <img
                    src={appointment.patient.account.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <User className="h-4 w-4" /> Name
                  </label>
                  <p className="font-medium text-lg">
                    {appointment.patient?.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <BadgeInfo className="h-3 w-3" />
                    {appointment.patient?.gender}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Date of Birth
                  </label>
                  <p className="font-medium">
                    {appointment.patient?.dob
                      ? new Date(appointment.patient.dob).toLocaleDateString(
                          "vi-VN"
                        )
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Phone
                  </label>
                  <p className="font-medium">
                    {appointment.patient?.account?.phone || "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <p className="font-medium">
                  {appointment.patient?.account?.email || "N/A"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <BriefcaseMedical className="h-4 w-4" /> Medical No.
                  </label>
                  <p className="font-medium">
                    {appointment.patient?.medNo || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Medical Date
                  </label>
                  <p className="font-medium">
                    {appointment.patient?.medDate
                      ? new Date(
                          appointment.patient.medDate
                        ).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Hospital className="h-4 w-4" /> Medical Facility
                </label>
                <p className="font-medium">
                  {appointment.patient?.medFac || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
