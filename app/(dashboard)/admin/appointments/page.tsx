"use client";

import { useState } from "react";
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
import { Calendar, Filter, Edit } from "lucide-react";
import { Appointment } from "@/services/appointment/types";
import Sidebar from "@/components/admin/sidebar";
import { Header } from "@/components/admin";
import {
  useCancelAppointmentByStaff,
  useGetAllAppointments,
  useUpdateAppointmentPaymentStatus,
} from "@/services/appointment/hooks";
import { AppointmentInvoiceModal } from "@/components/appoinment";
import { useAccountId } from "@/hooks/useAccountId";
import { useGetUserProfile } from "@/services/account/hook";
import { StaffProfile } from "@/services/account/types";

function getStatusBadge(status?: string) {
  switch (status) {
    case "SCHEDULED":
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-400">
          Scheduled
        </Badge>
      );
    case "ONGOING":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-400">
          Ongoing
        </Badge>
      );
    case "CANCELLED_BY_PATIENT":
      return (
        <Badge className="bg-orange-100 text-orange-700 border-orange-400">
          Cancelled (by patient)
        </Badge>
      );
    case "CANCELLED_BY_STAFF":
      return (
        <Badge className="bg-red-100 text-red-700 border-red-400">
          Cancelled (by staff)
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge className="bg-green-100 text-green-700 border-green-400">
          Completed
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-200 text-gray-700 border-gray-400">
          Unknown
        </Badge>
      );
  }
}

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { data: appointments = [] } = useGetAllAppointments();
  const cancelAppointmentMutation = useCancelAppointmentByStaff();
  const updatePaymentMutation = useUpdateAppointmentPaymentStatus();

  const accountId = useAccountId();
  const { data: profile } = useGetUserProfile(accountId, "STAFF");
  const staffId = (profile as StaffProfile)?.staffId;
  console.log(staffId);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.patientID
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctor.doctorID
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.paymentStatus === statusFilter;

    let matchesDate = true;
    const dateOnly = appointment.appointmentDate?.split("T")[0];

    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0];
      matchesDate = dateOnly === today;
    } else if (dateFilter === "week") {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      matchesDate =
        dateOnly >= today.toISOString().split("T")[0] &&
        dateOnly <= nextWeek.toISOString().split("T")[0];
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const openDetails = (appt: Appointment) => {
    setSelectedAppt(appt);
    setShowDetailModal(true);
  };

  const getStat = () => {
    const today = new Date().toISOString().split("T")[0];
    const weekFromToday = new Date();
    weekFromToday.setDate(new Date().getDate() + 7);

    return [
      {
        label: "Total Appointments",
        value: appointments.length.toString(),
        color: "blue",
      },
      {
        label: "Today",
        value: appointments
          .filter((a) => a.appointmentDate?.startsWith(today))
          .length.toString(),
        color: "green",
      },
      {
        label: "This Week",
        value: appointments
          .filter(
            (a) =>
              a.appointmentDate >= today &&
              a.appointmentDate <= weekFromToday.toISOString().split("T")[0]
          )
          .length.toString(),
        color: "yellow",
      },
      {
        label: "Anonymous",
        value: appointments.filter((a) => a.isAnonymous).length.toString(),
        color: "red",
      },
    ];
  };

  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointmentMutation.mutate(appointmentId, {
      onSuccess: () => {
        setShowDetailModal(false); // Đóng modal khi hủy xong
      },
    });
  };

  const handleMarkAsPaid = (appointmentId: string) => {
    updatePaymentMutation.mutate(
      {
        appointmentId,
        staffId: staffId || "",
      },
      {
        onSuccess: () => {
          setShowDetailModal(false); // Đóng modal ngay khi thanh toán thành công
        },
      }
    );
  };

  console.log(appointments);

  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <Sidebar />

      <div>
        <Header
          title="Appointment Management"
          subtitle="Schedule, track, and manage all patient appointments"
        />

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {getStat().map((stat, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <Calendar className={`h-8 w-8 text-${stat.color}-600`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by patient ID or doctor ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="UNPAID">Unpaid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Appointments ({filteredAppointments.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Block ngày giờ khám */}
                        <div className="flex flex-col items-center text-center min-w-[80px]">
                          <div className="text-2xl font-bold text-primary">
                            {new Date(appointment.appointmentDate).getDate()}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </div>
                          <div className="text-sm font-medium">
                            {appointment.slot}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge>
                              {appointment.isAnonymous ? "Anonymous" : "Normal"}
                            </Badge>
                            <span>{getStatusBadge(appointment.status)}</span>
                            <Badge
                              className={
                                appointment.paymentStatus === "PAID"
                                  ? "bg-green-100 text-green-700 border-green-400"
                                  : "bg-red-100 text-red-700 border-red-400"
                              }
                            >
                              {appointment.paymentStatus === "PAID"
                                ? "Paid"
                                : appointment.paymentStatus === "UNPAID"
                                ? "Unpaid"
                                : "N/A"}
                            </Badge>
                          </div>

                          {/* Tên dịch vụ & giá */}
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-blue-800">
                              {appointment.medicalService.name}
                            </span>
                            <span className="text-xs font-semibold text-blue-700 bg-blue-50 rounded px-2 py-0.5">
                              {appointment.medicalService.price.toLocaleString()}
                              ₫
                            </span>
                          </div>

                          {/* Bệnh nhân - Bác sĩ */}
                          <div className="flex items-center space-x-3 text-gray-700 text-sm mt-0.5">
                            <span>👤 {appointment.patient.name}</span>
                            <span>🩺 {appointment.doctor.name}</span>
                          </div>

                          {/* Badge trạng thái & thanh toán */}
                          <div className="flex items-center space-x-2 mt-1">
                            {appointment.isAnonymous && (
                              <Badge
                                variant="outline"
                                className="border-blue-400 text-blue-700"
                              >
                                Anonymous
                              </Badge>
                            )}
                          </div>

                          {appointment.note && (
                            <p className="text-sm text-gray-600 mt-2">
                              {appointment.note}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetails(appointment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modal xem chi tiết */}
          <AppointmentInvoiceModal
            open={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            appointment={selectedAppt}
            onMarkAsPaid={handleMarkAsPaid}
            onCancelAppointment={handleCancelAppointment}
          />
        </div>
      </div>
    </div>
  );
}
