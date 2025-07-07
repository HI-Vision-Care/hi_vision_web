"use client";

import {
  AppointmentDetail,
  AppointmentsList,
  AppSidebar,
  DashboardHeader,
  DashboardOverview,
  MedicalRecordForm,
  MedicalRecordsList,
  MedicationForm,
  MedicationsList,
  WorkShiftCalendar,
  WorkshiftForm,
} from "@/components/appoinment";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { mockAppointments, mockMedications } from "@/constants";
import { useAllMedicalRecords } from "@/services/doctor/hooks";
import { useWorkShiftsByDoctorId } from "@/services/workShift/hooks";
import { Appointment, MedicalRecord, Medication, WorkShift } from "@/types";
import { useState } from "react";

function mapBackendShiftToForm(shiftFromBackend: any): WorkShift {
  return {
    id: shiftFromBackend.id?.toString() || "",
    doctorId: shiftFromBackend.doctor?.doctorID || "",
    doctorName: shiftFromBackend.doctor?.name || "",
    date: shiftFromBackend.date?.split("T")[0] || "",
    startTime: shiftFromBackend.startTime
      ? shiftFromBackend.startTime.length > 5
        ? shiftFromBackend.startTime.split("T")[1]?.substring(0, 5)
        : shiftFromBackend.startTime
      : "",
    endTime: shiftFromBackend.endTime
      ? shiftFromBackend.endTime.length > 5
        ? shiftFromBackend.endTime.split("T")[1]?.substring(0, 5)
        : shiftFromBackend.endTime
      : "",
    shiftType: shiftFromBackend.shiftType || "Regular",
    location: shiftFromBackend.location || "Main Clinic", // fallback hợp lý
    note: shiftFromBackend.note || "", // backend là 'note', form cần 'notes'
    status: shiftFromBackend.status || "Scheduled",
    createdAt: shiftFromBackend.createdAt || new Date().toISOString(),
    updatedAt: shiftFromBackend.updatedAt || new Date().toISOString(),
  };
}

export default function DoctorDashboard() {
  const [currentView, setCurrentView] = useState<
    | "overview"
    | "appointments"
    | "medical-records"
    | "medical-record-form"
    | "schedule"
    | "medications"
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
  const doctorId = "14e78fbb-11c8-41f1-9ab4-d85a4f190380";
  const { data: workShifts = [] } = useWorkShiftsByDoctorId(doctorId);
  const [isCreatingShift, setIsCreatingShift] = useState(false);

  const [selectedWorkShift, setSelectedWorkShift] = useState<WorkShift | null>(
    null
  );

  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [isCreatingMedication, setIsCreatingMedication] = useState(false);
  const [medications, setMedications] = useState<Medication[]>(mockMedications);

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
      | "medical-record-form"
      | "medications",
    appointmentId?: string
  ) => {
    setCurrentView(view);
    if (appointmentId) {
      setSelectedAppointmentId(appointmentId);
    }
  };
  const handleWorkShiftSelect = (shift: any) => {
    setSelectedWorkShift(mapBackendShiftToForm(shift));
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
    // if (shift.id && workShifts.find((s) => s.id === shift.id)) {
    //   setWorkShifts((prev) => prev.map((s) => (s.id === shift.id ? shift : s)));
    // } else {
    //   const newShift = { ...shift, id: `ws${Date.now()}` };
    //   setWorkShifts((prev) => [...prev, newShift]);
    // }
    setIsCreatingShift(false);
    setSelectedWorkShift(shift);
  };

  const handleDeleteWorkShift = () => {
    // setWorkShifts((prev) => prev.filter((s) => s.id !== shiftId));
    setSelectedWorkShift(null);
  };

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication(medication);
    setIsCreatingMedication(false);
  };

  const handleCreateNewMedication = () => {
    setSelectedMedication(null);
    setIsCreatingMedication(true);
  };

  const handleBackToMedications = () => {
    setSelectedMedication(null);
    setIsCreatingMedication(false);
  };

  const handleSaveMedication = (medication: Medication) => {
    if (medication.id && medications.find((m) => m.id === medication.id)) {
      setMedications((prev) =>
        prev.map((m) => (m.id === medication.id ? medication : m))
      );
    } else {
      const newMedication = { ...medication, id: `med${Date.now()}` };
      setMedications((prev) => [...prev, newMedication]);
    }
    setIsCreatingMedication(false);
    setSelectedMedication(medication);
  };

  const handleDeleteMedication = (medicationId: string) => {
    setMedications((prev) => prev.filter((m) => m.id !== medicationId));
    setSelectedMedication(null);
  };

  console.log(workShifts);

  return (
    <SidebarProvider>
      <AppSidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onBackToList={handleBackToList}
        onBackToMedicalRecords={handleBackToMedicalRecords}
        onBackToSchedule={handleBackToSchedule}
        onBackToMedications={handleBackToMedications}
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
          {currentView === "medications" &&
            !selectedMedication &&
            !isCreatingMedication && (
              <MedicationsList
                medications={medications}
                onMedicationSelect={handleMedicationSelect}
                onCreateNew={handleCreateNewMedication}
              />
            )}
          {currentView === "medications" &&
            (selectedMedication || isCreatingMedication) && (
              <MedicationForm
                medication={selectedMedication}
                onSave={handleSaveMedication}
                onDelete={handleDeleteMedication}
                onBack={handleBackToMedications}
                patients={mockAppointments.map((apt) => apt.patient)}
              />
            )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
