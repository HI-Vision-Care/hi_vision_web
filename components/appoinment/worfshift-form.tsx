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
import { Appointment } from "@/types";
import { WorkShift } from "@/services/workShift/types";

interface WorkShiftFormProps {
  shift: WorkShift | null;
  onSave: (shift: WorkShift) => void;
  onDelete: (shiftId: string) => void;
  onBack: () => void;
}

export default function WorkShiftForm({
  shift,
  onSave,
  onDelete,
  onBack,
}: WorkShiftFormProps) {
  const [formData, setFormData] = useState<Partial<WorkShift>>({
    doctorId: "dr1",
    doctorName: "Dr. Sarah Wilson",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
    shiftType: "Regular",
    location: "Main Clinic",
    notes: "",
    status: "Scheduled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [conflicts, setConflicts] = useState<{
    appointments: Appointment[];
    overlappingShifts: WorkShift[];
  }>({
    appointments: [],
    overlappingShifts: [],
  });

  useEffect(() => {
    if (shift) {
      setFormData(shift);
    }
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

  const checkConflicts = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) return;

    const shiftStart = new Date(`${formData.date}T${formData.startTime}`);
    const shiftEnd = new Date(`${formData.date}T${formData.endTime}`);

    // Check appointment conflicts
    const conflictingAppointments = appointments.filter((apt) => {
      if (apt.date !== formData.date) return false;

      const aptStart = new Date(`${apt.date}T${apt.time}`);
      const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);

      return shiftStart < aptEnd && aptStart < shiftEnd;
    });

    setConflicts({
      appointments: conflictingAppointments,
      overlappingShifts: [],
    });
  };

  const handleSave = () => {
    if (
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.shiftType ||
      !formData.location
    ) {
      return;
    }

    const shiftToSave: WorkShift = {
      id: formData.id || `ws_${Date.now()}`,
      doctorId: formData.doctorId!,
      doctorName: formData.doctorName!,
      date: formData.date!,
      startTime: formData.startTime!,
      endTime: formData.endTime!,
      shiftType: formData.shiftType as any,
      location: formData.location!,
      note: formData.note || "",
      status: (formData.status as any) || "Scheduled",
      createdAt: formData.createdAt!,
      updatedAt: new Date().toISOString(),
    };

    onSave(shiftToSave);
  };

  const handleDelete = () => {
    if (shift?.id) {
      onDelete(shift.id);
      onBack();
    }
  };

  const getShiftTypeColor = (shiftType: string) => {
    switch (shiftType) {
      case "Available":
        return "bg-blue-100 text-blue-800";
      case "Regular":
        return "bg-primary text-primary-foreground";
      case "On-call":
        return "bg-warning text-warning-foreground";
      case "Emergency":
        return "bg-red-100 text-red-800";
      case "Night":
        return "bg-purple-100 text-purple-800";
      case "Weekend":
        return "bg-secondary text-secondary-foreground";
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

    return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // hours
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
              ? `Last updated: ${new Date(shift.updatedAt).toLocaleString()}`
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
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Shift
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
                  <Label htmlFor="shiftType">Shift Type</Label>
                  <Select
                    value={formData.shiftType}
                    onValueChange={(value) =>
                      handleInputChange("shiftType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular Shift</SelectItem>
                      <SelectItem value="On-call">On-call</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Night">Night Shift</SelectItem>
                      <SelectItem value="Weekend">Weekend</SelectItem>
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
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    handleInputChange("location", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Clinic">Main Clinic</SelectItem>
                    <SelectItem value="Emergency Department">
                      Emergency Department
                    </SelectItem>
                    <SelectItem value="ICU">Intensive Care Unit</SelectItem>
                    <SelectItem value="Surgery">Surgery Department</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics Ward</SelectItem>
                    <SelectItem value="Cardiology">Cardiology Unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about this shift..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
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
                  className={getShiftTypeColor(formData.shiftType || "Regular")}
                >
                  {formData.shiftType}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">{duration.toFixed(1)} hours</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{formData.location}</span>
                </div>
              </div>

              {formData.date && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(formData.date).toLocaleDateString()}
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
