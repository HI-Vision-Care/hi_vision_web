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
  WorkShiftCalendar,
  WorkshiftForm,
} from "@/components/appoinment";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAccountId } from "@/hooks/useAccountId";
import { useGetUserProfile } from "@/services/account/hook";
import { useAllMedicalRecords } from "@/services/doctor/hooks";
import { useWorkShiftsByDoctorId } from "@/services/workShift/hooks";
import { WorkShift } from "@/services/workShift/types";
import {
  Appointment,
  DashboardView,
  MedicalRecord,
  Medication,
  ViewChangeOptions,
} from "@/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DoctorDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const accountId = useAccountId();
  const { data: profile } = useGetUserProfile(accountId, role);

  useEffect(() => {
    const userRole = Cookies.get("role");
    setRole(userRole || null);
  }, []);

  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [selectedMedicalRecord, setSelectedMedicalRecord] =
    useState<MedicalRecord | null>(null);
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);
  const doctorId = profile?.doctorID;
  const { data: workShifts = [] } = useWorkShiftsByDoctorId(doctorId || "");
  const [isCreatingShift, setIsCreatingShift] = useState(false);

  const [selectedWorkShift, setSelectedWorkShift] = useState<WorkShift | null>(
    null
  );

  const [prescribedBy, setPrescribedBy] = useState<string | undefined>(
    undefined
  );

  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [isCreatingMedication, setIsCreatingMedication] = useState(false);

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
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

  const handleViewChange = (options: ViewChangeOptions) => {
    setCurrentView(options.view);
    if (options.appointmentId) setSelectedAppointmentId(options.appointmentId);
    if (options.patientId) setSelectedPatientId(options.patientId);
    if (options.prescribedBy) setPrescribedBy(options.prescribedBy);

    if (options.view === "medications" && options.createNew) {
      setSelectedMedication(null);
      setIsCreatingMedication(true);
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

  const handleBackToMedications = () => {
    setSelectedMedication(null);
    setIsCreatingMedication(false);
  };

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
                doctorName={profile?.name || ""}
              />
            )}

          {currentView === "medical-record-form" && (
            <MedicalRecordForm
              appointmentId={selectedAppointmentId ?? ""}
              record={null}
              onBack={() => setCurrentView("appointments")}
              doctorName={profile?.name || ""}
              onSuccess={() => {
                // Khi tạo thành công record, quay lại detail và refetch appointment (nếu có hook)
                setCurrentView("appointments");
                // Nếu bạn dùng SWR/react-query/fetch lại appointment detail ở AppointmentDetail
                // thì nó sẽ update isRecordCreated => UI hiện ngay prescription
              }}
            />
          )}

          {currentView === "schedule" &&
            !selectedWorkShift &&
            !isCreatingShift && (
              <WorkShiftCalendar
                workShifts={workShifts}
                onShiftSelect={handleWorkShiftSelect}
                onCreateNew={handleCreateNewShift}
                doctorId={doctorId}
              />
            )}
          {currentView === "schedule" &&
            (selectedWorkShift || isCreatingShift) && (
              <WorkshiftForm
                shift={selectedWorkShift}
                onSave={handleSaveWorkShift}
                onDelete={handleDeleteWorkShift}
                onBack={handleBackToSchedule}
                doctorId={doctorId || ""}
                doctorName={profile?.name || ""}
              />
            )}
          {/* {currentView === "medications" &&
            !selectedMedication &&
            !isCreatingMedication && (
              <MedicationsList
                medications={}
                onMedicationSelect={handleMedicationSelect}
                onCreateNew={handleCreateNewMedication}
              />
            )} */}
          {currentView === "medications" &&
            (selectedMedication || isCreatingMedication) && (
              <MedicationForm
                onBack={() => setCurrentView("appointments")}
                AppontmentId={selectedAppointment?.appointmentID || ""}
                prescribedBy={prescribedBy}
              />
            )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
