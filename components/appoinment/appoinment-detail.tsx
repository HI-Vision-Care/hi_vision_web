"use client";

import {
  ArrowLeft,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Pill,
  FileText,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Appointment, AppointmentStatus } from "@/types";

interface AppointmentDetailProps {
  appointment: Appointment;
  onStatusUpdate: (appointmentId: string, newStatus: AppointmentStatus) => void;
  onBack: () => void;
}

export function AppointmentDetail({
  appointment,
  onStatusUpdate,
  onBack,
}: AppointmentDetailProps) {
  const { patient } = appointment;

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

  const canStartAppointment = appointment.status === "SCHEDULED";
  const canCompleteAppointment = appointment.status === "ONGOING";

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
            {new Date(appointment.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {appointment.time}
          </p>
        </div>
        <Badge className={getStatusColor(appointment.status)}>
          {appointment.status}
        </Badge>
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
                    Type
                  </label>
                  <p className="font-medium">{appointment.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Duration
                  </label>
                  <p className="font-medium">{appointment.duration} minutes</p>
                </div>
              </div>

              {appointment.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Notes
                  </label>
                  <p className="mt-1">{appointment.notes}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Symptoms
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {appointment.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status Actions */}
              <Separator />
              <div className="flex gap-2">
                {canStartAppointment && (
                  <Button
                    onClick={() => onStatusUpdate(appointment.id, "ONGOING")}
                    className="bg-warning hover:bg-warning/90"
                  >
                    Start Examination
                  </Button>
                )}
                {canCompleteAppointment && (
                  <Button
                    onClick={() => onStatusUpdate(appointment.id, "COMPLETED")}
                    className="bg-success hover:bg-success/90"
                  >
                    Complete Appointment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis & Prescription */}
          {(appointment.diagnosis || appointment.prescription) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Diagnosis & Treatment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointment.diagnosis && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Diagnosis
                    </label>
                    <p className="mt-1">{appointment.diagnosis}</p>
                  </div>
                )}

                {appointment.prescription && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Prescription
                    </label>
                    <ul className="mt-1 space-y-1">
                      {appointment.prescription.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Lab Results */}
          {appointment.labResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Lab Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointment.labResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{result.test}</div>
                        <div className="text-sm text-muted-foreground">
                          Normal Range: {result.normalRange}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{result.result}</div>
                        <Badge
                          variant={
                            result.status === "normal"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            result.status === "normal"
                              ? "bg-success text-success-foreground"
                              : ""
                          }
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Patient Information Sidebar */}
        <div className="space-y-6">
          {/* Patient Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {patient.age} years old • {patient.gender}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Conditions
                </label>
                <div className="mt-1 space-y-1">
                  {patient.medicalHistory.map((condition, index) => (
                    <div key={index} className="text-sm">
                      {condition}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Current Medications
                </label>
                <div className="mt-1 space-y-1">
                  {patient.currentMedications.map((medication, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Pill className="h-3 w-3 text-muted-foreground" />
                      {medication}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          {patient.allergies.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Allergies:</strong> {patient.allergies.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">
                  {patient.emergencyContact.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {patient.emergencyContact.relationship}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {patient.emergencyContact.phone}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
