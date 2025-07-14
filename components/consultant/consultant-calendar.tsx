import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface ConsultantCalendarProps {
    selectedDate: Date;
    formatDate: (date: Date) => string;
    getDaysInMonth: (date: Date) => (number | null)[];
    navigateMonth: (direction: "prev" | "next") => void;
    goToToday: () => void;
}

export default function ConsultantCalendar({
    selectedDate,
    formatDate,
    getDaysInMonth,
    navigateMonth,
    goToToday,
}: ConsultantCalendarProps) {
    return (
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={goToToday}>
                                Hôm nay
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                        {getDaysInMonth(selectedDate).map((day, index) => (
                            <div
                                key={index}
                                className={`p-3 text-center text-sm border border-gray-100 min-h-[80px] ${day ? "hover:bg-gray-50 cursor-pointer" : ""
                                    } ${day === new Date().getDate() &&
                                        selectedDate.getMonth() === new Date().getMonth() &&
                                        selectedDate.getFullYear() === new Date().getFullYear()
                                        ? "bg-blue-50 border-blue-200"
                                        : ""
                                    }`}
                            >
                                {day && (
                                    <>
                                        <div className="font-medium mb-1">{day}</div>
                                        {/* Sample consultation indicators */}
                                        {day === 9 && (
                                            <div className="space-y-1">
                                                <div className="w-full h-1 bg-green-500 rounded"></div>
                                                <div className="w-full h-1 bg-yellow-500 rounded"></div>
                                            </div>
                                        )}
                                        {day === 15 && (
                                            <div className="space-y-1">
                                                <div className="w-full h-1 bg-blue-500 rounded"></div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
