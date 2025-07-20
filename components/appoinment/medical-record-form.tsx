/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TestTube } from "lucide-react";
import {
  useCreateMedicalRecord,
  useMedicalRecordByAppointmentId,
} from "@/services/doctor/hooks";
import { toast } from "sonner";
import { validateMedicalRecord } from "@/utils/validate";
import { LabResult, MedicalRecordFormProps } from "@/types";

export default function MedicalRecordForm({
  appointmentId,
  record,
  doctorName,
  testItems,
  onSuccess,
}: MedicalRecordFormProps) {
  const [createdRecordId, setCreatedRecordId] = useState<string | null>(
    record?.recordId ?? null
  );
  const { mutate: createMedicalRecord } = useCreateMedicalRecord();
  // const { mutate: createLabResult } = useCreateLabResult();

  const { data: medicalRecord } =
    useMedicalRecordByAppointmentId(appointmentId);
  // Medical record
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  // Lab Results mapped from testItems
  const [labResults, setLabResults] = useState<LabResult[]>([]);

  useEffect(() => {
    if (medicalRecord) {
      setDiagnosis(medicalRecord.diagnosis || "");
      setNotes(medicalRecord.note || "");
      setLabResults(
        (medicalRecord.labResults ?? []).map((lab: LabResult) => ({
          ...lab,
          performedBy: lab.performedBy || doctorName || "",
        }))
      );
    } else {
      // Nếu không có medicalRecord, lấy testItems để nhập mới
      setDiagnosis("");
      setNotes("");
      setLabResults(
        testItems.map((t) => ({
          id: "",
          recordID: "",
          testType: t.testName,
          resultValue: "",
          resultText: "",
          unit: t.unit,
          referenceRange: t.referenceRange,
          testDate: new Date().toISOString(),
          performedBy: doctorName || "",
        }))
      );
    }
  }, [medicalRecord, testItems, doctorName]);

  const handleLabChange = (
    idx: number,
    field: keyof LabResult,
    value: string
  ) => {
    setLabResults((prev) =>
      prev.map((lab, i) => (i === idx ? { ...lab, [field]: value } : lab))
    );
  };

  const saveRecord = () => {
    if (!diagnosis.trim()) {
      return toast.error("Diagnosis is required");
    }
    const emptyTest = labResults.find(
      (lab) => !lab.resultValue || lab.resultValue.trim() === ""
    );
    if (emptyTest) {
      return toast.error("You must enter results for all tests!");
    }
    const err = validateMedicalRecord({ diagnosis, note: notes } as any);
    if (err) return toast.error(err);

    createMedicalRecord(
      { appointmentId, diagnosis, note: notes, labResults },
      {
        onSuccess: (data) => {
          setCreatedRecordId(data.recordId);
          if (onSuccess) onSuccess(); // <--- gọi callback về cha
        },
        onError: () => toast.error("Failed to save record"),
      }
    );
  };

  // const submitLabResults = () => {
  //   if (!createdRecordId) {
  //     return toast.error("Please save record first");
  //   }
  //   let anyError = false;
  //   labResults.forEach((lab) => {
  //     const err = validateLabResult(lab);
  //     if (err) {
  //       toast.error(err);
  //       anyError = true;
  //       return;
  //     }
  //     createLabResult(
  //       { ...lab, recordId: createdRecordId },
  //       {
  //         onSuccess: () => { },
  //         onError: () => toast.error("Failed to save lab result"),
  //       }
  //     );
  //   });
  //   if (!anyError) toast.success("Lab results submitted");
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex gap-2">
        <Button onClick={saveRecord} className="bg-primary">
          Save test results
        </Button>
        {/* <Button onClick={submitLabResults} variant="outline">
          Gửi kết quả xét nghiệm
        </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 mb-4">
            <Label>Diagnose</Label>
            <Textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-4 mb-4">
            <Label>Note</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Test results
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {labResults.map((lab, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded">
              <div className="grid gap-4 mb-4">
                <Label htmlFor="testType">Test Type</Label>
                <Input
                  value={lab.testType || ""}
                  className="bg-gray-50"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="grid gap-4 mb-4">
                  <Label>Results</Label>
                  <Input
                    value={lab.resultValue}
                    onChange={(e) =>
                      handleLabChange(idx, "resultValue", e.target.value)
                    }
                    placeholder="e.g., 650, &lt;50"
                    readOnly={!!medicalRecord}
                    className={!!medicalRecord ? "bg-gray-50" : ""}
                  />
                </div>
                <div className="grid gap-4 mb-4">
                  <Label>Unit</Label>
                  <Input
                    value={lab.unit || ""}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="grid gap-4 mb-4">
                  <Label>Reference Range</Label>
                  <Input
                    value={lab.referenceRange || ""}
                    onChange={(e) =>
                      handleLabChange(idx, "referenceRange", e.target.value)
                    }
                    placeholder="e.g., 500-1200, &lt;50"
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4">
                <Label>Note</Label>
                <Textarea
                  value={lab.resultText}
                  onChange={(e) =>
                    handleLabChange(idx, "resultText", e.target.value)
                  }
                  rows={2}
                  placeholder="Additional interpretation or notes about the result..."
                  readOnly={!!medicalRecord}
                  className={!!medicalRecord ? "bg-gray-50" : ""}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
