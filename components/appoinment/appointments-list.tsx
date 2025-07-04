import { useState, useMemo } from "react";
import { useAccountId } from "@/hooks/useAccountId";
import {
  useGetDoctorProfile,
  useGetAppointmentsByDoctorId,
} from "@/services/doctor/hooks";
import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AppointmentsList({ onAppointmentSelect }) {
  // Lấy accountId → doctorProfile → doctorID → appointments
  const accountId = useAccountId();
  const { data: doctorProfile, isLoading: isProfileLoading } =
    useGetDoctorProfile(accountId);
  const doctorID = doctorProfile?.doctorID;
  const { data: appointments = [], isLoading: isAppointmentsLoading } =
    useGetAppointmentsByDoctorId(doctorID, !!doctorID);

  // State filter/search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mapping lại data cho đúng UI filter
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        (appointment.patientName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (appointment.serviceName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-yellow-100 text-warning-foreground";
      case "COMPLETED":
        return "bg-green-300 text-success-foreground";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return <Clock className="h-3 w-3" />;
      case "ONGOING":
        return <User className="h-3 w-3" />;
      case "COMPLETED":
        return <Calendar className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  // Hàm format giờ VN
  function formatTimeVN(isoString?: string) {
    if (!isoString) return "--:--";
    const dateUTC = new Date(isoString);
    if (isNaN(dateUTC.getTime())) return "--:--";
    const hourVN = (dateUTC.getUTCHours() + 7) % 24;
    const minuteVN = String(dateUTC.getUTCMinutes()).padStart(2, "0");
    return `${String(hourVN).padStart(2, "0")}:${minuteVN}`;
  }

  if (isProfileLoading || isAppointmentsLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">
          Manage and view all your appointments
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by patient name or service name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="ONGOING">Ongoing</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card
            key={appointment.appointmentID}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-primary">
                      {new Date(appointment.appointmentDate).getDate()}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {new Date(appointment.appointmentDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                        }
                      )}
                    </div>
                    <div className="text-sm font-medium">
                      {formatTimeVN(appointment.appointmentDate)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">
                        {appointment.patientName}
                      </h3>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {appointment.serviceName}
                    </div>

                    {appointment.note && (
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Notes:</span>{" "}
                        {appointment.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <Button
                    onClick={() => onAppointmentSelect(appointment)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No appointments found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No appointments scheduled at this time."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
