"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConsultationRequire } from "@/services/consultant/types"

interface ConsultationRequireQueueProps {
    requires: ConsultationRequire[]
    onSelectPatient?: (patient: ConsultationRequire) => void
}

export default function ConsultationRequireQueue({ requires, onSelectPatient }: ConsultationRequireQueueProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "REQUIRE":
                return "bg-yellow-500"
            case "PROCESSING":
                return "bg-green-500"
            default:
                return "bg-gray-500"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "border-red-500 bg-red-50"
            case "medium":
                return "border-yellow-500 bg-yellow-50"
            case "low":
                return "border-green-500 bg-green-50"
            default:
                return "border-gray-500 bg-gray-50"
        }
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Hàng chờ tư vấn</h3>
            <div className="space-y-4">
                {requires.map((require, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${getPriorityColor("medium")}`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                    {require.name}
                                </Badge>
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(require.status)}`}></div>
                            </div>
                            <span className="text-xs text-gray-500">{new Date(require.createdAt).toLocaleTimeString("vi-VN")}</span>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-sm">{require.name}</p>
                            <p className="text-xs text-gray-600">Trạng thái: {require.status}</p>
                            <p className="text-xs text-gray-500">Thời gian: {new Date(require.createdAt).toLocaleString("vi-VN")}</p>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                            <Badge variant={require.status === "REQUIRE" ? "default" : "secondary"} className="text-xs">
                                {require.status === "REQUIRE" ? "Cần tư vấn" : "Đang xử lý"}
                            </Badge>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-6 bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => onSelectPatient?.(require)}
                            >
                                Bắt đầu chat
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
