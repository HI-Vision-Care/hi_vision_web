"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  TestTube,
  Trash2,
} from "lucide-react";
import { getAllPatients, updatePatient } from "@/services/auth/api";
import type { PatientUI } from "@/services/auth/types";
import PatientFormModal from "@/components/partials/PatientFormModal";
import ConfirmDeleteModal from "@/components/partials/ConfirmDeleteModal";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patients, setPatients] = useState<PatientUI[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<PatientUI | null>(null);
  const [deletingPatientId, setDeletingPatientId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        const mapped = data
          .filter((p) => p.patientID && p.name && p.dob)
          .map(
            (p): PatientUI => ({
              id: p.patientID,
              name: p.name,
              age: calculateAge(p.dob),
              gender: p.gender ?? "Unknown",
              phone: p.medNo || "N/A",
              lastVisit: p.medDate || "2024-01-01",
              nextAppointment: "2024-01-20",
              status: "active",
              arvRegimen: "TDF + 3TC + DTG",
              cd4Count: 500,
              viralLoad: "Undetectable",
            })
          );
        setPatients(mapped);
      } catch (err) {
        console.error("Failed to load patients", err);
      }
    };
    fetchPatients();
  }, []);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return 0;
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const filteredPatients = patients.filter((patient) => {
    const name = patient.name ?? "";
    const id = patient.id ?? "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active Treatment
          </Badge>
        );
      case "needs_attention":
        return <Badge variant="destructive">Needs Attention</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Header
        title="Patient Management"
        subtitle="Monitor and manage HIV patient information and treatment progress"
      />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by patient name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active Treatment</SelectItem>
              <SelectItem value="needs_attention">Needs Attention</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setEditingPatient(null);
              setShowModal(true);
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Patient List ({filteredPatients.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-lg">
                            {patient.name}
                          </h3>
                          <span className="text-gray-500">({patient.id})</span>
                          {getStatusBadge(patient.status)}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {patient.age} years old • {patient.gender} •{" "}
                          {patient.phone}
                        </div>
                        <div className="text-sm text-gray-600">
                          Regimen:{" "}
                          <span className="font-medium">
                            {patient.arvRegimen}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-2">
                        Last visit:{" "}
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Next appointment:{" "}
                        {new Date(patient.nextAppointment).toLocaleDateString()}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPatient(patient);
                            setShowModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <TestTube className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeletingPatientId(patient.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium">
                        CD4 Count
                      </div>
                      <div className="text-lg font-bold text-blue-800">
                        {patient.cd4Count} cells/μL
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs text-green-600 font-medium">
                        Viral Load
                      </div>
                      <div className="text-lg font-bold text-green-800">
                        {patient.viralLoad}
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs text-purple-600 font-medium">
                        Treatment Adherence
                      </div>
                      <div className="text-lg font-bold text-purple-800">
                        95%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MODALS */}
      <PatientFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (data) => {
          try {
            if (editingPatient) {
              await updatePatient(data.id, {
                name: data.name,
                dob: new Date().toISOString(), // Hoặc convert từ form nếu có
                gender: data.gender,
                medNo: data.phone,
                medDate: new Date().toISOString(), // Tạm thời, hoặc lấy từ input
                medFac: "Default Clinic", // Hoặc có field input riêng
              });
            }

            setPatients((prev) => {
              const exists = prev.find((p) => p.id === data.id);
              return exists
                ? prev.map((p) => (p.id === data.id ? data : p))
                : [...prev, data];
            });
          } catch (err) {
            console.error("Failed to save patient", err);
          }
          setShowModal(false);
        }}
        initialData={editingPatient}
      />

      <ConfirmDeleteModal
        open={!!deletingPatientId}
        onClose={() => setDeletingPatientId(null)}
        onConfirm={() => {
          setPatients((prev) => prev.filter((p) => p.id !== deletingPatientId));
          setDeletingPatientId(null);
        }}
      />
    </>
  );
}
