"use client";

import { useState } from "react";
import { SideBar, Header } from "@/components/admin";
import { Card, CardTitle } from "@/components/ui/card";
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
  UserCheck,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Phone,
  Mail,
  Trash,
} from "lucide-react";
import { useAllDoctors } from "@/services/doctor/hooks"; // Import the new hook
import type { DoctorResponse } from "@/services/doctor/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DoctorFormModal from "@/components/partials/DoctorFormModal";

export default function ManageDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorResponse | null>(
    null
  );
  const [modalType, setModalType] = useState<
    "view" | "edit" | "delete" | "add" | null
  >(null);

  const { data: doctors = [], isLoading, isError, refetch } = useAllDoctors(); // Using the hook here

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.name ?? "";
    const specialty = doctor.specialty ?? "";
    const email = doctor.account.email ?? "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || doctor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "on_leave":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleOpenModal = (
    doctor: DoctorResponse | null,
    type: "view" | "edit" | "delete" | "add"
  ) => {
    setSelectedDoctor(doctor);
    setModalType(type);
  };

  const handleModalClose = () => {
    setModalType(null);
    setSelectedDoctor(null);
  };

  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <SideBar />
      <div>
        <Header
          title="Manage Doctors"
          subtitle="Doctor management, performance tracking, and administrative control"
        />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search doctors by name, specialty, email, or department..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={modalType === "add"} onOpenChange={handleModalClose}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Doctor</DialogTitle>
                </DialogHeader>
                <DoctorFormModal
                  mode="add"
                  onUpdated={refetch}
                  onClose={handleModalClose}
                />
              </DialogContent>
            </Dialog>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleOpenModal(null, "add")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Doctor
            </Button>
          </div>

          {isLoading ? (
            <p className="text-gray-500 text-center">Loading doctors...</p>
          ) : isError ? (
            <p className="text-red-500 text-center">
              Failed to load doctor list.
            </p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.doctorID}
                  className="bg-white shadow-sm p-4 flex flex-col sm:flex-row items-start gap-4"
                >
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-md object-cover border shadow-sm"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {doctor.specialty}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doctor.degrees}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        {getStatusBadge(doctor.status || "active")}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600 pt-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{doctor.account.phone ?? "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{doctor.account.email ?? "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        <span>{doctor.gender}</span>
                      </div>
                    </div>
                    <div className="block sm:hidden pt-2">
                      {getStatusBadge(doctor.status || "active")}
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      {/* View Modal */}
                      <Dialog
                        open={
                          modalType === "view" &&
                          selectedDoctor?.doctorID === doctor.doctorID
                        }
                        onOpenChange={handleModalClose}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Doctor Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Name:</strong> {selectedDoctor?.name}
                            </p>
                            <p>
                              <strong>Specialty:</strong>{" "}
                              {selectedDoctor?.specialty}
                            </p>
                            <p>
                              <strong>Degrees:</strong>{" "}
                              {selectedDoctor?.degrees}
                            </p>
                            <p>
                              <strong>Gender:</strong> {selectedDoctor?.gender}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {selectedDoctor?.email ?? "N/A"}
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              {selectedDoctor?.phone ?? "N/A"}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Edit Modal */}
                      <Dialog
                        open={
                          modalType === "edit" &&
                          selectedDoctor?.doctorID === doctor.doctorID
                        }
                        onOpenChange={handleModalClose}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Doctor</DialogTitle>
                          </DialogHeader>
                          <DoctorFormModal
                            doctor={selectedDoctor!}
                            mode="edit"
                            onUpdated={refetch}
                            onClose={handleModalClose}
                          />
                        </DialogContent>
                      </Dialog>

                      {/* Delete Modal */}
                      <Dialog
                        open={
                          modalType === "delete" &&
                          selectedDoctor?.doctorID === doctor.doctorID
                        }
                        onOpenChange={handleModalClose}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Doctor</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <p>
                              Are you sure you want to delete{" "}
                              <strong>{selectedDoctor?.name}</strong>?
                            </p>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={handleModalClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                // onClick={async () => {
                                //   try {
                                //     await deleteDoctor(selectedDoctor!.doctorID);
                                //     toast.success("Doctor deleted successfully!");
                                //     refetch(); // Refetch data after delete
                                //     handleModalClose();
                                //   } catch (error) {
                                //     toast.error("Failed to delete doctor.");
                                //     console.error(error);
                                //   }
                                // }}
                              >
                                Confirm Delete
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Action Buttons */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => handleOpenModal(doctor, "view")}
                      >
                        <Eye className="w-4 h-4" /> View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                        onClick={() => handleOpenModal(doctor, "edit")}
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleOpenModal(doctor, "delete")}
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
