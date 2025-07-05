"use client";

import {
  AppointmentDetail,
  AppointmentsList,
  AppSidebar,
  DashboardHeader,
  DashboardOverview,
  MedicalRecordForm,
  MedicalRecordsList,
  WorkShiftCalendar,
  WorkshiftForm,
} from "@/components/appoinment";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { mockAppointments, mockWorkShifts } from "@/constants";
import { useAllMedicalRecords } from "@/services/doctor/hooks";
import { Appointment, MedicalRecord, WorkShift } from "@/types";
import { useState } from "react";

export default function DoctorDashboard() {
  const [currentView, setCurrentView] = useState<
    | "overview"
    | "appointments"
    | "medical-records"
    | "medical-record-form"
    | "schedule"
  >("overview");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);

  const [selectedMedicalRecord, setSelectedMedicalRecord] =
    useState<MedicalRecord | null>(null);
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);

  const [isCreatingShift, setIsCreatingShift] = useState(false);
  const [workShifts, setWorkShifts] = useState<WorkShift[]>(mockWorkShifts);
  const [selectedWorkShift, setSelectedWorkShift] = useState<WorkShift | null>(
    null
  );

  const { data: medicalRecords = [] } = useAllMedicalRecords();

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

  const handleWorkShiftSelect = (shift: WorkShift) => {
    setSelectedWorkShift(shift);
    setIsCreatingShift(false);
  };

  const handleCreateNewShift = () => {
    setSelectedWorkShift(null);
    setIsCreatingShift(true);
  };

  const handleBackToSchedule = () => {
    setSelectedWorkShift(null);
    setIsCreatingShift(false);
  };

  const handleSaveWorkShift = (shift: WorkShift) => {
    if (shift.id && workShifts.find((s) => s.id === shift.id)) {
      setWorkShifts((prev) => prev.map((s) => (s.id === shift.id ? shift : s)));
    } else {
      const newShift = { ...shift, id: `ws${Date.now()}` };
      setWorkShifts((prev) => [...prev, newShift]);
    }
    setIsCreatingShift(false);
    setSelectedWorkShift(shift);
  };

  const handleDeleteWorkShift = (shiftId: string) => {
    setWorkShifts((prev) => prev.filter((s) => s.id !== shiftId));
    setSelectedWorkShift(null);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onBackToList={handleBackToList}
        onBackToMedicalRecords={handleBackToMedicalRecords}
        onBackToSchedule={handleBackToSchedule}
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
                medicalRecords={medicalRecords}
                onRecordSelect={handleMedicalRecordSelect}
                onCreateNew={handleCreateNewRecord}
              />
            )}
          {currentView === "medical-records" &&
            (selectedMedicalRecord || isCreatingRecord) && (
              <MedicalRecordForm
                appointmentId={selectedMedicalRecord?.appointmentId ?? ""}
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
          {currentView === "schedule" &&
            !selectedWorkShift &&
            !isCreatingShift && (
              <WorkShiftCalendar
                workShifts={workShifts}
                appointments={appointments}
                onShiftSelect={handleWorkShiftSelect}
                onCreateNew={handleCreateNewShift}
              />
            )}
          {currentView === "schedule" &&
            (selectedWorkShift || isCreatingShift) && (
              <WorkshiftForm
                shift={selectedWorkShift}
                onSave={handleSaveWorkShift}
                onDelete={handleDeleteWorkShift}
                onBack={handleBackToSchedule}
                appointments={appointments}
              />
            )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
