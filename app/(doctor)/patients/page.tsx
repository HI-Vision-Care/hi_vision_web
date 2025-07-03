"use client";

import { AppSidebar } from "@/components/appoinment/app-sidebar";
import { AppointmentDetail } from "@/components/appoinment/appoinment-detail";
import { AppointmentsList } from "@/components/appoinment/appointments-list";
import { DashboardHeader } from "@/components/appoinment/dashboard-header";
import { DashboardOverview } from "@/components/appoinment/dashboard-overview";
import { MedicalRecordForm } from "@/components/appoinment/medical-record-form";
import { MedicalRecordsList } from "@/components/appoinment/medical-records-list";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { mockMedicalRecords } from "@/constants";
import { Appointment, AppointmentStatus, MedicalRecord } from "@/types";
import { useState } from "react";

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patient: {
      id: "p1",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, City, State 12345",
      medicalHistory: ["Hypertension", "Type 2 Diabetes"],
      allergies: ["Penicillin", "Shellfish"],
      currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
      emergencyContact: {
        name: "John Johnson",
        phone: "+1 (555) 987-6543",
        relationship: "Spouse",
      },
    },
    date: "2024-01-15",
    time: "09:00",
    duration: 30,
    type: "Follow-up",
    status: "SCHEDULED",
    notes: "Regular diabetes check-up",
    symptoms: ["Fatigue", "Increased thirst"],
    diagnosis: "Type 2 Diabetes - Well controlled",
    prescription: ["Continue Metformin", "Increase water intake"],
    labResults: [
      {
        test: "HbA1c",
        result: "6.8%",
        normalRange: "<7.0%",
        status: "normal",
      },
      {
        test: "Fasting Glucose",
        result: "145 mg/dL",
        normalRange: "70-100 mg/dL",
        status: "abnormal",
      },
    ],
  },
  {
    id: "2",
    patient: {
      id: "p2",
      name: "Michael Chen",
      age: 28,
      gender: "Male",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@email.com",
      address: "456 Oak Ave, City, State 12345",
      medicalHistory: ["Asthma"],
      allergies: ["Dust mites"],
      currentMedications: ["Albuterol inhaler"],
      emergencyContact: {
        name: "Lisa Chen",
        phone: "+1 (555) 876-5432",
        relationship: "Sister",
      },
    },
    date: "2024-01-15",
    time: "09:30",
    duration: 45,
    type: "Consultation",
    status: "ONGOING",
    notes: "Chest pain evaluation",
    symptoms: ["Chest pain", "Shortness of breath"],
  },
  {
    id: "3",
    patient: {
      id: "p3",
      name: "Emily Rodriguez",
      age: 45,
      gender: "Female",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@email.com",
      address: "789 Pine St, City, State 12345",
      medicalHistory: ["Migraine", "Anxiety"],
      allergies: ["None known"],
      currentMedications: ["Sumatriptan", "Sertraline 50mg"],
      emergencyContact: {
        name: "Carlos Rodriguez",
        phone: "+1 (555) 765-4321",
        relationship: "Husband",
      },
    },
    date: "2024-01-15",
    time: "10:15",
    duration: 30,
    type: "Follow-up",
    status: "COMPLETED",
    notes: "Migraine management review",
    symptoms: ["Headache", "Nausea"],
    diagnosis: "Chronic Migraine - Stable",
    prescription: [
      "Continue current medications",
      "Stress management techniques",
    ],
  },
];

export default function DoctorDashboard() {
  const [currentView, setCurrentView] = useState<
    "overview" | "appointments" | "medical-records" | "medical-record-form"
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
  const [medicalRecords, setMedicalRecords] =
    useState<MedicalRecord[]>(mockMedicalRecords);

  const updateAppointmentStatus = (
    appointmentId: string,
    newStatus: AppointmentStatus
  ) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );

    if (selectedAppointment?.id === appointmentId) {
      setSelectedAppointment((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

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

  const handleSaveMedicalRecord = (record: MedicalRecord) => {
    if (record.id) {
      setMedicalRecords((prev) =>
        prev.map((r) => (r.id === record.id ? record : r))
      );
    } else {
      const newRecord = { ...record, id: `mr${Date.now()}` };
      setMedicalRecords((prev) => [...prev, newRecord]);
    }
    setIsCreatingRecord(false);
    setSelectedMedicalRecord(record);
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
            <DashboardOverview
              appointments={appointments}
              onAppointmentSelect={handleAppointmentSelect}
            />
          )}
          {currentView === "appointments" && !selectedAppointment && (
            <AppointmentsList
              appointments={appointments}
              onAppointmentSelect={handleAppointmentSelect}
            />
          )}
          {currentView === "appointments" && selectedAppointment && (
            <AppointmentDetail
              appointment={selectedAppointment}
              onStatusUpdate={updateAppointmentStatus}
              onBack={handleBackToList}
              onViewChange={handleViewChange}
            />
          )}
          {currentView === "medical-records" &&
            !selectedMedicalRecord &&
            !isCreatingRecord && (
              <MedicalRecordsList
                appointmentId={selectedAppointmentId}
                medicalRecords={medicalRecords}
                onRecordSelect={handleMedicalRecordSelect}
                onCreateNew={handleCreateNewRecord}
              />
            )}
          {currentView === "medical-records" &&
            (selectedMedicalRecord || isCreatingRecord) && (
              <MedicalRecordForm
                appointmentId={selectedAppointmentId}
                record={selectedMedicalRecord}
                onSave={handleSaveMedicalRecord}
                onBack={handleBackToMedicalRecords}
                patients={mockAppointments.map((apt) => apt.patient)}
              />
            )}

          {currentView === "medical-record-form" && (
            <MedicalRecordForm
              appointmentId={selectedAppointmentId}
              record={null}
              onSave={handleSaveMedicalRecord}
              onBack={() => setCurrentView("appointments")}
              patients={mockAppointments.map((apt) => apt.patient)}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
