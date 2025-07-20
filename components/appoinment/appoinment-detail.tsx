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
import Image from "next/image";
import { useArvPrescriptionsByPatientId } from "@/services/prescription/hooks";
import { useState } from "react";
import UnderlyingDiseasesModal from "./UnderlyingDiseasesModal";
import MedicalRecordForm from "./medical-record-form";
import { formatVietnameseDate } from "@/utils/format";

export default function AppointmentDetail({
  appointment,
  onBack,
  onViewChange,
}: AppointmentDetailProps) {
  const { mutate: confirmAppointment } = useConfirmAppointmentByDoctor(onBack);
  const { mutate: completeAppointment } = useCompleteAppointment(onBack);

  const {
    data: arvPrescriptions,
    isLoading: isArvLoading,
    error: arvError,
  } = useArvPrescriptionsByPatientId(appointment.appointmentID);

  const [openDiseaseModal, setOpenDiseaseModal] = useState(false);

  const underlyingDiseases = appointment.patient?.underlyingDiseases || [];

  const isAnonymous = appointment.isAnonymous;
  console.log(appointment);

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
            {formatVietnameseDate(appointment.appointmentDate)}{" "}
            {appointment.slot}
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

        {appointment.status === "ONGOING" && !appointment.isRecordCreated && (
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
        )}
        {appointment.status === "ONGOING" &&
          !appointment.isPrescriptionCreated &&
          appointment.isRecordCreated && (
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
                    disabled={appointment.paymentStatus === "UNPAID"}
                    title={
                      appointment.paymentStatus === "UNPAID"
                        ? "Patient has not paid yet."
                        : ""
                    }
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

          {/* Lab Results - Chỉ hiện khi status là ONGOING */}
          {appointment.status === "ONGOING" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Medical Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MedicalRecordForm
                  appointmentId={appointment.appointmentID}
                  record={null}
                  doctorName={appointment.doctor?.name || ""}
                  testItems={appointment.medicalService.testItems}
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Patient Information Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  onClick={() => setOpenDiseaseModal(true)}
                >
                  Underlying Diseases
                </Button>
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
                <Pill className="h-5 w-5" /> ARV Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isArvLoading ? (
                <div>Loading ARV prescriptions...</div>
              ) : arvError ? (
                <div className="text-red-500">
                  Failed to load ARV prescriptions.
                </div>
              ) : !arvPrescriptions?.arvList?.length ? (
                <div>No ARV prescriptions found.</div>
              ) : (
                <div className="space-y-4">
                  {arvPrescriptions.arvList.map((arv, idx) => (
                    <div
                      key={arv.arvId || idx}
                      className="border rounded-lg p-3"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <div className="font-semibold text-lg text-primary flex items-center gap-2">
                            {arv.genericName || "Unknown Drug"}
                            {arv.dosageStrength && (
                              <span className="text-xs text-muted-foreground">
                                ({arv.dosageStrength})
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Class: {arv.drugClass || "—"}
                            {" • "}Route: {arv.admRoute || "—"}
                          </div>
                          <div className="text-sm mt-1">
                            <span className="font-medium">Dosage:</span>{" "}
                            {arv.rcmDosage || "--"}
                          </div>
                          <div className="text-xs mt-1">
                            Funding: {arv.fundingSource || "--"}
                            {arv.regimenLevel && (
                              <>
                                {" • "}Level: {arv.regimenLevel}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <div className="text-xs text-muted-foreground">
                            Prescribed by:{" "}
                            <span className="font-semibold">
                              {arvPrescriptions.prescription?.prescribeBy ||
                                "--"}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Date:{" "}
                            {arvPrescriptions.prescription?.date
                              ? new Date(
                                  arvPrescriptions.prescription.date
                                ).toLocaleDateString("vi-VN")
                              : "--"}
                          </div>
                          <div className="text-xs">
                            Status:{" "}
                            <span className="font-medium">
                              {arvPrescriptions.prescription?.status || "--"}
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
      <UnderlyingDiseasesModal
        open={openDiseaseModal}
        onOpenChange={setOpenDiseaseModal}
        diseases={underlyingDiseases}
        patientName={appointment.patient?.name}
      />
    </div>
  );
}
