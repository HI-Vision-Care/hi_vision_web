"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogPortal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MessageCircle, Send } from "lucide-react"
import { bookConsultationGuest } from "@/services/consultant/consultant"

const formSchema = z.object({
    name: z.string().min(2, "Vui lòng nhập họ tên"),
    phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
    service: z.string().min(1, "Vui lòng chọn dịch vụ"),
})

type FormData = z.infer<typeof formSchema>

export const serviceOptions = [
    { value: "dat_lich_xet_nghiem", label: "Đặt lịch xét nghiệm" },
    { value: "dat_lich_kham", label: "Đặt lịch khám" },
    { value: "can_tu_van", label: "Cần tư vấn" },
    { value: "bao_gia_goi_kham", label: "Báo giá gói khám" },
    { value: "lay_mau_xet_nghiem_tai_nha", label: "Lấy mẫu xét nghiệm tại nhà" },
    { value: "kham_dieu_tri_stds", label: "Khám & Điều trị STDs" },
    { value: "other", label: "Khác" },
];
export function ConsultationModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            service: "",
        },
    })

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            // Call the actual API
            const response = await bookConsultationGuest({
                name: data.name,
                phone: data.phone,
                note: data.service,
            })

            console.log("Consultation booked successfully:", response)
            alert("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.")
            setIsOpen(false)
            form.reset()
        } catch (error) {
            console.error("Error booking consultation:", error)
            alert("Có lỗi xảy ra. Vui lòng thử lại.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-25 right-6 z-50">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ">
                            <MessageCircle className="w-8 h-8" />
                        </Button>
                    </DialogTrigger>

                    <DialogPortal>
                        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                        <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] border-0 bg-transparent p-0 shadow-none">
                            <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-2xl overflow-hidden shadow-2xl">
                                {/* Content */}
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <h1 className="text-2xl font-bold text-white mb-3">Tư vấn miễn phí!</h1>
                                        <div className="w-24 h-0.5 bg-white/60 mx-auto mb-4"></div>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            Tất cả thông tin y tế của Khách hàng đều được bảo mật tuyệt đối, riêng tư
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        {/* Name Input */}
                                        <div>
                                            <Input
                                                {...form.register("name")}
                                                placeholder="Họ và tên"
                                                className="w-full h-12 px-4 text-gray-700 placeholder-gray-500 bg-white/95 border-0 rounded-full focus:ring-2 focus:ring-white/50 focus:bg-white transition-all"
                                            />
                                            {form.formState.errors.name && (
                                                <p className="text-white/80 text-xs mt-1 ml-4">{form.formState.errors.name.message}</p>
                                            )}
                                        </div>

                                        {/* Phone Input */}
                                        <div>
                                            <Input
                                                {...form.register("phone")}
                                                type="tel"
                                                placeholder="Số điện thoại (*)"
                                                className="w-full h-12 px-4 text-gray-700 placeholder-gray-500 bg-white/95 border-0 rounded-full focus:ring-2 focus:ring-white/50 focus:bg-white transition-all"
                                            />
                                            {form.formState.errors.phone && (
                                                <p className="text-white/80 text-xs mt-1 ml-4">{form.formState.errors.phone.message}</p>
                                            )}
                                        </div>

                                        {/* Service Select */}
                                        <div>
                                            <Select onValueChange={(value) => form.setValue("service", value)}>
                                                <SelectTrigger className="w-full h-12 px-4 text-gray-700 bg-white/95 border-0 rounded-full focus:ring-2 focus:ring-white/50 hover:bg-white transition-all">
                                                    <SelectValue placeholder="Đặt lịch xét nghiệm" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-0 shadow-xl">
                                                    {serviceOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                            className="py-2 px-4 hover:bg-blue-50 rounded-lg"
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {form.formState.errors.service && (
                                                <p className="text-white/80 text-xs mt-1 ml-4">{form.formState.errors.service.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                        ĐANG GỬI...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        GỬI THÔNG TIN
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </div>
        </>
    )
}
