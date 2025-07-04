/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Activity,
  TestTube,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LabResult, MedicalRecord, Patient } from "@/types";
import {
  useCreateLabResult,
  useCreateMedicalRecord,
} from "@/services/doctor/hooks";

import { LabResult, MedicalRecord, MedicalRecordFormProps } from "@/types";
import { APPOINTMENT_STATUS_COLORS, hivTestTypes } from "@/constants";


export default function MedicalRecordForm({
  appointmentId,
  record,
  onBack,
}: MedicalRecordFormProps) {

  const [createdRecordId, setCreatedRecordId] = useState<string | null>(null);
  const { mutate: createMedicalRecord, isLoading } = useCreateMedicalRecord();
  const { mutate: createLabResult } = useCreateLabResult();

  const { mutate: createMedicalRecord } = useCreateMedicalRecord();


  const [formData, setFormData] = useState<Partial<MedicalRecord>>({
    patientId: "",
    patientName: "",
    recordDate: new Date().toISOString().split("T")[0],
    diagnosis: "",
    notes: "",
    treatmentPlan: "",
    followUpDate: "",
    hivStage: "Stage 1",
    cd4Count: undefined,
    viralLoad: undefined,
    labResults: [],
    createdBy: "Dr. Sarah Wilson",
    lastModified: new Date().toISOString(),
  });

  const [labResult, setLabResult] = useState<Partial<LabResult>>({
    testType: "",
    resultText: "",
    resultValue: "",
    unit: "",
    referenceRange: "",
    testDate: new Date().toISOString().split("T")[0],
    performedBy: "",
    status: "normal",
  });

  const [showLabForm, setShowLabForm] = useState(false);
  const [editingLabId, setEditingLabId] = useState<string | null>(null);

  useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleInputChange = (field: keyof MedicalRecord, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLabResultChange = (field: keyof LabResult, value: any) => {
    setLabResult((prev) => ({ ...prev, [field]: value }));
  };

  const addLabResult = () => {
    if (!labResult.testType || !labResult.resultValue) return;

    if (!createdRecordId) {
      alert("Chưa có recordId, hãy lưu Medical Record trước.");
      return;
    }

    createLabResult(
      {
        recordId: createdRecordId,
        testType: labResult.testType!,
        resultText: labResult.resultText || "",
        resultValue: labResult.resultValue!,
        unit: labResult.unit || "",
        referenceRange: labResult.referenceRange || "",
        testDate: labResult.testDate!,
        performedBy: labResult.performedBy || "Lab Technician",
      },
      {
        onSuccess: () => {
          // Xử lý khi thành công (ví dụ: load lại bảng, thông báo, v.v.)
          setLabResult({
            testType: "",
            resultText: "",
            resultValue: "",
            unit: "",
            referenceRange: "",
            testDate: new Date().toISOString().split("T")[0],
            performedBy: "",
            status: "normal",
          });
          setShowLabForm(false);
          setEditingLabId(null);
          // Có thể load lại danh sách labResults nếu muốn show ra
        },
        onError: (err) => {
          // Thông báo lỗi
        },
      }
    );
  };

  const editLabResult = (lab: LabResult) => {
    setLabResult(lab);
    setEditingLabId(lab.id);
    setShowLabForm(true);
  };

  const deleteLabResult = (labId: string) => {
    setFormData((prev) => ({
      ...prev,
      labResults: prev.labResults?.filter((lab) => lab.id !== labId) || [],
    }));
  };

  const handleSave = () => {
    if (!formData.diagnosis) return;

    createMedicalRecord(
      {
        appointmentId,
        diagnosis: formData.diagnosis,
        note: formData.notes || "",
      },
      {
        onSuccess: (data) => {
          if (data?.recordId) {
            setCreatedRecordId(data.recordId); // Lưu lại cho LabResult
          }
          // onBack(); // Chỉ back khi cần, hoặc chuyển qua bước thêm LabResult
        },
        onError: () => {},
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {record ? "Edit Medical Record" : "New Medical Record"}
          </h1>
          <p className="text-muted-foreground">
            {record
              ? `Last modified: ${new Date(
                  record.lastModified
                ).toLocaleString()}`
              : "Create a new HIV treatment record"}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Save Record
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    placeholder="Enter diagnosis..."
                    value={formData.diagnosis || ""}
                    onChange={(e) =>
                      handleInputChange("diagnosis", e.target.value)
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes..."
                    value={formData.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Lab Results Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  Laboratory Results
                </CardTitle>
                <Button
                  onClick={() => setShowLabForm(true)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lab Result
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showLabForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {editingLabId ? "Edit Lab Result" : "Add Lab Result"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="testType">Test Type</Label>
                        <Select
                          value={labResult.testType}
                          onValueChange={(value) =>
                            handleLabResultChange("testType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select test type" />
                          </SelectTrigger>
                          <SelectContent>
                            {hivTestTypes.map((test) => (
                              <SelectItem key={test} value={test}>
                                {test}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="testDate">Test Date</Label>
                        <Input
                          id="testDate"
                          type="date"
                          value={labResult.testDate}
                          onChange={(e) =>
                            handleLabResultChange("testDate", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="resultValue">Result Value</Label>
                        <Input
                          id="resultValue"
                          placeholder="e.g., 650, &lt;50, Negative"
                          value={labResult.resultValue}
                          onChange={(e) =>
                            handleLabResultChange("resultValue", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Input
                          id="unit"
                          placeholder="e.g., cells/μL, copies/mL"
                          value={labResult.unit}
                          onChange={(e) =>
                            handleLabResultChange("unit", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="referenceRange">Reference Range</Label>
                        <Input
                          id="referenceRange"
                          placeholder="e.g., 500-1200, &lt;50"
                          value={labResult.referenceRange}
                          onChange={(e) =>
                            handleLabResultChange(
                              "referenceRange",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="performedBy">Performed By</Label>
                        <Input
                          id="performedBy"
                          placeholder="Lab technician or facility"
                          value={labResult.performedBy}
                          onChange={(e) =>
                            handleLabResultChange("performedBy", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={labResult.status}
                          onValueChange={(value) =>
                            handleLabResultChange("status", value as any)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="abnormal">Abnormal</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="resultText">Additional Notes</Label>
                      <Textarea
                        id="resultText"
                        placeholder="Additional interpretation or notes about the result..."
                        value={labResult.resultText}
                        onChange={(e) =>
                          handleLabResultChange("resultText", e.target.value)
                        }
                        rows={2}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={addLabResult}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {editingLabId ? "Update Result" : "Add Result"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowLabForm(false);
                          setEditingLabId(null);
                          setLabResult({
                            testType: "",
                            resultText: "",
                            resultValue: "",
                            unit: "",
                            referenceRange: "",
                            testDate: new Date().toISOString().split("T")[0],
                            performedBy: "",
                            status: "normal",
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.labResults && formData.labResults.length > 0 ? (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Type</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Reference Range</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.labResults.map((lab) => (
                        <TableRow key={lab.id}>
                          <TableCell className="font-medium">
                            {lab.testType}
                          </TableCell>
                          <TableCell>
                            {lab.resultValue} {lab.unit}
                          </TableCell>
                          <TableCell>{lab.referenceRange}</TableCell>
                          <TableCell>
                            {new Date(lab.testDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                APPOINTMENT_STATUS_COLORS[lab.status] ||
                                APPOINTMENT_STATUS_COLORS.DEFAULT
                              }
                            >
                              {lab.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editLabResult(lab)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteLabResult(lab.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No lab results added yet</p>
                  <p className="text-sm">
                    Click &quot;Add Lab Result&quot; to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* HIV-Specific Information Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                HIV Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hivStage">HIV Stage</Label>
                <Select
                  value={formData.hivStage}
                  onValueChange={(value) =>
                    handleInputChange("hivStage", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stage 1">
                      Stage 1 (&gt;=500 CD4+ cells/μL)
                    </SelectItem>
                    <SelectItem value="Stage 2">
                      Stage 2 (200-499 CD4+ cells/μL)
                    </SelectItem>
                    <SelectItem value="Stage 3">
                      Stage 3 (&lt;200 CD4+ cells/μL)
                    </SelectItem>
                    <SelectItem value="AIDS">AIDS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cd4Count">CD4+ Count (cells/μL)</Label>
                <Input
                  id="cd4Count"
                  type="number"
                  placeholder="e.g., 650"
                  value={formData.cd4Count || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "cd4Count",
                      e.target.value
                        ? Number.parseInt(e.target.value)
                        : undefined
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="viralLoad">Viral Load (copies/mL)</Label>
                <Input
                  id="viralLoad"
                  type="number"
                  placeholder="e.g., 0 for undetectable"
                  value={formData.viralLoad || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "viralLoad",
                      e.target.value
                        ? Number.parseInt(e.target.value)
                        : undefined
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Treatment Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>HIV Treatment Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription>
                  <strong>CD4+ Count Monitoring:</strong>
                  <br />
                  &gt; 500: Every 6-12 months
                  <br />
                  200-500: Every 3-6 months
                  <br />
                  &lt; 200: Every 3 months
                </AlertDescription>
              </Alert>

              <Alert>
                <TestTube className="h-4 w-4" />
                <AlertDescription>
                  <strong>Viral Load Goals:</strong>
                  <br />
                  Target: Undetectable (&lt; 50 copies/mL)
                  <br />
                  Monitor every 3-6 months
                  <br />
                  Check 2-8 weeks after ART changes
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
