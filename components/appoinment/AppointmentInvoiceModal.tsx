"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Phone,
  User,
  Stethoscope,
  FileText,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

interface TestItem {
  testName: string;
  testDescription: string;
  unit: string;
}

interface MedicalService {
  name: string;
  specialty: string;
  price: number;
  testItems: TestItem[];
}

interface Account {
  phone: string;
}

interface Patient {
  name: string;
  account: Account;
}

interface Doctor {
  name: string;
  account?: Account;
}

interface Appointment {
  appointmentID: string;
  appointmentDate: string;
  paymentStatus?: "PAID" | "UNPAID" | null;
  status: string;
  patient: Patient;
  doctor: Doctor;
  medicalService: MedicalService;
  note?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onMarkAsPaid?: (id: string) => void;
  onCancelAppointment?: (id: string) => void;
}

const AppointmentInvoiceModal: React.FC<Props> = ({
  open,
  onClose,
  appointment,
  onMarkAsPaid,
  onCancelAppointment,
}) => {
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  if (!open || !appointment) return null;

  const appointmentDateTime = new Date(
    appointment.appointmentDate
  ).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC", // <- Quan trọng! Giữ nguyên giờ trong DB
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Invoice Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">MEDICAL INVOICE</h1>
              <div className="text-blue-100">
                <p className="text-sm">Hi - Vision Med</p>
              </div>
            </div>
            <div className="text-right">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 mb-4 h-8 w-8 p-0"
                onClick={onClose}
              >
                ×
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Billing Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bill To */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                BILL TO
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">
                  {appointment.patient.name}
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone className="w-3 h-3 mr-2" />
                  {appointment.patient.account.phone}
                </p>
              </div>
            </div>

            {/* Service Provider */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <Stethoscope className="w-4 h-4 mr-2" />
                SERVICE PROVIDER
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">
                  Dr. {appointment.doctor.name}
                </p>
                <p className="text-gray-600">
                  {appointment.medicalService.specialty}
                </p>
                {appointment.doctor.account?.phone && (
                  <p className="flex items-center text-gray-600">
                    <Phone className="w-3 h-3 mr-2" />
                    <a
                      href={`tel:${appointment.doctor.account.phone}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {appointment.doctor.account.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              APPOINTMENT DETAILS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-semibold text-gray-900">
                  {appointmentDateTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Service</p>
                <p className="font-semibold text-gray-900">
                  {appointment.medicalService.name}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Payment Status</p>
                <Badge
                  className={
                    appointment.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700 border-green-400"
                      : "bg-red-100 text-red-700 border-red-400"
                  }
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  {appointment.paymentStatus === "PAID" ? "Paid" : "Unpaid"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Services & Tests Table */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              SERVICES & TESTS
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      #
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Details
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Unit
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4 font-medium">
                      {appointment.medicalService.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {appointment.medicalService.specialty}
                    </td>
                    <td className="py-3 px-4 text-gray-600">1</td>
                    <td className="py-3 px-4 text-right font-semibold">
                      {appointment.medicalService.price.toLocaleString()}₫
                    </td>
                  </tr>
                  {appointment.medicalService.testItems.map((test, idx) => (
                    <tr key={idx} className="border-t bg-gray-50">
                      <td className="py-2 px-4 text-sm text-gray-500">
                        1.{idx + 1}
                      </td>
                      <td className="py-2 px-4 text-sm font-medium text-gray-700">
                        {test.testName}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {test.testDescription}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {test.unit}
                      </td>
                      <td className="py-2 px-4 text-right text-sm text-gray-500">
                        Included
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm">
              <Separator className="mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>
                    {appointment.medicalService.price.toLocaleString()}₫
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (0%):</span>
                  <span>0₫</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-700">
                    {appointment.medicalService.price.toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {appointment.note && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Notes:</h4>
              <p className="text-sm text-gray-700">{appointment.note}</p>
            </div>
          )}

          {/* Terms & Conditions */}
          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
            <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
            <ul className="space-y-1">
              <li>• Payment is due within 30 days of service date.</li>
              <li>• Please retain this invoice for your records.</li>
              <li>
                • For questions regarding this invoice, please contact our
                billing department.
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              {appointment.paymentStatus === "UNPAID" && onMarkAsPaid && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onMarkAsPaid(appointment.appointmentID)}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Mark as Paid
                </Button>
              )}
              {(appointment.status === "SCHEDULED" ||
                appointment.status === "ONGOING") &&
                onCancelAppointment && (
                  <Button
                    variant="destructive"
                    onClick={() => setShowConfirmCancel(true)}
                  >
                    Cancel Appointment
                  </Button>
                )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                Print Invoice
              </Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmCancel && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-xs w-full">
            <div className="font-semibold text-lg mb-3">
              Confirm appointment cancellation?
            </div>
            <div className="mb-4 text-sm text-gray-600">
              You definitely want to{" "}
              <span className="text-red-600 font-semibold">
                cancel this appointment
              </span>
              ?
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmCancel(false)}
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onCancelAppointment?.(appointment.appointmentID);
                  setShowConfirmCancel(false);
                }}
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentInvoiceModal;
