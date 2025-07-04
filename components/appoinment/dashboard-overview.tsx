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

export default function DashboardOverview({ onAppointmentSelect }) {
  // 1. Lấy accountId từ token
  const accountId = useAccountId();

  // 2. Lấy profile để lấy doctorID
  const { data: doctorProfile, isLoading: isProfileLoading } =
    useGetDoctorProfile(accountId);

  // 3. Lấy danh sách lịch hẹn theo doctorID
  const doctorID = doctorProfile?.doctorID;
  const { data: appointments = [], isLoading: isAppointmentsLoading } =
    useGetAppointmentsByDoctorId(doctorID, !!doctorID);

  // 4. Lọc today's appointments theo ngày hiện tại
  const today = new Date();
  const vnDate = new Date(today.getTime() + 7 * 60 * 60 * 1000); // Cộng 7 tiếng nếu server đang ở UTC
  const todayVN = vnDate.toISOString().slice(0, 10);

  const dateUTC = new Date(appointments.appointmentDate);
  const hour = String(dateUTC.getUTCHours()).padStart(2, "0");
  const minute = String(dateUTC.getUTCMinutes()).padStart(2, "0");
  const timeUTC = `${hour}:${minute}`;

  const scheduledCount = appointments.filter(
    (apt) => apt.status === "SCHEDULED"
  ).length;
  const ongoingCount = appointments.filter(
    (apt) => apt.status === "ONGOING"
  ).length;
  const completedCount = appointments.filter(
    (apt) => apt.status === "COMPLETED"
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-yellow-200 text-warning-foreground";
      case "COMPLETED":
        return "bg-green-300 text-success-foreground";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isProfileLoading || isAppointmentsLoading) {
    return <div>Đang tải dữ liệu...</div>;
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
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <CardDescription>Your appointments for {todayVN}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointmentID}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    {timeUTC}
                  </div>
                  <div>
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.serviceName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(appointment.status)}>
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
