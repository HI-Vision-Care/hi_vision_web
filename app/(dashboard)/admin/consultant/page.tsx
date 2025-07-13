"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import axiosInstance from "@/config/axios"
import ChatInterface from "@/components/consultant/chat-interface"
import ConsultationRequireQueue from "@/components/consultant/consultationqueue"
import { useRef } from "react"
import { useAccountId } from "@/hooks/useAccountId"
import { ConsultationRequire } from "@/services/consultant/types"
// Mock data for consultation sessions
const mockSessions = [
    {
        id: 1,
        roomNumber: "Room 101",
        customerName: "Nguyễn Văn A",
        consultantName: "Dr. Trần Thị B",
        startTime: "09:00",
        endTime: "10:00",
        status: "active",
        priority: "high",
        waitTime: "5 phút",
    },
    {
        id: 2,
        roomNumber: "Room 102",
        customerName: "Lê Thị C",
        consultantName: "Dr. Phạm Văn D",
        startTime: "10:30",
        endTime: "11:30",
        status: "waiting",
        priority: "medium",
        waitTime: "15 phút",
    },
    {
        id: 3,
        roomNumber: "Room 103",
        customerName: "Hoàng Minh E",
        consultantName: "Dr. Vũ Thị F",
        startTime: "14:00",
        endTime: "15:00",
        status: "upcoming",
        priority: "low",
        waitTime: "2 giờ",
    },
]

export default function ConsultationDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [sessions] = useState(mockSessions)
    const [selectedPatient, setSelectedPatient] = useState<ConsultationRequire | null>(null)
    const [requires, setRequires] = useState<ConsultationRequire[]>([])
    const stompClientRef = useRef<Client | null>(null)
    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)
        return () => clearInterval(timer)
    }, [])

    // Calculate stats
    const totalSessions = sessions.length
    const activeSessions = sessions.filter((s) => s.status === "active").length
    const waitingSessions = sessions.filter((s) => s.status === "waiting").length
    const upcomingSessions = sessions.filter((s) => s.status === "upcoming").length
    const [hasMounted, setHasMounted] = useState(false);
    const staffAccountId = useAccountId();
    const handleSelectPatient = (patient: ConsultationRequire) => {
        setSelectedPatient(patient)
        const staffID = staffAccountId; // TODO: Lấy staffID thật sự (đăng nhập)
        const consultationPayload = {
            // Map đúng structure BE
            accountID: patient.accountID, // Nếu BE cần
            patientName: patient.name,
            // ...
        };
        if (stompClientRef.current && stompClientRef.current.connected) {
            console.log("Publishing consultation payload:", consultationPayload)
            console.log("Staff:", staffID)
            stompClientRef.current.publish({

                destination: `/app/confirmation/${staffID}`,
                body: JSON.stringify(consultationPayload),
            })
        } else {
            alert("WebSocket chưa kết nối hoặc đang lỗi.")
        }
    }

    useEffect(() => {
        setHasMounted(true);
    }, []);
    useEffect(() => {
        const socket = new SockJS("http://192.168.2.7:8080/HiVision/ws")
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 3000,
        })

        stompClient.onConnect = () => {
            stompClient.subscribe("/consultation/require", (message) => {
                const payload: ConsultationRequire = JSON.parse(message.body);
                console.log("WS payload:", payload); // Log ra mọi payload nhận từ BE

                setRequires((prev) => {
                    // Nếu status là "REQUIRE" thì thêm mới nếu chưa có
                    if (payload.status === "REQUIRE") {
                        const exist = prev.some(x => x.accountID === payload.accountID);
                        return exist ? prev : [...prev, payload];
                    } else {
                        // Nếu status khác, xóa khỏi danh sách
                        return prev.filter(x => x.accountID !== payload.accountID);
                    }
                });
            });
        };


        stompClient.activate()
        stompClientRef.current = stompClient
        return () => {
            stompClient.deactivate()
            stompClientRef.current = null
        }
    }, [])

    useEffect(() => {
        axiosInstance.get("/consultation/require")
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setRequires(
                    data.map((item) => ({
                        name: item.name || "anonimus",
                        status: item.status,
                        note: item.note || "",
                        accountID: item.accountID || "",
                        createdAt: item.createdAt || "",
                    }))
                );
            })
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hệ thống tư vấn</h1>
                        <p className="text-gray-600 mt-1">Quản lý các phiên tư vấn khách hàng theo thời gian thực</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select defaultValue="month">
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">Tháng</SelectItem>
                                <SelectItem value="week">Tuần</SelectItem>
                                <SelectItem value="day">Ngày</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-black hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-2" />
                            Phiên mới
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Tổng phiên</p>
                                    <p className="text-3xl font-bold">{totalSessions}</p>
                                    <p className="text-xs text-gray-500">Tất cả phiên đã lên lịch</p>
                                </div>
                                <Calendar className="w-8 h-8 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Đang hoạt động</p>
                                    <p className="text-3xl font-bold text-green-600">{activeSessions}</p>
                                    <p className="text-xs text-gray-500">Đang tư vấn</p>
                                </div>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Đang chờ</p>
                                    <p className="text-3xl font-bold text-yellow-600">{waitingSessions}</p>
                                    <p className="text-xs text-gray-500">Phiên đã lên lịch</p>
                                </div>
                                <Clock className="w-8 h-8 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Sắp tới</p>
                                    <p className="text-3xl font-bold text-blue-600">{upcomingSessions}</p>
                                    <p className="text-xs text-gray-500">Phiên trong tuần</p>
                                </div>
                                <Users className="w-8 h-8 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chat and Queue Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Chat Interface */}
                    <div className="lg:col-span-2">
                        <ChatInterface
                            selectedPatientRequire={selectedPatient}
                            onConsultationComplete={() => setSelectedPatient(null)}
                        />
                    </div>

                    {/* Queue Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <ConsultationRequireQueue requires={requires} onSelectPatient={handleSelectPatient} />

                            </CardContent>
                        </Card>

                        {/* Current Time */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Thời gian hiện tại</p>
                                    {hasMounted && (
                                        <p className="text-lg font-mono font-bold">
                                            {currentTime.toLocaleTimeString("vi-VN")}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500">{currentTime.toLocaleDateString("vi-VN")}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
