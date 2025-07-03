import { MedicalRecord } from "@/types";
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
} from "lucide-react";

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
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former VP of Engineering at Google with 15+ years in tech leadership.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "Ex-Amazon architect specializing in scalable cloud infrastructure.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "Emily Johnson",
    role: "Head of Product",
    bio: "Product strategy expert with a track record of launching successful SaaS products.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "David Kim",
    role: "Head of Design",
    bio: "Award-winning designer focused on creating intuitive user experiences.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "Lisa Thompson",
    role: "VP of Sales",
    bio: "Sales leader with expertise in helping businesses scale and grow.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "James Wilson",
    role: "Head of Customer Success",
    bio: "Customer advocate ensuring our clients achieve their goals with our platform.",
    image: "/placeholder.svg?height=300&width=300",
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

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "p1",
    patientName: "Sarah Johnson",
    recordDate: "2024-01-15",
    diagnosis: "HIV-1 infection, well-controlled on ART",
    notes:
      "Patient continues to show excellent adherence to antiretroviral therapy. No reported side effects. Viral load remains undetectable. CD4 count has improved significantly since last visit.",
    treatmentPlan:
      "Continue current ART regimen (Bictegravir/Tenofovir alafenamide/Emtricitabine). Monitor viral load and CD4 count every 3 months.",
    followUpDate: "2024-04-15",
    hivStage: "Stage 1",
    cd4Count: 650,
    viralLoad: 0,
    labResults: [],
    createdBy: "Dr. Sarah Wilson",
    lastModified: "2024-01-15T10:30:00Z",
  },
];
