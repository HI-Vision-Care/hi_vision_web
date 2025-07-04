"use client";

import { useState, useEffect } from "react";
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
import { Users, Search, Filter, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  getAllPatients,
  updatePatient,
  deletePatient,
} from "@/services/patient/api";
import { PatientUI } from "@/services/patient/types";
import { Header } from "@/components/admin";
import { ConfirmDeleteModal, PatientFormModal } from "@/components/partials";

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
        const mapped = data.map(
          (p): PatientUI => ({
            id: p.patientID,
            name: p.name,
            age: calculateAge(p.dob),
            gender: p.gender ?? "Unknown",
            phone: p.medNo || "N/A",
            lastVisit: p.medDate || "",
            status: "active",
            dob: p.dob,
            medDate: p.medDate,
            medFac: p.medFac || "",
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
    if (!dob || isNaN(birthDate.getTime())) return 0;
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
            Active
          </Badge>
        );
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
        subtitle="Monitor and manage HIV patient information"
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
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

                        <div className="text-sm text-gray-600 mt-2 grid gap-1">
                          <div>
                            <span className="font-medium">Age:</span>{" "}
                            {patient.age} years old
                          </div>
                          <div>
                            <span className="font-medium">Gender:</span>{" "}
                            {patient.gender}
                          </div>
                          {patient.phone !== "N/A" && (
                            <div>
                              <span className="font-medium">Medical No:</span>{" "}
                              {patient.phone}
                            </div>
                          )}
                          {patient.medFac && (
                            <div>
                              <span className="font-medium">Facility:</span>{" "}
                              {patient.medFac}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-2">
                        Last visit:{" "}
                        {patient.lastVisit
                          ? new Date(patient.lastVisit).toLocaleDateString()
                          : "N/A"}
                      </div>

                      <div className="flex space-x-2 mt-2">
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal thêm/sửa bệnh nhân */}
      <PatientFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (data) => {
          try {
            if (editingPatient) {
              await updatePatient(data.id, {
                name: data.name,
                dob: data.dob,
                gender: data.gender,
                medNo: data.phone,
                medDate: data.medDate,
                medFac: data.medFac,
              });
              toast.success("Patient updated successfully!");
            } else {
              toast.success("Patient added locally!");
            }

            setPatients((prev) => {
              const exists = prev.find((p) => p.id === data.id);
              return exists
                ? prev.map((p) => (p.id === data.id ? data : p))
                : [...prev, data];
            });
          } catch (err) {
            console.error("Failed to save patient", err);
            toast.error("Failed to save patient");
          }
          setShowModal(false);
        }}
        initialData={editingPatient}
      />

      {/* Modal xác nhận xóa */}
      <ConfirmDeleteModal
        open={!!deletingPatientId}
        onClose={() => setDeletingPatientId(null)}
        onConfirm={async () => {
          if (!deletingPatientId) return;

          try {
            await deletePatient(deletingPatientId);
            setPatients((prev) =>
              prev.filter((p) => p.id !== deletingPatientId)
            );
            toast.success("Patient deleted successfully");
          } catch (err) {
            console.error("Delete failed", err);
            toast.error("Failed to delete patient");
          }

          setDeletingPatientId(null);
        }}
      />
    </>
  );
}
