"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DoctorResponse } from "@/services/doctor/types";
import { updateDoctorProfile } from "@/services/doctor/api";

interface DoctorFormInput {
  fullName: string;
  gender: string;
  specialty: string;
  degrees: string;
}

interface DoctorFormModalProps {
  doctor?: DoctorResponse;
  mode?: "edit" | "add";
  onUpdated?: () => void;
  onClose: () => void;
}

export default function DoctorFormModal({
  doctor,
  mode = "edit",
  onUpdated,
  onClose,
}: DoctorFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DoctorFormInput>({
    defaultValues: {
      fullName: doctor?.name ?? "",
      gender: doctor?.gender ?? "",
      specialty: doctor?.specialty ?? "",
      degrees: doctor?.degrees ?? "",
    },
  });

  useEffect(() => {
    reset({
      fullName: doctor?.name ?? "",
      gender: doctor?.gender ?? "",
      specialty: doctor?.specialty ?? "",
      degrees: doctor?.degrees ?? "",
    });
  }, [doctor, reset]);

  const onSubmit = async (data: DoctorFormInput) => {
    try {
      if (mode === "edit" && doctor?.doctorID) {
        await updateDoctorProfile(doctor.doctorID, data);
        toast.success("Doctor updated successfully!");
      } else {
        // TODO: call API to add new doctor
        console.log("Add Doctor:", data);
        toast.success("Doctor added successfully!");
      }

      onUpdated?.();
      onClose();
    } catch (error) {
      console.error("Failed:", error);
      toast.error("Failed to submit doctor form.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <Input {...register("fullName")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Gender</label>
        <select
          {...register("gender")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Specialty</label>
        <Input {...register("specialty")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Degrees</label>
        <Input {...register("degrees")} required />
      </div>

      {mode === "edit" && (
        <div className="text-xs text-gray-500 italic">
          Email: {doctor?.email ?? "N/A"}
          <br />
          Phone: {doctor?.phone ?? "N/A"}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-600 text-white hover:bg-yellow-700"
        >
          {mode === "edit" ? "Save Changes" : "Add Doctor"}
        </Button>
      </div>
    </form>
  );
}
