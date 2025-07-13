"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useCreateLabResult } from "@/services/doctor/hooks";
import { X, TestTube, FileText, Activity, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HIV_TEST_TYPES, UNIT_OPTIONS } from "@/constants";

const initialForm = {
  testType: "",
  testTypeOther: "",
  resultText: "",
  resultValue: "",
  unit: "",
  unitOther: "",
  referenceRange: "",
  performedBy: "",
  testTime: "",
};

const AddLabResultModal = ({
  recordId,
  open,
  onClose,
  performedByDefault,
}: {
  recordId: string;
  open: boolean;
  performedByDefault?: string;
  onClose: () => void;
}) => {
  const [form, setForm] = useState(initialForm);

  const {
    mutate: createLabResult,
    isPending,
    isSuccess,
  } = useCreateLabResult(onClose);

  // Reset form khi mở modal mới hoặc khi thành công
  useEffect(() => {
    if (open || isSuccess) setForm(initialForm);
  }, [open, isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const testDateISO = new Date().toISOString();

    createLabResult({
      ...form,
      testDate: testDateISO,
      recordId,
      performedBy: performedByDefault || "",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TestTube className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add Lab Result
              </h2>
              <p className="text-sm text-gray-500">
                Enter HIV test results and details
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close modal</span>
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Test Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <TestTube className="h-4 w-4" />
              Test Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="testType"
                  className="text-sm font-medium text-gray-700"
                >
                  Test Type *
                </Label>
                <Select
                  value={form.testType}
                  onValueChange={(value) =>
                    setForm({ ...form, testType: value, testTypeOther: "" })
                  }
                >
                  <SelectTrigger className="h-10 w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <SelectValue placeholder="Select HIV Test Type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {HIV_TEST_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Nếu chọn "Other", cho phép nhập tay */}
                {form.testType === "Other" && (
                  <Input
                    id="testTypeOther"
                    name="testTypeOther"
                    placeholder="Enter test type"
                    value={form.testTypeOther || ""}
                    onChange={(e) =>
                      setForm({ ...form, testTypeOther: e.target.value })
                    }
                    className="h-10 mt-2"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3 pt-2 border-t border-gray-100">
              <Activity className="h-4 w-4" />
              Test Results
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="resultValue"
                  className="text-sm font-medium text-gray-700"
                >
                  Result Value *
                </Label>
                <Input
                  id="resultValue"
                  name="resultValue"
                  type="number"
                  placeholder="e.g., 0.13"
                  value={form.resultValue}
                  onChange={handleChange}
                  required
                  className="h-10"
                  step="any"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="unit"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <Ruler className="h-3 w-3" />
                  Unit
                </Label>
                <Select
                  value={form.unit}
                  onValueChange={(value) =>
                    setForm({ ...form, unit: value, unitOther: "" })
                  }
                >
                  <SelectTrigger className="h-10 w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <SelectValue placeholder="Select unit..." />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIT_OPTIONS.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.unit === "Other" && (
                  <Input
                    id="unitOther"
                    name="unitOther"
                    placeholder="Enter unit"
                    value={form.unitOther || ""}
                    onChange={(e) =>
                      setForm({ ...form, unitOther: e.target.value })
                    }
                    className="h-10 mt-2"
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="referenceRange"
                  className="text-sm font-medium text-gray-700"
                >
                  Reference Range
                </Label>
                <Input
                  id="referenceRange"
                  name="referenceRange"
                  placeholder="e.g., <50 copies/mL"
                  value={form.referenceRange}
                  onChange={handleChange}
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="resultText"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                Additional Notes
              </Label>
              <Input
                id="resultText"
                name="resultText"
                placeholder="Additional result details, interpretations, or notes"
                value={form.resultText}
                onChange={handleChange}
                className="h-10"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 h-10 bg-transparent"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </div>
              ) : (
                "Add Result"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLabResultModal;
