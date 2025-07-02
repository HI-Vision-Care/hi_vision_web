"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SideBar } from "@/components/admin";
import { Header } from "@/components/admin";
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
  Trash2,
  Phone,
  Mail,
} from "lucide-react";
import { getAllDoctor } from "@/services/doctor/api";
import type { DoctorResponse } from "@/services/doctor/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface DoctorFormInput {
  fullName: string;
  gender: string;
  specialty: string;
  degrees: string;
}

export default function ManageDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorResponse | null>(
    null
  );
  const [modalType, setModalType] = useState<
    "view" | "edit" | "delete" | "add" | null
  >(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctor();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor: any) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department?.toLowerCase().includes(searchTerm.toLowerCase());

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

  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <SideBar />
      <div className="">
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

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleOpenModal(null, "add")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Doctor
                </Button>
              </DialogTrigger>
              {modalType === "add" && (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                  </DialogHeader>
                  <EditDoctorForm mode="add" />
                </DialogContent>
              )}
            </Dialog>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {filteredDoctors.map((doctor: any) => (
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
                      <p className="text-xs text-gray-500">{doctor.degrees}</p>
                    </div>
                    <div className="hidden sm:block">
                      {getStatusBadge(doctor.status || "active")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600 pt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{doctor.phone ?? "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{doctor.email ?? "N/A"}</span>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleOpenModal(doctor, "view")}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      {modalType === "view" &&
                        selectedDoctor &&
                        selectedDoctor.doctorID === doctor.doctorID && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Doctor Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Name:</strong> {selectedDoctor.name}
                              </p>
                              <p>
                                <strong>Specialty:</strong>{" "}
                                {selectedDoctor.specialty}
                              </p>
                              <p>
                                <strong>Degrees:</strong>{" "}
                                {selectedDoctor.degrees}
                              </p>
                              <p>
                                <strong>Gender:</strong> {selectedDoctor.gender}
                              </p>
                              <p>
                                <strong>Email:</strong>{" "}
                                {selectedDoctor.email ?? "N/A"}
                              </p>
                              <p>
                                <strong>Phone:</strong>{" "}
                                {selectedDoctor.phone ?? "N/A"}
                              </p>
                            </div>
                          </DialogContent>
                        )}
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                          onClick={() => handleOpenModal(doctor, "edit")}
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      {modalType === "edit" &&
                        selectedDoctor &&
                        selectedDoctor.doctorID === doctor.doctorID && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Doctor</DialogTitle>
                            </DialogHeader>
                            <EditDoctorForm
                              doctor={selectedDoctor}
                              mode="edit"
                            />
                          </DialogContent>
                        )}
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleOpenModal(doctor, "delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      {modalType === "delete" &&
                        selectedDoctor?.doctorID === doctor.doctorID && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Doctor</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-gray-600">
                              Are you sure you want to delete{" "}
                              <strong>{selectedDoctor?.name}</strong>?
                            </p>
                            <div className="flex justify-end gap-2 pt-4">
                              <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                              </DialogClose>
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                Confirm Delete
                              </Button>
                            </div>
                          </DialogContent>
                        )}
                    </Dialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditDoctorForm({
  doctor,
  mode = "edit",
}: {
  doctor?: DoctorResponse;
  mode?: "edit" | "add";
}) {
  const { register, handleSubmit } = useForm<DoctorFormInput>({
    defaultValues: {
      fullName: doctor?.name ?? "",
      gender: doctor?.gender ?? "",
      specialty: doctor?.specialty ?? "",
      degrees: doctor?.degrees ?? "",
    },
  });

  const onSubmit = (data: DoctorFormInput) => {
    if (mode === "add") {
      console.log("Add Doctor:", data);
    } else {
      console.log("Update Doctor:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <Input {...register("fullName")} />
      </div>
      <div>
        <label className="text-sm font-medium">Gender</label>
        <Input {...register("gender")} />
      </div>
      <div>
        <label className="text-sm font-medium">Specialty</label>
        <Input {...register("specialty")} />
      </div>
      <div>
        <label className="text-sm font-medium">Degrees</label>
        <Input {...register("degrees")} />
      </div>

      {mode === "edit" && (
        <div className="text-xs text-gray-500 italic">
          Email: {doctor?.email ?? "N/A"}
          <br />
          Phone: {doctor?.phone ?? "N/A"}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-yellow-600 text-white hover:bg-yellow-700"
        >
          {mode === "edit" ? "Save Changes" : "Add Doctor"}
        </Button>
      </div>
    </form>
  );
}
