import {
  Heart,
  Lightbulb,
  Users,
  Award,
  Target,
  Globe,
  Database,
  FileText,
  HardDrive,
  Clock,
  Shield,
  Activity,
  UserCheck,
  Home,
  Calendar,
  User2,
  Pill,
  LayoutDashboard,
} from "lucide-react";

//navigation sidebar doctor-dashboard
export const navigation = [
  {
    title: "Dashboard",
    icon: Home,
    view: "overview" as const,
  },
  {
    title: "Appointments",
    icon: Calendar,
    view: "appointments" as const,
  },
  {
    title: "Schedule",
    icon: Clock,
    view: "schedule" as const,
  },
];

//Admin Sidebar

export const adminNavigation = [
  // { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Accounts", href: "/admin/accounts", icon: User2 },
  { name: "Manage Doctors", href: "/admin/doctors", icon: UserCheck },
  { name: "All Patients", href: "/admin/patients", icon: Users },
  { name: "ARV Regimens", href: "/admin/arv-regimens", icon: Pill },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Consultants", href: "/admin/consultant", icon: Calendar },
  {
    name: "Post-Management",
    href: "/admin/post-management",
    icon: LayoutDashboard,
  },
  { name: "Shift Management", href: "/admin/shifts", icon: Clock },
];

export const staffNavigation = [
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Consultants", href: "/admin/consultant", icon: Calendar },
  {
    name: "Post-Management",
    href: "/admin/post-management",
    icon: LayoutDashboard,
  },
  { name: "Shift Management", href: "/admin/shifts", icon: Clock },
];

//Routes
export const desktopNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const mobileNav = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// Dummy data
export const FEATURED_PRODUCTS = [
  {
    image:
      "https://i.pinimg.com/736x/72/2f/94/722f94b1108fc875cdc547508eaaa5bf.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/cc/33/f7/cc33f7f52f2733db21fb23dece34cbf0.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/ae/50/1a/ae501a6acbcfe14e4a47e5e50cb6184d.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/98/24/dd/9824dd68bb6324b51b3c9910afb40448.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/b5/6a/59/b56a5921028b20643807f22b4f677e02.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
];

export const MORE_PRODUCTS = [
  {
    image:
      "https://i.pinimg.com/736x/b8/c8/ec/b8c8ec1ec9eb3790ff03b6234c938f35.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/52/b1/85/52b185e8cb0b921a054ee21e81eac8b7.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/08/b7/03/08b7035e8a4a3b4dbde14f4707a0a19b.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/7f/03/37/7f03370b0d3fa4b90f8bfaea0e64247f.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
  {
    image:
      "https://i.pinimg.com/736x/f4/cf/c5/f4cfc563bea916b9771103c34160842e.jpg",
    name: "Product Name",
    desc: "Lorem ipsum amet dolor, elit tu",
  },
];

export const HERO_DATA = {
  badge: "About Hi-Vision",
  title: "We’re building the future of business",
  description:
    "Founded in 2020, Hi-Vision has been at the forefront of digital transformation, helping businesses worldwide unlock their potential through innovative technology solutions.",
};

export const MISSION_VISION = {
  mission: {
    icon: Target,
    title: "Our Mission",
    text: "To empower businesses of all sizes with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe that every organization deserves access to enterprise-level tools that can transform their operations and unlock their full potential.",
  },
  vision: {
    icon: Lightbulb,
    title: "Our Vision",
    text: "To create a world where technology seamlessly integrates with human creativity and ambition, enabling businesses to achieve extraordinary results while maintaining their core values and human-centered approach.",
  },
};

export const CORE_VALUES = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make starts with our customers' success in mind.",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly push boundaries to deliver cutting-edge solutions.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe the best results come from working together as a team.",
    color: "from-blue-400 to-purple-500",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, no matter how small.",
    color: "from-green-400 to-blue-500",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Kim Cuong",
    role: "CEO & Founder",
    bio: "Former VP of Engineering at Google with 15+ years in tech leadership.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/movie-management-c2908.appspot.com/o/cuong.jpg?alt=media&token=4efba439-0c33-4d74-a92c-26ee99eee284",
    linkedin: "#",
  },
  {
    name: "Dang Khoa",
    role: "CTO",
    bio: "Ex-Amazon architect specializing in scalable cloud infrastructure.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/movie-management-c2908.appspot.com/o/khoa.jpg?alt=media&token=4ae3da49-1ed9-41f2-a146-0475c499035e",
    linkedin: "#",
  },
  {
    name: "Cong Thanh",
    role: "Lead Back End",
    bio: "Product strategy expert with a track record of launching successful SaaS products.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/movie-management-c2908.appspot.com/o/thanh2.jpg?alt=media&token=432cb218-ad68-485e-b370-8a5183e63cf7",
    linkedin: "#",
  },
  {
    name: "Anh Minh",
    role: "Head of Design",
    bio: "Award-winning designer focused on creating intuitive user experiences.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/movie-management-c2908.appspot.com/o/minh.jpg?alt=media&token=241d0dfd-b491-457f-9ab5-70354ded772f",
    linkedin: "#",
  },
  {
    name: "Minh Hieu",
    role: "VP of Sales",
    bio: "Sales leader with expertise in helping businesses scale and grow.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/movie-management-c2908.appspot.com/o/hieu.jpg?alt=media&token=deddda83-ca5c-44ac-9e58-03f6fc588583",
    linkedin: "#",
  },
];

export const COMPANY_STATS = [
  { icon: Users, number: "10M+", label: "Happy Customers" },
  { icon: Globe, number: "150+", label: "Countries Served" },
  { icon: Award, number: "99.9%", label: "Uptime Guarantee" },
  { icon: Target, number: "5 Years", label: "Industry Experience" },
];

export const CTA_BUTTONS = {
  primary: { text: "Start Your Journey", href: "/" },
  secondary: { text: "View Careers", variant: "outline" },
};

export const appointments = [
  {
    id: 1,
    patientId: "P001",
    patientName: "John Anderson",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "09:00",
    type: "Follow-up",
    status: "confirmed",
    priority: "normal",
    duration: 30,
    notes: "Regular check-up and medication review",
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Maria Rodriguez",
    doctorName: "Dr. Michael Chen",
    date: "2024-01-15",
    time: "10:30",
    type: "Consultation",
    status: "pending",
    priority: "high",
    duration: 45,
    notes: "New patient consultation",
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "David Kim",
    doctorName: "Dr. Emily Davis",
    date: "2024-01-15",
    time: "14:00",
    type: "Lab Review",
    status: "completed",
    priority: "normal",
    duration: 20,
    notes: "Review recent lab results",
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Sarah Wilson",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "15:30",
    type: "Treatment",
    status: "confirmed",
    priority: "normal",
    duration: 60,
    notes: "ARV therapy adjustment",
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Robert Brown",
    doctorName: "Dr. Robert Wilson",
    date: "2024-01-15",
    time: "16:00",
    type: "Emergency",
    status: "urgent",
    priority: "urgent",
    duration: 30,
    notes: "Urgent consultation required",
  },
  {
    id: 6,
    patientId: "P006",
    patientName: "Lisa Chen",
    doctorName: "Dr. Amanda Lee",
    date: "2024-01-16",
    time: "09:30",
    type: "Pediatric",
    status: "confirmed",
    priority: "normal",
    duration: 40,
    notes: "Pediatric HIV follow-up",
  },
];

export const appointmentStats = [
  {
    label: "Today's Appointments",
    value: appointments.filter((a) => a.date === "2024-01-15").length,
    color: "blue",
  },
  {
    label: "Confirmed",
    value: appointments.filter((a) => a.status === "confirmed").length,
    color: "green",
  },
  {
    label: "Pending",
    value: appointments.filter((a) => a.status === "pending").length,
    color: "yellow",
  },
  {
    label: "Urgent",
    value: appointments.filter((a) => a.status === "urgent").length,
    color: "red",
  },
];

export const regimens = [
  {
    id: 1,
    name: "TDF + 3TC + DTG",
    category: "first_line",
    description: "First-line regimen for adults",
    drugs: ["Tenofovir (TDF)", "Lamivudine (3TC)", "Dolutegravir (DTG)"],
    dosage: "1 tablet daily",
    suitableFor: ["Adults", "Pregnant women (2nd, 3rd trimester)"],
    contraindications: ["Severe kidney disease", "Component allergy"],
    sideEffects: ["Mild nausea", "Headache", "Fatigue"],
    patientsCount: 45,
    effectiveness: 98,
  },
  {
    id: 2,
    name: "ABC + 3TC + DTG",
    category: "first_line",
    description: "Alternative to TDF for kidney issues",
    drugs: ["Abacavir (ABC)", "Lamivudine (3TC)", "Dolutegravir (DTG)"],
    dosage: "1 tablet daily",
    suitableFor: ["Adults", "Patients with kidney problems"],
    contraindications: ["HLA-B*5701 positive", "Severe liver disease"],
    sideEffects: ["Allergic reaction", "Nausea", "Fatigue"],
    patientsCount: 23,
    effectiveness: 97,
  },
  {
    id: 3,
    name: "TDF + FTC + EFV",
    category: "alternative",
    description: "Alternative regimen, less preferred",
    drugs: ["Tenofovir (TDF)", "Emtricitabine (FTC)", "Efavirenz (EFV)"],
    dosage: "1 tablet daily (evening)",
    suitableFor: ["Adults who cannot tolerate DTG"],
    contraindications: ["Pregnant women (1st trimester)", "Mental disorders"],
    sideEffects: ["Vivid dreams", "Dizziness", "Rash"],
    patientsCount: 12,
    effectiveness: 94,
  },
  {
    id: 4,
    name: "AZT + 3TC + LPV/r",
    category: "pediatric",
    description: "Pediatric regimen for children under 3",
    drugs: [
      "Zidovudine (AZT)",
      "Lamivudine (3TC)",
      "Lopinavir/ritonavir (LPV/r)",
    ],
    dosage: "Weight-based, twice daily",
    suitableFor: ["Children < 3 years", "Children who cannot tolerate DTG"],
    contraindications: ["Severe anemia", "Neutropenia"],
    sideEffects: ["Anemia", "Nausea", "Diarrhea"],
    patientsCount: 8,
    effectiveness: 92,
  },
];

export const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:25",
    user: "admin@hivcenter.com",
    userRole: "Administrator",
    action: "USER_LOGIN",
    resource: "System",
    details: "Successful login from IP 192.168.1.100",
    severity: "info",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:25:12",
    user: "dr.johnson@hivcenter.com",
    userRole: "Doctor",
    action: "PATIENT_UPDATE",
    resource: "Patient Record (P001)",
    details: "Updated ARV regimen for patient John Anderson",
    severity: "info",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:20:45",
    user: "admin@hivcenter.com",
    userRole: "Administrator",
    action: "DOCTOR_CREATE",
    resource: "Doctor Record (D005)",
    details: "Created new doctor account for Dr. Amanda Lee",
    severity: "warning",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:15:33",
    user: "system@hivcenter.com",
    userRole: "System",
    action: "BACKUP_COMPLETE",
    resource: "Database",
    details: "Automatic database backup completed successfully (2.4 GB)",
    severity: "success",
    ipAddress: "127.0.0.1",
    userAgent: "System Process",
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:10:18",
    user: "dr.chen@hivcenter.com",
    userRole: "Doctor",
    action: "APPOINTMENT_CREATE",
    resource: "Appointment (A156)",
    details: "Scheduled appointment for patient Maria Rodriguez",
    severity: "info",
    ipAddress: "192.168.1.108",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
  },
  {
    id: 6,
    timestamp: "2024-01-15 14:05:22",
    user: "unknown@external.com",
    userRole: "Unknown",
    action: "LOGIN_FAILED",
    resource: "System",
    details: "Failed login attempt - invalid credentials",
    severity: "error",
    ipAddress: "203.45.67.89",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
  },
  {
    id: 7,
    timestamp: "2024-01-15 14:00:15",
    user: "admin@hivcenter.com",
    userRole: "Administrator",
    action: "SETTINGS_UPDATE",
    resource: "System Settings",
    details: "Updated notification settings - enabled SMS alerts",
    severity: "warning",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: 8,
    timestamp: "2024-01-15 13:55:40",
    user: "dr.davis@hivcenter.com",
    userRole: "Doctor",
    action: "REPORT_EXPORT",
    resource: "Patient Reports",
    details: "Exported monthly treatment report (PDF, 45 pages)",
    severity: "info",
    ipAddress: "192.168.1.112",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
];

export const backupHistory = [
  {
    id: 1,
    type: "Full Backup",
    date: "2024-01-15 02:00:00",
    size: "2.4 GB",
    status: "completed",
    duration: "45 minutes",
  },
  {
    id: 2,
    type: "Incremental Backup",
    date: "2024-01-14 02:00:00",
    size: "156 MB",
    status: "completed",
    duration: "8 minutes",
  },
  {
    id: 3,
    type: "Full Backup",
    date: "2024-01-13 02:00:00",
    size: "2.3 GB",
    status: "completed",
    duration: "42 minutes",
  },
  {
    id: 4,
    type: "Incremental Backup",
    date: "2024-01-12 02:00:00",
    size: "89 MB",
    status: "failed",
    duration: "N/A",
  },
];

export const systemStats = [
  { label: "Database Size", value: "2.4 GB", icon: Database, color: "blue" },
  { label: "Total Records", value: "15,847", icon: FileText, color: "green" },
  {
    label: "Last Backup",
    value: "2 hours ago",
    icon: Clock,
    color: "purple",
  },
  { label: "Storage Used", value: "68%", icon: HardDrive, color: "orange" },
];

export const reportData = {
  overview: {
    totalPatients: 234,
    activePatients: 198,
    newPatients: 12,
    adherenceRate: 94.2,
    viralSuppressionRate: 89.5,
    appointmentAttendance: 87.3,
  },
  monthly: {
    appointments: 156,
    completedTreatments: 142,
    missedAppointments: 14,
    newRegistrations: 8,
    emergencyCases: 3,
  },
};

export const chartData = [
  { month: "Jan", patients: 45, adherence: 92 },
  { month: "Feb", patients: 52, adherence: 94 },
  { month: "Mar", patients: 48, adherence: 91 },
  { month: "Apr", patients: 61, adherence: 95 },
  { month: "May", patients: 58, adherence: 93 },
  { month: "Jun", patients: 67, adherence: 96 },
];

export const treatmentOutcomes = [
  {
    category: "Complete Viral Suppression",
    count: 176,
    percentage: 89.5,
    color: "bg-green-500",
  },
  {
    category: "Partial Viral Suppression",
    count: 15,
    percentage: 7.6,
    color: "bg-yellow-500",
  },
  {
    category: "No Viral Suppression",
    count: 6,
    percentage: 3.0,
    color: "bg-red-500",
  },
];

export const arvRegimensUsage = [
  { regimen: "TDF + 3TC + DTG", count: 89, percentage: 45.2 },
  { regimen: "ABC + 3TC + DTG", count: 67, percentage: 34.0 },
  { regimen: "TDF + FTC + EFV", count: 28, percentage: 14.2 },
  { regimen: "Other", count: 13, percentage: 6.6 },
];

export const schedules = [
  {
    id: 1,
    date: "2024-01-15",
    timeSlots: [
      {
        time: "08:00-12:00",
        type: "Khám bệnh",
        status: "active",
        patients: 8,
      },
      { time: "14:00-17:00", type: "Tư vấn", status: "active", patients: 5 },
    ],
  },
  {
    id: 2,
    date: "2024-01-16",
    timeSlots: [
      {
        time: "08:00-12:00",
        type: "Ca trực",
        status: "scheduled",
        patients: 0,
      },
      {
        time: "13:00-16:00",
        type: "Khám bệnh",
        status: "active",
        patients: 12,
      },
    ],
  },
  {
    id: 3,
    date: "2024-01-17",
    timeSlots: [
      {
        time: "09:00-12:00",
        type: "Tư vấn trực tuyến",
        status: "active",
        patients: 6,
      },
      {
        time: "14:00-18:00",
        type: "Khám bệnh",
        status: "active",
        patients: 15,
      },
    ],
  },
];

export const weekDays = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

export const systemStat = [
  {
    title: "Total System Users",
    value: "1,847",
    change: "+23%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Doctors",
    value: "24",
    change: "+2",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Patients",
    value: "1,234",
    change: "+12%",
    icon: Activity,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "Excellent",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export const doctorPerformance = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    patients: 89,
    satisfaction: 4.8,
    status: "active",
    shifts: 12,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    patients: 76,
    satisfaction: 4.9,
    status: "active",
    shifts: 10,
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    patients: 92,
    satisfaction: 4.7,
    status: "active",
    shifts: 14,
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    patients: 68,
    satisfaction: 4.6,
    status: "on_leave",
    shifts: 0,
  },
];

export const systemAlerts = [
  {
    id: 1,
    message: "Server maintenance scheduled for tonight",
    type: "info",
    priority: "medium",
  },
  {
    id: 2,
    message: "3 doctors need license renewal",
    type: "warning",
    priority: "high",
  },
  {
    id: 3,
    message: "Database backup completed successfully",
    type: "success",
    priority: "low",
  },
  {
    id: 4,
    message: "High patient load detected in Ward A",
    type: "urgent",
    priority: "high",
  },
];

export const recentActivities = [
  {
    id: 1,
    action: "New doctor registered",
    user: "Dr. Amanda Lee",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "System backup completed",
    user: "System",
    time: "4 hours ago",
  },
  {
    id: 3,
    action: "Patient data exported",
    user: "Admin",
    time: "6 hours ago",
  },
  {
    id: 4,
    action: "ARV regimen updated",
    user: "Dr. Michael Chen",
    time: "8 hours ago",
  },
];

export const monthlyStats = [
  { label: "New Patients", value: "156", color: "blue" },
  { label: "Completed Treatments", value: "142", color: "green" },
  { label: "Missed Appointments", value: "14", color: "yellow" },
  { label: "Emergency Cases", value: "3", color: "red" },
];

export const hivTestTypes = [
  "CD4+ T-cell count",
  "HIV Viral Load",
  "Complete Blood Count (CBC)",
  "Comprehensive Metabolic Panel (CMP)",
  "Lipid Panel",
  "Liver Function Tests",
  "Kidney Function Tests",
  "Hepatitis B Surface Antigen",
  "Hepatitis C Antibody",
  "Tuberculosis Screening",
  "Syphilis Test (RPR/VDRL)",
  "Gonorrhea/Chlamydia",
  "Drug Resistance Testing",
];

export const APPOINTMENT_STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "bg-blue-100 text-blue-800",
  ONGOING: "bg-yellow-200 text-warning-foreground",
  COMPLETED: "bg-green-300 text-success-foreground",
  CANCELLED: "bg-red-100 text-red-800",
  DEFAULT: "bg-gray-100 text-gray-800",
};

export const mockWorkShifts = [
  {
    id: "ws1",
    doctorId: "dr1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-15",
    startTime: "08:00",
    endTime: "16:00",
    shiftType: "Regular",
    location: "Main Clinic",
    notes: "Regular morning shift",
    status: "Active",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "ws2",
    doctorId: "dr1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-16",
    startTime: "18:00",
    endTime: "06:00",
    shiftType: "Night",
    location: "Emergency Department",
    notes: "Night shift coverage",
    status: "Scheduled",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "ws3",
    doctorId: "dr1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-17",
    startTime: "09:00",
    endTime: "17:00",
    shiftType: "Regular",
    location: "Main Clinic",
    status: "Scheduled",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
];

export const mockAppointments = [
  {
    id: "1",
    patient: {
      id: "p1",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, City, State 12345",
      medicalHistory: ["Hypertension", "Type 2 Diabetes"],
      allergies: ["Penicillin", "Shellfish"],
      currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
      emergencyContact: {
        name: "John Johnson",
        phone: "+1 (555) 987-6543",
        relationship: "Spouse",
      },
    },
    date: "2024-01-15",
    time: "09:00",
    duration: 30,
    type: "Follow-up",
    status: "SCHEDULED",
    notes: "Regular diabetes check-up",
    symptoms: ["Fatigue", "Increased thirst"],
    diagnosis: "Type 2 Diabetes - Well controlled",
    prescription: ["Continue Metformin", "Increase water intake"],
    labResults: [
      {
        test: "HbA1c",
        result: "6.8%",
        normalRange: "<7.0%",
        status: "normal",
      },
      {
        test: "Fasting Glucose",
        result: "145 mg/dL",
        normalRange: "70-100 mg/dL",
        status: "abnormal",
      },
    ],
  },
  {
    id: "2",
    patient: {
      id: "p2",
      name: "Michael Chen",
      age: 28,
      gender: "Male",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@email.com",
      address: "456 Oak Ave, City, State 12345",
      medicalHistory: ["Asthma"],
      allergies: ["Dust mites"],
      currentMedications: ["Albuterol inhaler"],
      emergencyContact: {
        name: "Lisa Chen",
        phone: "+1 (555) 876-5432",
        relationship: "Sister",
      },
    },
    date: "2024-01-15",
    time: "09:30",
    duration: 45,
    type: "Consultation",
    status: "ONGOING",
    notes: "Chest pain evaluation",
    symptoms: ["Chest pain", "Shortness of breath"],
  },
  {
    id: "3",
    patient: {
      id: "p3",
      name: "Emily Rodriguez",
      age: 45,
      gender: "Female",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@email.com",
      address: "789 Pine St, City, State 12345",
      medicalHistory: ["Migraine", "Anxiety"],
      allergies: ["None known"],
      currentMedications: ["Sumatriptan", "Sertraline 50mg"],
      emergencyContact: {
        name: "Carlos Rodriguez",
        phone: "+1 (555) 765-4321",
        relationship: "Husband",
      },
    },
    date: "2024-01-15",
    time: "10:15",
    duration: 30,
    type: "Follow-up",
    status: "COMPLETED",
    notes: "Migraine management review",
    symptoms: ["Headache", "Nausea"],
    diagnosis: "Chronic Migraine - Stable",
    prescription: [
      "Continue current medications",
      "Stress management techniques",
    ],
  },
];

export const mockMedications = [
  {
    id: "med1",
    patientId: "p1",
    patientName: "Sarah Johnson",
    medicationName: "Bictegravir/Tenofovir alafenamide/Emtricitabine",
    dosage: "50mg/25mg/200mg",
    frequency: "Once daily",
    duration: "Ongoing",
    instructions: "Take with or without food at the same time each day",
    prescribedBy: "Dr. Sarah Wilson",
    prescribedDate: "2024-01-15",
    startDate: "2024-01-15",
    endDate: "",
    status: "Active",
    refillsRemaining: 5,
    totalRefills: 5,
    notes: "Patient tolerating well, excellent adherence",
    drugClass: "INSTI + NRTI",
    sideEffects: ["Nausea", "Headache", "Diarrhea"],
    interactions: ["Antacids", "Iron supplements"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "med2",
    patientId: "p2",
    patientName: "Michael Chen",
    medicationName: "Efavirenz/Emtricitabine/Tenofovir disoproxil",
    dosage: "600mg/200mg/300mg",
    frequency: "Once daily at bedtime",
    duration: "Ongoing",
    instructions: "Take on empty stomach, preferably at bedtime",
    prescribedBy: "Dr. Sarah Wilson",
    prescribedDate: "2024-01-10",
    startDate: "2024-01-10",
    endDate: "",
    status: "Active",
    refillsRemaining: 3,
    totalRefills: 5,
    drugClass: "NNRTI + NRTI",
    sideEffects: ["Dizziness", "Vivid dreams", "Rash"],
    interactions: ["Warfarin", "Voriconazole"],
    createdAt: "2024-01-10T14:00:00Z",
    updatedAt: "2024-01-10T14:00:00Z",
  },
];

export const HIV_TEST_TYPES = [
  "HIV-1/2 Antibody",
  "HIV-1/2 Antigen/Antibody Combo",
  "HIV Viral Load (RNA PCR)",
  "CD4 Cell Count",
  "HIV-1 Genotype Resistance",
  "HIV Rapid Test",
  "HIV Western Blot",
  "Other",
];

export const UNIT_OPTIONS = [
  "copies/mL",
  "cells/mm³",
  "IU/mL",
  "mg/dL",
  "ng/mL",
  "Other",
];

export const DURATION_OPTIONS = [
  "5",
  "7",
  "10",
  "14",
  "21",
  "28",
  "30",
  "60",
  "90",
  "Other",
];
