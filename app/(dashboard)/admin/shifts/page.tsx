"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Users, AlertCircle, Plus, Calendar } from "lucide-react";
import Header from "@/components/admin/header";
import { WorkShift } from "@/services/workShift/types";
import { getWorkShifts } from "@/services/workShift/api";
import { useRouter } from "next/navigation";

export default function Shifts() {
  const [selectedMonth, setSelectedMonth] = useState("2025-07");
  const [shifts, setShifts] = useState<WorkShift[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadShifts = async () => {
      try {
        const data = await getWorkShifts();
        setShifts(data);
      } catch (err) {
        console.error("Failed to fetch shifts", err);
      }
    };
    loadShifts();
  }, []);

  const shiftStats = [
    { label: "Total Shifts", value: shifts.length.toString(), color: "blue" },
    {
      label: "Booked",
      value: shifts.filter((s) => s.status === "Booked").length.toString(),
      color: "green",
    },
    {
      label: "Available",
      value: shifts.filter((s) => s.status !== "Booked").length.toString(),
      color: "red",
    },
    {
      label: "With Note",
      value: shifts.filter((s) => s.note).length.toString(),
      color: "orange",
    },
  ];

  const doctors = useMemo(() => {
    const doctorMap = new Map<
      string,
      { name: string; specialty: string; shifts: number }
    >();

    for (const shift of shifts) {
      const doctor = shift.doctor;
      if (!doctor) continue;

      const shiftMonth = format(new Date(shift.date), "yyyy-MM");
      if (shiftMonth !== selectedMonth) continue;

      const key = doctor.doctorID;
      if (!doctorMap.has(key)) {
        doctorMap.set(key, {
          name: doctor.name,
          specialty: doctor.specialty,
          shifts: 1,
        });
      } else {
        doctorMap.get(key)!.shifts += 1;
      }
    }

    return Array.from(doctorMap.values());
  }, [shifts, selectedMonth]);

  return (
    <>
      <Header
        title="Shift Management"
        subtitle="Assign and monitor medical staff shifts and schedules"
      />

      <div className="p-6">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-07">July 2025</SelectItem>
                <SelectItem value="2025-08">August 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Shift
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {shiftStats.map((stat, index) => (
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
                  <Clock className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shift Schedule */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Shift Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-500">
                              {new Date(shift.date).toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                              )}
                            </div>
                            <div className="text-lg font-bold">
                              {new Date(shift.date).getDate()}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="default">{shift.slot}</Badge>
                              {shift.note
                                ?.toLowerCase()
                                .includes("emergency") && (
                                <Badge
                                  variant="destructive"
                                  className="flex items-center"
                                >
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Emergency
                                </Badge>
                              )}
                            </div>

                            {shift.doctor?.name && (
                              <div className="text-sm text-gray-800 mt-1">
                                Doctor:{" "}
                                <span className="font-medium">
                                  {shift.doctor.name}
                                </span>
                              </div>
                            )}

                            <div className="text-sm text-gray-600 mt-1">
                              {new Date(shift.startTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}{" "}
                              -{" "}
                              {new Date(shift.endTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="font-medium mt-1">
                              {shift.note || "No note"}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge
                            variant={
                              shift.status === "Đã đặt"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {shift.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Availability */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Available Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-600">
                        {doctor.specialty}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {doctor.shifts} shifts
                      </div>
                      <div className="text-xs text-gray-500">this month</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => router.push("/admin/doctors")}
              >
                View All Doctors
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
