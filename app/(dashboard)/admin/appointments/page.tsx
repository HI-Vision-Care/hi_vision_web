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
import { Calendar, Filter, Eye, Edit, Clock } from "lucide-react";
import { Appointment } from "@/services/appointment/types";
import Sidebar from "@/components/admin/sidebar";
import { Header } from "@/components/admin";
import { useGetAllAppointments } from "@/services/appointment/hooks";

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { data: appointments = [] } = useGetAllAppointments();

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorID.toLowerCase().includes(searchTerm.toLowerCase());

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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
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
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className="text-lg font-bold">
                            {new Date(appointment.appointmentDate).getDate()}
                          </div>
                          <div className="text-sm font-medium">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-lg">
                              Pid: {appointment.patientID}
                            </h3>
                            <Badge>
                              {appointment.isAnonymous ? "Anonymous" : "Normal"}
                            </Badge>
                            <Badge>{appointment.status ?? "Null"}</Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <span>Did: {appointment.doctorID}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.serviceID}</span>
                            </div>
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
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
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
          {showDetailModal && selectedAppt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4 animate-fade-in">
                <h3 className="text-2xl font-semibold text-blue-700 border-b pb-2">
                  Appointment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
                  <div>
                    <span className="font-medium text-gray-500">
                      Patient ID:
                    </span>{" "}
                    {selectedAppt.patientID}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Doctor ID:
                    </span>{" "}
                    {selectedAppt.doctorID}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Service ID:
                    </span>{" "}
                    {selectedAppt.serviceID}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Time:</span>{" "}
                    {new Date(selectedAppt.appointmentDate).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Anonymous:
                    </span>{" "}
                    {selectedAppt.isAnonymous ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Note:</span>{" "}
                    {selectedAppt.note || "No note"}
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <span className="font-medium text-gray-500">URL Link:</span>{" "}
                    <span className="break-words text-blue-600">
                      {selectedAppt.urlLink || "N/A"}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
