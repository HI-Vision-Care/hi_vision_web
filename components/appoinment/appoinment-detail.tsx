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
  Pill,
  User,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useCompleteAppointment,
  useConfirmAppointmentByDoctor,
} from "@/services/appointment/hooks";
import type { AppointmentDetailProps } from "@/types";
import { APPOINTMENT_STATUS_COLORS } from "@/constants";
import { useMedicalRecordByAppointmentId } from "@/services/doctor/hooks";
import Image from "next/image";
import { useArvPrescriptionsByPatientId } from "@/services/prescription/hooks";
import MedicalRecordWithLabResults from "./medicalrecord-labresults";

function formatAppointmentTimeUTC(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
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
  const { mutate: confirmAppointment } = useConfirmAppointmentByDoctor(onBack);
  const { mutate: completeAppointment } = useCompleteAppointment(onBack);
  const patientId = appointment.patient?.patientID;

  const {
    data: medicalRecord,
    isLoading: isMedicalRecordLoading,
    error: medicalRecordError,
  } = useMedicalRecordByAppointmentId(appointment.appointmentID);

  const {
    data: arvPrescriptions = [],
    isLoading: isArvLoading,
    error: arvError,
  } = useArvPrescriptionsByPatientId(patientId);

  const isAnonymous = appointment.isAnonymous;

  return (
    <div className="space-y-6">
      {/* Header - OPTIMAL PLACEMENT #1: Primary Action Area */}
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

        {appointment.status === "ONGOING" && (
          <>
            <Button
              variant="outline"
              className="bg-primary text-white hover:bg-primary/80"
              onClick={() =>
                onViewChange({
                  view: "medical-record-form",
                  appointmentId: appointment.appointmentID,
                })
              }
            >
              New Record
            </Button>
            <Button
              variant="outline"
              className="bg-primary text-white hover:bg-primary/80"
              onClick={() =>
                onViewChange({
                  view: "medications",
                  appointmentId: appointment.appointmentID,
                  patientId: appointment.patient?.patientID,
                  createNew: true,
                  prescribedBy: appointment.doctor?.name,
                })
              }
            >
              Create prescription
            </Button>
          </>
        )}
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
                {/* OPTIMAL PLACEMENT #2: Meet URL in Card Header */}
                {appointment.urlLink && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-auto bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    onClick={() => window.open(appointment.urlLink, "_blank")}
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Join Meeting
                  </Button>
                )}
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
                  {new Date(appointment.createAt).toLocaleString("vi-VN", {
                    timeZone: "UTC",
                  })}
                </p>
              </div>

              {/* OPTIMAL PLACEMENT #3: Meet URL with Status Actions */}
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
            </CardContent>
          </Card>

          {/* Lab Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Medical Record
                {isMedicalRecordLoading && (
                  <span className="ml-2 text-xs">Loading...</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {medicalRecordError ? (
                <div className="text-red-500">
                  Error loading medical record.
                </div>
              ) : !medicalRecord ? (
                <div>No medical record found.</div>
              ) : (
                <MedicalRecordWithLabResults
                  medicalRecord={medicalRecord}
                  appointment={appointment}
                />
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
                  <Image
                    src={
                      appointment.patient.account.avatar || "/placeholder.svg"
                    }
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="rounded-full object-cover border"
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
                    {isAnonymous ? "***" : appointment.patient?.gender}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </label>
                  <p className="font-medium">
                    {appointment.patient?.account?.email || "N/A"}
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
                  <Calendar className="h-4 w-4" /> Date of Birth
                </label>
                <p className="font-medium">
                  {isAnonymous
                    ? "Hidden"
                    : appointment.patient?.dob
                    ? new Date(appointment.patient.dob).toLocaleDateString(
                        "vi-VN"
                      )
                    : "N/A"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <BriefcaseMedical className="h-4 w-4" /> Medical No.
                  </label>
                  <p className="font-medium">
                    {isAnonymous
                      ? "Hidden"
                      : appointment.patient?.medNo || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Medical Date
                  </label>
                  <p className="font-medium">
                    {isAnonymous
                      ? "Hidden"
                      : appointment.patient?.medDate
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
                  {isAnonymous
                    ? "Hidden"
                    : appointment.patient?.medFac || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ARV Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span role="img" aria-label="pill">
                  <Pill className="h-5 w-5" />
                </span>{" "}
                ARV Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isArvLoading ? (
                <div>Loading ARV prescriptions...</div>
              ) : arvError ? (
                <div className="text-red-500">
                  Failed to load ARV prescriptions.
                </div>
              ) : arvPrescriptions.length === 0 ? (
                <div>No ARV prescriptions found.</div>
              ) : (
                <div className="space-y-4">
                  {arvPrescriptions.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-semibold text-lg text-primary">
                            {item.arv?.genericName || "Unknown Drug"}
                            {item.arv?.dosageStrength ? (
                              <span className="ml-2 text-xs text-muted-foreground">
                                {item.arv.dosageStrength}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Class: {item.arv?.drugClass || "—"} • Route:{" "}
                            {item.arv?.admRoute || "—"}
                          </div>
                          <div className="text-sm mt-1">
                            <span className="font-medium">Dosage:</span>{" "}
                            {item.dosage || item.arv?.rcmDosage || "--"}
                            {item.duration ? (
                              <>
                                {" • "}
                                <span className="font-medium">
                                  Duration:
                                </span>{" "}
                                {item.duration} day
                                {Number(item.duration) > 1 ? "s" : ""}
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <div className="text-xs text-muted-foreground">
                            Prescribed by:{" "}
                            <span className="font-semibold">
                              {item.prescription?.prescribeBy || "--"}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Date:{" "}
                            {item.prescription?.date
                              ? new Date(
                                  item.prescription.date
                                ).toLocaleDateString("vi-VN")
                              : "--"}
                          </div>
                          <div className="text-xs">
                            Status:{" "}
                            <span className="font-medium">
                              {item.prescription?.status || "--"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
