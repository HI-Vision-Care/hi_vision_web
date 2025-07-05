import { useAccountId } from "@/hooks/useAccountId";
import {
  useGetDoctorProfile,
  useGetAppointmentsByDoctorId,
} from "@/services/doctor/hooks"; // hoặc đường dẫn bạn lưu hooks
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { Appointment } from "@/types";
import { APPOINTMENT_STATUS_COLORS } from "@/constants";

interface DashboardOverviewProps {
  onAppointmentSelect: (appointment: Appointment) => void;
}

export default function DashboardOverview({
  onAppointmentSelect,
}: DashboardOverviewProps) {
  // 1. Lấy accountId từ token
  const accountId = useAccountId();

  // 2. Lấy profile để lấy doctorID
  const { data: doctorProfile, isLoading: isProfileLoading } =
    useGetDoctorProfile(accountId || "");

  // 3. Lấy danh sách lịch hẹn theo doctorID
  const doctorID = doctorProfile?.doctorID;
  const { data: appointments = [], isLoading: isAppointmentsLoading } =
    useGetAppointmentsByDoctorId(doctorID || "", !!doctorID);

  const scheduledCount = appointments.filter(
    (apt) => apt.status === "SCHEDULED"
  ).length;
  const ongoingCount = appointments.filter(
    (apt) => apt.status === "ONGOING"
  ).length;
  const completedCount = appointments.filter(
    (apt) => apt.status === "COMPLETED"
  ).length;

  if (isProfileLoading || isAppointmentsLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {doctorProfile?.name}. Here&apos;s your overview for
          today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {scheduledCount} scheduled, {ongoingCount} ongoing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {scheduledCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Waiting for consultation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {ongoingCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently in consultation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {completedCount}
            </div>
            <p className="text-xs text-muted-foreground">Finished today</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
          <CardDescription>All upcoming and past appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments
              .sort(
                (a, b) =>
                  new Date(a.appointmentDate).getTime() -
                  new Date(b.appointmentDate).getTime()
              ) // Sort tăng dần, muốn giảm thì đổi - thành +
              .map((appointment) => {
                const apptDate = new Date(appointment.appointmentDate);
                const hour = String(apptDate.getUTCHours()).padStart(2, "0");
                const minute = String(apptDate.getUTCMinutes()).padStart(
                  2,
                  "0"
                );
                const second = String(apptDate.getUTCSeconds()).padStart(
                  2,
                  "0"
                );
                const timeUTC = `${hour}:${minute}:${second}`;
                const day = apptDate.toISOString().slice(0, 10);
                console.log(appointment.appointmentDate);

                return (
                  <div
                    key={appointment.appointmentID}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-muted-foreground">
                        {day} {timeUTC}
                      </div>
                      <div>
                        <div className="font-medium">
                          {appointment.patient?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.medicalService?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          APPOINTMENT_STATUS_COLORS[appointment.status] ||
                          APPOINTMENT_STATUS_COLORS.DEFAULT
                        }
                      >
                        {appointment.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAppointmentSelect(appointment)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
