"use client";

import { useState, useEffect } from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountUI } from "@/services/account/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (account: AccountUI) => void;
  initialData?: AccountUI | null;
  readOnly?: boolean;
}

export default function AccountFormModal({
  open,
  onClose,
  onSave,
  initialData,
  readOnly = false,
}: Props) {
  const [formData, setFormData] = useState<AccountUI>({
    id: initialData?.id || crypto.randomUUID(),
    username: initialData?.username || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    avatar:
      initialData?.avatar ||
      "https://api.dicebear.com/7.x/thumbs/svg?seed=Admin",
    role: initialData?.role || "PATIENT",
    isDeleted: initialData?.isDeleted || false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof AccountUI, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!readOnly) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {readOnly
              ? "View Account"
              : initialData
              ? "Edit Account"
              : "Add Account"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Username"
            disabled={readOnly}
          />

          <Input
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            disabled={readOnly}
          />

          <Input
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone"
            disabled={readOnly}
          />

          <Input
            value={formData.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
            placeholder="Avatar URL"
            disabled={readOnly}
          />

          <Select
            value={formData.role}
            onValueChange={(value) =>
              handleChange("role", value as AccountUI["role"])
            }
            disabled={readOnly}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="DOCTOR">Doctor</SelectItem>
              <SelectItem value="PATIENT">Patient</SelectItem>
            </SelectContent>
          </Select>

          {!readOnly && (
            <Button className="w-full" onClick={handleSubmit}>
              {initialData ? "Update" : "Create"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
