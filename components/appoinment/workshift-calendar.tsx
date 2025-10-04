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
  TrendingUp,
  Activity,
  CalendarDays,
  Timer,
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
  doctorId: string;
}

function formatTime(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
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
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Work Schedule
              </h1>
              <p className="text-blue-100 text-lg">
                Manage your work shifts and view your schedule
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={viewMode}
                onValueChange={(value: "month" | "week") => setViewMode(value)}
              >
                <SelectTrigger className="w-[140px] bg-white/20 border-white/30 text-white backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month View</SelectItem>
                  <SelectItem value="week">Week View</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={onCreateNew}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Shift
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Enhanced Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-blue-700">
              Total Shifts
            </CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {totalShifts}
            </div>
            <p className="text-xs text-blue-600/70 font-medium">
              All scheduled shifts
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-green-50 to-green-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-green-700">
              Active Now
            </CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {activeShifts}
            </div>
            <p className="text-xs text-green-600/70 font-medium">
              Currently on duty
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-purple-700">
              Upcoming
            </CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {upcomingShifts}
            </div>
            <p className="text-xs text-purple-600/70 font-medium">
              Scheduled shifts
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-orange-700">
              This Week
            </CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <CalendarDays className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {thisWeekShifts}
            </div>
            <p className="text-xs text-orange-600/70 font-medium">
              Shifts this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Calendar */}
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-700">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              {new Intl.DateTimeFormat("vi-VN", {
                month: "long",
                year: "numeric",
              }).format(currentDate)}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-6">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-semibold text-slate-600 bg-slate-50 rounded-lg"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2 h-36" />;
              }

              const dayShifts = getShiftsForDate(date);
              const hasConflict = hasConflicts(date);

              return (
                <div
                  key={date.toISOString()}
                  className={`group p-3 h-36 border-2 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer ${
                    isToday(date)
                      ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-md"
                      : "border-slate-200 hover:border-blue-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-lg font-bold transition-colors duration-200 ${
                        isToday(date)
                          ? "text-blue-600"
                          : "text-slate-700 group-hover:text-blue-600"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                    {hasConflict && (
                      <div className="p-1 bg-red-100 rounded-full">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    {dayShifts.slice(0, 2).map((shift) => (
                      <div
                        key={shift.id}
                        onClick={() => onShiftSelect(shift)}
                        className="cursor-pointer transition-all duration-200"
                      >
                        <Badge
                          className={`${getShiftTypeColor(
                            shift.shiftType || ""
                          )} text-xs px-2 py-1 w-full justify-start rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
                        >
                          <Timer className="h-3 w-3 mr-1" />
                          {formatTime(shift.startTime || "")} -{" "}
                          {formatTime(shift.endTime || "")}
                        </Badge>
                      </div>
                    ))}

                    {dayShifts.length > 2 && (
                      <div
                        className="text-xs text-blue-500 cursor-pointer hover:text-blue-700 font-medium transition-colors duration-200"
                        onClick={() => {
                          setModalShifts(dayShifts);
                          setModalDate(date);
                          setShowAllShiftsModal(true);
                        }}
                      >
                        +{dayShifts.length - 2} more shifts
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

      {/* Enhanced Today's Schedule */}
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-100 border-b">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-green-700">
            <div className="p-2 bg-green-500 rounded-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {getShiftsForDate(today).length > 0 ? (
            <div className="space-y-4">
              {getShiftsForDate(today).map((shift) => (
                <div
                  key={shift.id}
                  className="group flex items-center justify-between p-4 border-2 rounded-xl hover:shadow-md cursor-pointer transition-all duration-200 bg-gradient-to-r from-white to-slate-50 border-slate-200 hover:border-green-300"
                  onClick={() => onShiftSelect(shift)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                      <Timer className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-700 group-hover:text-blue-600 transition-colors duration-200">
                        {formatTime(shift.startTime || "")} -{" "}
                        {formatTime(shift.endTime || "")}
                      </div>
                      {shift.note && (
                        <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{shift.note}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      shift.status || ""
                    )} px-3 py-1 text-sm font-medium shadow-sm group-hover:shadow-md transition-all duration-200`}
                  >
                    {shift.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto flex items-center justify-center">
                  <Clock className="h-8 w-8 text-slate-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plus className="h-3 w-3 text-blue-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                No shifts scheduled for today
              </h3>
              <p className="text-slate-500 mb-6">
                Start your day by scheduling a work shift
              </p>
              <Button
                onClick={onCreateNew}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule a Shift
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showAllShiftsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90vw] p-6 relative animate-in fade-in-0 zoom-in-95 duration-300">
            <button
              className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all duration-200"
              onClick={() => setShowAllShiftsModal(false)}
            >
              ×
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-700 mb-2 text-center">
                All Shifts for{" "}
                {modalDate &&
                  `${modalDate.getDate()}/${
                    modalDate.getMonth() + 1
                  }/${modalDate.getFullYear()}`}
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {modalShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="group flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-slate-50 border-slate-200 hover:border-blue-300"
                  onClick={() => {
                    setShowAllShiftsModal(false);
                    onShiftSelect(shift);
                  }}
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                    <Timer className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        className={`${getShiftTypeColor(
                          shift.shiftType || ""
                        )} text-xs px-2 py-1`}
                      >
                        {formatTime(shift.startTime || "")} -{" "}
                        {formatTime(shift.endTime || "")}
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-600 text-xs px-2 py-1">
                        {shift.status}
                      </Badge>
                    </div>
                    {shift.note && (
                      <div className="text-xs text-slate-500 mt-1">
                        {shift.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
