import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { PatientUI } from "@/services/patient/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: PatientUI) => void;
  initialData?: PatientUI | null;
}

export default function PatientFormModal({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<PatientUI>({
    id: "",
    name: "",
    age: 0,
    gender: "Male",
    phone: "",
    lastVisit: "",
    status: "active",
    dob: "",
    medDate: "",
    medFac: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        id: crypto.randomUUID(),
        name: "",
        age: 0,
        gender: "Male",
        phone: "",
        lastVisit: "",
        status: "active",
        dob: "",
        medDate: "",
        medFac: "",
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof PatientUI, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Patient" : "Add New Patient"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Select
            value={form.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Medical No"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            placeholder="Date of Birth (ISO)"
            type="datetime-local"
            value={form.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />

          <Input
            placeholder="Last Visit Date (ISO)"
            type="datetime-local"
            value={form.medDate}
            onChange={(e) => handleChange("medDate", e.target.value)}
          />

          <Input
            placeholder="Medical Facility"
            value={form.medFac}
            onChange={(e) => handleChange("medFac", e.target.value)}
          />
        </div>

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
