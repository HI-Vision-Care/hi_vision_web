/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Clock,
  MapPin,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WorkShift } from "@/services/workShift/types";
import {
  useRegisterWorkShifts,
  useUpdateWorkShift,
} from "@/services/workShift/hooks";

interface WorkShiftFormProps {
  shift: WorkShift | null;
  onSave: (shift: WorkShift) => void;
  onDelete: (shiftId: string) => void;
  onBack: () => void;
  doctorId: string;
}

export default function WorkShiftForm({
  shift,
  onSave,
  onDelete,
  onBack,
  doctorId,
}: WorkShiftFormProps) {
  type AppointmentConflict = {
    id: string;
    patient: { name: string };
    time: string;
    type: string;
  };

  type ShiftConflict = {
    id: string;
    // add other properties if needed
  };

  const [conflicts, setConflicts] = useState<{
    appointments: AppointmentConflict[];
    overlappingShifts: ShiftConflict[];
  }>({
    appointments: [],
    overlappingShifts: [],
  });

  const { mutate: registerShifts, isPending: isRegistering } =
    useRegisterWorkShifts({
      onSuccess: () => onBack(),
    });
  const { mutate: updateShift, isPending: isUpdating } = useUpdateWorkShift({
    onSuccess: () => onBack(),
  });
  const isSaving = isRegistering || isUpdating;

  const toDateInputValue = (iso: string) => {
    if (!iso) return "";
    return iso.split("T")[0];
  };

  const toTimeInputValue = (isoOrTime: string) => {
    if (!isoOrTime) return "";
    // Nếu là dạng full ISO
    if (isoOrTime.includes("T")) {
      return isoOrTime.split("T")[1].slice(0, 5);
    }
    // Nếu là dạng "13:00:00"
    if (isoOrTime.length === 8 && isoOrTime[2] === ":") {
      return isoOrTime.slice(0, 5);
    }
    // Nếu đúng luôn là "13:00"
    return isoOrTime;
  };

  const [formData, setFormData] = useState<Partial<WorkShift>>({
    doctorId: "dr1",
    doctorName: "Dr. Sarah Wilson",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
    note: "",
    status: "Available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const checkConflicts = () => {
    // Tạm chưa check, luôn rỗng (sửa lại sau)
    setConflicts({
      appointments: [],
      overlappingShifts: [],
    });
  };

  useEffect(() => {
    if (shift) {
      setFormData({
        ...formData,
        ...shift,
        date: toDateInputValue(shift.date || ""),
        startTime: toTimeInputValue(shift.startTime || ""),
        endTime: toTimeInputValue(shift.endTime || ""),
        status: shift.status || "Available", // dùng đúng status
      });
    }
    // eslint-disable-next-line
  }, [shift]);

  useEffect(() => {
    checkConflicts();
  }, [formData.date, formData.startTime, formData.endTime]);

  const handleInputChange = (field: keyof WorkShift, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Sửa handleSave:
  const handleSave = () => {
    const date = formData.date; // "yyyy-MM-dd"
    const startTime = formData.startTime; // "HH:mm"
    const endTime = formData.endTime; // "HH:mm"

    const fullStart = date && startTime ? `${date}T${startTime}:00` : "";
    const fullEnd = date && endTime ? `${date}T${endTime}:00` : "";

    // Suy luận slot đơn giản theo giờ bắt đầu
    let slot = "Morning";
    const h = startTime ? parseInt(startTime.split(":")[0], 10) : 8;
    if (h >= 12 && h < 18) slot = "Afternoon";
    if (h >= 18) slot = "Evening";

    if (!shift?.id) {
      // ----- NEW SHIFT -> REGISTER -----
      if (doctorId) {
        const payload = [
          {
            slot,
            date,
            startTime: fullStart,
            endTime: fullEnd,
            note: formData.note ?? "",
          },
        ];
        registerShifts({ doctorID: doctorId, payload });
      }
    } else {
      // ----- EDIT SHIFT -> UPDATE -----
      updateShift({
        wsID: shift.id,
        payload: {
          slot,
          date,
          startTime: fullStart,
          endTime: fullEnd,
          status: formData.status, // giữ status người dùng chọn
          note: formData.note ?? null,
        },
      });
    }

    // (tuỳ chọn) giữ lại onSave local nếu bạn vẫn muốn cập nhật UI tạm thời:
    const shiftToSave: WorkShift = {
      ...formData,
      startTime: fullStart,
      endTime: fullEnd,
      date,
    } as WorkShift;
    onSave(shiftToSave);
  };

  const handleDelete = () => {
    if (shift?.id) {
      onDelete(String(shift.id));
      onBack();
    }
  };

  const getShiftTypeColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-primary text-primary-foreground";
      case "Active":
        return "bg-success text-success-foreground";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateDuration = () => {
    if (!formData.startTime || !formData.endTime) return 0;

    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);

    if (end < start) {
      // Handle overnight shifts
      end.setDate(end.getDate() + 1);
    }

    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (isNaN(duration) || duration < 0) return 0;
    return duration;
  };

  const duration = calculateDuration();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {shift ? "Edit Work Shift" : "New Work Shift"}
          </h1>
          <p className="text-muted-foreground">
            {shift
              ? `Last updated: ${new Date(shift.updatedAt ?? "").toLocaleString(
                  "vi-VN",
                  { hour12: false }
                )}`
              : "Schedule a new work shift"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {shift && (
            <Button
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Đang lưu..." : "Save Shift"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Shift Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
                    <span className="text-sm font-medium">
                      {duration.toFixed(1)} hours
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  placeholder="Additional note about this shift..."
                  value={formData.note ?? ""}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Conflicts */}
          {(conflicts.appointments.length > 0 ||
            conflicts.overlappingShifts.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  Schedule Conflicts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {conflicts.appointments.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Appointment Conflicts:</strong> This shift
                      overlaps with {conflicts.appointments.length}{" "}
                      appointment(s):
                      <ul className="mt-2 space-y-1">
                        {conflicts.appointments.map((apt) => (
                          <li key={apt.id} className="text-sm">
                            • {apt.patient.name} at {apt.time} ({apt.type})
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shift Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Shift Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <Badge
                  className={getShiftTypeColor(formData.status || "Available")}
                >
                  {formData.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">{duration.toFixed(1)} hours</span>
              </div>

              {formData.date && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(formData.date!).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shift Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Shift Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Regular Shifts:</strong> 8-hour standard shifts during
                  business hours
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Night Shifts:</strong> Ensure adequate rest between
                  shifts (minimum 8 hours)
                </AlertDescription>
              </Alert>

              <Alert>
                <MapPin className="h-4 w-4" />
                <AlertDescription>
                  <strong>On-call:</strong> Must be available within 30 minutes
                  of being called
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
