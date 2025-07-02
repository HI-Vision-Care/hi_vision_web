import Sidebar from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";
import Header from "@/components/admin/header";
import { schedules, weekDays } from "@/constants";

export default function Schedule() {
  return (
    <div className="bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <Sidebar />

      <div className="">
        <Header
          title="Lịch làm việc"
          subtitle="Quản lý lịch trình và ca làm việc của bác sĩ"
        />

        <div className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">
                Tuần từ 15/01 - 21/01/2024
              </h2>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm lịch làm việc
            </Button>
          </div>

          {/* Weekly Calendar */}
          <Card className="bg-white shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium text-gray-900 mb-2">{day}</div>
                    <div className="text-2xl font-bold text-gray-600 mb-4">
                      {15 + index}
                    </div>

                    {/* Schedule slots for each day */}
                    <div className="space-y-2">
                      {index < 3 &&
                        schedules[index]?.timeSlots.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-2"
                          >
                            <div className="text-xs font-medium text-blue-800">
                              {slot.time}
                            </div>
                            <div className="text-xs text-blue-600">
                              {slot.type}
                            </div>
                            {slot.patients > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-xs mt-1"
                              >
                                {slot.patients} BN
                              </Badge>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Schedule List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Lịch chi tiết
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">Ngày {schedule.date}</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {schedule.timeSlots.map((slot, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-t"
                        >
                          <div>
                            <span className="font-medium">{slot.time}</span>
                            <span className="ml-2 text-gray-600">
                              {slot.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {slot.patients > 0 && (
                              <Badge variant="outline">
                                {slot.patients} bệnh nhân
                              </Badge>
                            )}
                            <Badge
                              variant={
                                slot.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {slot.status === "active"
                                ? "Đang hoạt động"
                                : "Đã lên lịch"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Thống kê tuần này</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">
                        Tổng giờ làm việc
                      </p>
                      <p className="text-2xl font-bold text-blue-600">42 giờ</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">
                        Bệnh nhân đã khám
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        46 người
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-900">Ca trực</p>
                      <p className="text-2xl font-bold text-orange-600">3 ca</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
