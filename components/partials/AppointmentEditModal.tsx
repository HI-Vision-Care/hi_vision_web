"use client";

import { Appointment } from "@/services/appointment/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAppointment } from "@/services/appointment/api";
import { useState } from "react";

interface AppointmentEditModalProps {
  appointment: Appointment;
  onClose: () => void;
  onUpdated: () => void;
}

export default function AppointmentEditModal({
  appointment,
  onClose,
  onUpdated,
}: AppointmentEditModalProps) {
  const [formData, setFormData] = useState({
    appointmentDate: new Date(appointment.appointmentDate)
      .toISOString()
      .slice(0, 16),
    note: appointment.note || "",
    urlLink: appointment.urlLink || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await updateAppointment(appointment.appointmentID, {
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
        note: formData.note,
        urlLink: formData.urlLink,
      });
      onUpdated(); // Trigger refetch in parent
      onClose(); // Close modal
    } catch (err) {
      console.error("Failed to update appointment", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-xl font-bold mb-4">Edit Appointment</h3>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <Input
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={(e) => handleChange("appointmentDate", e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <Input
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">
            URL Link
          </label>
          <Input
            value={formData.urlLink}
            onChange={(e) => handleChange("urlLink", e.target.value)}
          />

          <div className="flex gap-2 pt-4">
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
