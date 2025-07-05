"use client";

import {
  AppointmentDetail,
  AppointmentsList,
  AppSidebar,
  DashboardHeader,
  DashboardOverview,
  MedicalRecordForm,
  MedicalRecordsList,
} from "@/components/appoinment";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Appointment, MedicalRecord } from "@/types";
import { useState } from "react";

export default function DoctorDashboard() {
  const [currentView, setCurrentView] = useState<
    "overview" | "appointments" | "medical-records" | "medical-record-form"
  >("overview");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [selectedMedicalRecord, setSelectedMedicalRecord] =
    useState<MedicalRecord | null>(null);
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);

  const handleMedicalRecordSelect = (record: MedicalRecord) => {
    setSelectedMedicalRecord(record);
    setIsCreatingRecord(false);
  };

  const handleCreateNewRecord = () => {
    setSelectedMedicalRecord(null);
    setIsCreatingRecord(true);
  };

  const handleBackToMedicalRecords = () => {
    setSelectedMedicalRecord(null);
    setIsCreatingRecord(false);
  };

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCurrentView("appointments");
  };

  const handleBackToList = () => {
    setSelectedAppointment(null);
  };

  const handleViewChange = (
    view:
      | "overview"
      | "appointments"
      | "medical-records"
      | "medical-record-form",
    appointmentId?: string
  ) => {
    setCurrentView(view);
    if (appointmentId) {
      setSelectedAppointmentId(appointmentId);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onBackToList={handleBackToList}
        onBackToMedicalRecords={handleBackToMedicalRecords}
      />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-6">
          {currentView === "overview" && (
            <DashboardOverview onAppointmentSelect={handleAppointmentSelect} />
          )}
          {currentView === "appointments" && !selectedAppointment && (
            <AppointmentsList onAppointmentSelect={handleAppointmentSelect} />
          )}

          {currentView === "appointments" && selectedAppointment && (
            <AppointmentDetail
              appointment={selectedAppointment}
              onBack={handleBackToList}
              onViewChange={handleViewChange}
            />
          )}

          {currentView === "medical-records" &&
            !selectedMedicalRecord &&
            !isCreatingRecord && (
              <MedicalRecordsList
                onRecordSelect={handleMedicalRecordSelect}
                onCreateNew={handleCreateNewRecord}
              />
            )}
          {currentView === "medical-records" &&
            (selectedMedicalRecord || isCreatingRecord) && (
              <MedicalRecordForm
                appointmentId={selectedAppointmentId ?? ""}
                record={selectedMedicalRecord}
                onBack={handleBackToMedicalRecords}
              />
            )}

          {currentView === "medical-record-form" && (
            <MedicalRecordForm
              appointmentId={selectedAppointmentId ?? ""}
              record={null}
              onBack={() => setCurrentView("appointments")}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
