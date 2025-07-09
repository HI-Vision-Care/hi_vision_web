"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WorkShift } from "@/services/workShift/types";

interface WorkShiftCalendarProps {
  workShifts: WorkShift[];
  onShiftSelect: (shift: WorkShift) => void;
  onCreateNew: () => void;
}

function formatTime(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function WorkShiftCalendar({
  workShifts,
  onShiftSelect,
  onCreateNew,
}: WorkShiftCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get calendar days for the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const [showAllShiftsModal, setShowAllShiftsModal] = useState(false);
  const [modalShifts, setModalShifts] = useState<WorkShift[]>([]);
  const [modalDate, setModalDate] = useState<Date | null>(null);

  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentYear, currentMonth, day));
  }

  const getShiftsForDate = (date: Date) => {
    const dateString =
      date.getFullYear().toString().padStart(4, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    return workShifts.filter(
      (shift) => shift.date && shift.date.split("T")[0] === dateString
    );
  };

  const getShiftTypeColor = (shiftType: string) => {
    switch (shiftType) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-success text-success-foreground";
      case "Scheduled":
        return "bg-primary text-primary-foreground";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const hasConflicts = (date: Date) => {
    const shifts = getShiftsForDate(date);

    // Check for overlapping shifts
    for (let i = 0; i < shifts.length; i++) {
      for (let j = i + 1; j < shifts.length; j++) {
        const shift1Start = new Date(
          `${shifts[i].date}T${shifts[i].startTime}`
        );
        const shift1End = new Date(`${shifts[i].date}T${shifts[i].endTime}`);
        const shift2Start = new Date(
          `${shifts[j].date}T${shifts[j].startTime}`
        );
        const shift2End = new Date(`${shifts[j].date}T${shifts[j].endTime}`);

        if (shift1Start < shift2End && shift2Start < shift1End) {
          return true;
        }
      }
    }

    return false;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate statistics
  const totalShifts = workShifts.length;
  const activeShifts = workShifts.filter(
    (s) => s.status === "Available"
  ).length;
  const upcomingShifts = workShifts.filter(
    (s) => s.status === "Scheduled"
  ).length;
  const thisWeekShifts = workShifts.filter((s) => {
    if (!s.date) return false;
    const shiftDate = new Date(s.date);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return shiftDate >= weekStart && shiftDate <= weekEnd;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Schedule</h1>
          <p className="text-muted-foreground">
            Manage your work shifts and view your schedule
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={viewMode}
            onValueChange={(value: "month" | "week") => setViewMode(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={onCreateNew}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Shift
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShifts}</div>
            <p className="text-xs text-muted-foreground">
              All scheduled shifts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {activeShifts}
            </div>
            <p className="text-xs text-muted-foreground">Currently on duty</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {upcomingShifts}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Users className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {thisWeekShifts}
            </div>
            <p className="text-xs text-muted-foreground">Shifts this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {monthNames[currentMonth]} {currentYear}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2 h-32" />;
              }

              const dayShifts = getShiftsForDate(date);
              const hasConflict = hasConflicts(date);

              return (
                <div
                  key={date.toISOString()}
                  className={`p-2 h-32 border rounded-lg transition-colors hover:bg-muted/50 ${
                    isToday(date)
                      ? "bg-primary/10 border-primary"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        isToday(date) ? "text-primary" : ""
                      }`}
                    >
                      {date.getDate()}
                    </span>
                    {hasConflict && (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayShifts.slice(0, 2).map((shift) => (
                      <div
                        key={shift.id}
                        onClick={() => onShiftSelect(shift)}
                        className="cursor-pointer"
                      >
                        <Badge
                          className={`${getShiftTypeColor(
                            shift.shiftType || ""
                          )} text-xs px-1 py-0 w-full justify-start`}
                        >
                          {formatTime(shift.startTime || "")} -{" "}
                          {formatTime(shift.endTime || "")}
                        </Badge>
                      </div>
                    ))}

                    {dayShifts.length > 2 && (
                      <div
                        className="text-xs text-blue-500 cursor-pointer "
                        onClick={() => {
                          setModalShifts(dayShifts);
                          setModalDate(date);
                          setShowAllShiftsModal(true);
                        }}
                      >
                        +{dayShifts.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conflicts Alert */}
      {workShifts.some((shift) =>
        hasConflicts(shift.date ? new Date(shift.date) : new Date())
      ) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Schedule Conflicts Detected:</strong> Some shifts have
            overlapping times. Please review and adjust your schedule.
          </AlertDescription>
        </Alert>
      )}

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Todays Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {getShiftsForDate(today).length > 0 ? (
            <div className="space-y-3">
              {getShiftsForDate(today).map((shift) => (
                <div
                  key={shift.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => onShiftSelect(shift)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium">
                      {formatTime(shift.startTime || "")} -{" "}
                      {formatTime(shift.endTime || "")}
                    </div>
                    <Badge className={getStatusColor(shift.status || "")}>
                      {shift.status}
                    </Badge>
                  </div>
                  {shift.note && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      {shift.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No shifts scheduled for today</p>
              <Button
                onClick={onCreateNew}
                variant="outline"
                className="mt-2 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule a Shift
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showAllShiftsModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[340px] max-w-[90vw] p-6 relative">
            <button
              className="absolute top-3 right-4 text-xl text-gray-400 hover:text-black"
              onClick={() => setShowAllShiftsModal(false)}
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-3 text-center">
              All Slots for{" "}
              {modalDate &&
                `${modalDate.getDate()}/${
                  modalDate.getMonth() + 1
                }/${modalDate.getFullYear()}`}
            </h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {modalShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setShowAllShiftsModal(false);
                    onShiftSelect(shift);
                  }}
                >
                  <Badge
                    className={`${getShiftTypeColor(
                      shift.shiftType || ""
                    )} text-xs px-1 py-0`}
                  >
                    {formatTime(shift.startTime || "")} -{" "}
                    {formatTime(shift.endTime || "")}
                  </Badge>
                  <span className="ml-2 text-sm">{shift.status}</span>
                  {shift.note && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {shift.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
