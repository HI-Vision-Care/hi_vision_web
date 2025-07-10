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
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Admin",
    role: "PATIENT",
    password: "", // chỉ dùng khi tạo mới
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        avatar:
          initialData.avatar ||
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Admin",
        role: initialData.role || "PATIENT",
        password: "",
      });
    } else {
      setFormData({
        username: "",
        email: "",
        phone: "",
        avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Admin",
        role: "PATIENT",
        password: "",
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (readOnly) return;

    if (isEditMode) {
      // Edit mode: trả về đủ thông tin để update
      const accountData = {
        ...initialData,
        ...formData,
        role: formData.role as "ADMIN" | "DOCTOR" | "PATIENT",
      };
      onSave(accountData);
    } else {
      // Create mode: chỉ cần đúng các trường BE yêu cầu (email, password, role)
      const accountData = {
        email: formData.email,
        password: formData.password,
        role: formData.role as "ADMIN" | "DOCTOR" | "PATIENT",
      };
      onSave(accountData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {readOnly
              ? "View Account"
              : isEditMode
              ? "Edit Account"
              : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!isEditMode && (
            <>
              <Input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email"
                disabled={readOnly}
              />
              <Input
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Password"
                type="password"
                disabled={readOnly}
              />
              <Select
                value={formData.role}
                onValueChange={(val) => handleChange("role", val)}
                disabled={readOnly}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="DOCTOR">DOCTOR</SelectItem>
                  {/* <SelectItem value="PATIENT">PATIENT</SelectItem> */}
                </SelectContent>
              </Select>
            </>
          )}

          {isEditMode && (
            <>
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
              <Input
                value={formData.role}
                disabled
                className="opacity-80 text-gray-500"
              />
            </>
          )}

          {!readOnly && (
            <Button className="w-full" onClick={handleSubmit}>
              {isEditMode ? "Update" : "Create"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
