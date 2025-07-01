import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { PatientUI } from "@/services/auth/types";

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
    gender: "Unknown",
    phone: "",
    lastVisit: "",
    nextAppointment: "",
    status: "active",
    arvRegimen: "",
    cd4Count: 0,
    viralLoad: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ ...form, id: crypto.randomUUID() }); // auto ID for new
  }, [initialData]);

  const handleChange = (field: keyof PatientUI, value: any) => {
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
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => handleChange("age", +e.target.value)}
          />
          <Input
            placeholder="Gender"
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            placeholder="ARV Regimen"
            value={form.arvRegimen}
            onChange={(e) => handleChange("arvRegimen", e.target.value)}
          />
          <Input
            placeholder="CD4 Count"
            type="number"
            value={form.cd4Count}
            onChange={(e) => handleChange("cd4Count", +e.target.value)}
          />
          <Input
            placeholder="Viral Load"
            value={form.viralLoad}
            onChange={(e) => handleChange("viralLoad", e.target.value)}
          />
        </div>
        <Button className="mt-4 w-full" onClick={handleSubmit}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
