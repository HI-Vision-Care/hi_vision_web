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
import { updateAccount, createAccount } from "@/services/account/api";
import { toast } from "sonner";

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

  const handleSubmit = async () => {
    try {
      if (readOnly) return;

      if (isEditMode && initialData?.id) {
        const payload = {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          avatar: formData.avatar,
        };
        await updateAccount(initialData.id, payload);
        toast.success("Account updated successfully!");

        onSave({
          ...initialData,
          ...payload,
        });
      } else {
        await createAccount({
          email: formData.email,
          password: formData.password,
          role: formData.role as "ADMIN" | "DOCTOR" | "PATIENT",
        });
        toast.success("Account created successfully!");

        onSave({
          id: crypto.randomUUID(), // giả lập ID nếu backend chưa trả về
          username: formData.email.split("@")[0],
          email: formData.email,
          phone: "",
          avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Admin",
          role: formData.role as "ADMIN" | "DOCTOR" | "PATIENT",
          isDeleted: false,
        });
      }

      onClose();
    } catch (error) {
      console.error("Error saving account:", error);
      toast.error("Failed to save account.");
    }
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
