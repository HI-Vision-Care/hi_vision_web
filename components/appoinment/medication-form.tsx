"use client";

import { useState } from "react";
import {
  Save,
  PlusCircle,
  Trash2,
  Pill,
  User,
  Stethoscope,
  AlertCircle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetAllArvs } from "@/services/arv/hooks";
import { useCreatePrescription } from "@/services/prescription/hooks";

interface MedicationFormProps {
  initialPatientId: string;
  prescribedBy?: string;
  onSuccess?: () => void;
}

export default function MedicationForm({
  initialPatientId,
  prescribedBy,
  onSuccess,
}: MedicationFormProps) {
  const { data: arvs, isLoading: isLoadingArvs } = useGetAllArvs();
  const [arvRows, setArvRows] = useState([
    { arvID: "", dosage: "", duration: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const { mutate: createPrescription, isPending } = useCreatePrescription();
  const doctorName = prescribedBy || "Dr. John Doe";

  const handleArvChange = (
    idx: number,
    field: "arvID" | "dosage" | "duration",
    value: string
  ) => {
    setArvRows((prev) => {
      const next = [...prev];
      next[idx][field] = value;
      return next;
    });
  };

  const handleAddRow = () =>
    setArvRows((prev) => [...prev, { arvID: "", dosage: "", duration: "" }]);

  const handleRemoveRow = (idx: number) =>
    setArvRows((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)
    );

  const handleSubmit = () => {
    if (!initialPatientId) return alert("Thiếu thông tin bệnh nhân!");
    if (arvRows.some((row) => !row.arvID || !row.dosage || !row.duration)) {
      return alert("Vui lòng nhập đầy đủ thông tin các thuốc!");
    }
    setSubmitting(true);
    createPrescription(
      {
        patientId: initialPatientId,
        payload: {
          prescriptionRequest: { prescribeBy: doctorName },
          arvRequests: arvRows.map((row) => ({
            arvID: row.arvID,
            dosage: row.dosage,
            duration: row.duration,
          })),
        },
      },
      {
        onSuccess: () => {
          setSubmitting(false);
          if (onSuccess) onSuccess();
        },
        onError: () => setSubmitting(false),
      }
    );
  };

  const isFormValid = arvRows.every(
    (row) => row.arvID && row.dosage && row.duration
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen  p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Pill className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    ARV Prescription
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Create HIV medication prescription with multiple drugs,
                    dosages, and treatment duration
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
                disabled={submitting || isPending || !isFormValid}
              >
                <Save className="h-5 w-5 mr-2" />
                Save Prescription
              </Button>
            </div>
          </div>

          {/* Patient & Doctor Information */}
          <Card className="shadow-sm border-0 bg-white ">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <User className="h-5 w-5 text-gray-600" />
                Patient & Physician Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Patient ID
                  </Label>
                  <Input
                    value={initialPatientId}
                    disabled
                    className="bg-gray-50 border-gray-200 text-gray-800 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Prescribing Physician
                  </Label>
                  <Input
                    value={doctorName}
                    disabled
                    className="bg-gray-50 border-gray-200 text-gray-800"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medication List */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <Pill className="h-5 w-5 text-green-600" />
                ARV Medications
                <Badge variant="secondary" className="ml-2">
                  {arvRows.length}{" "}
                  {arvRows.length === 1 ? "medication" : "medications"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {arvRows.map((row, idx) => {
                  const selectedArv = arvs?.find(
                    (arv) => arv.arvId === row.arvID
                  );
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-6 bg-gray-50/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Medication #{idx + 1}
                        </h3>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveRow(idx)}
                                disabled={arvRows.length === 1}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Remove medication</TooltipContent>
                          </Tooltip>
                          {idx === arvRows.length - 1 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleAddRow}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 bg-transparent"
                                >
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Add another medication
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* ARV Selection */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">
                            ARV Medication *
                          </Label>

                          <Select
                            value={row.arvID}
                            onValueChange={(val) => {
                              // Auto-fill dosage khi chọn thuốc!
                              handleArvChange(idx, "arvID", val);
                              const autoArv = arvs?.find(
                                (a) => a.arvId === val
                              );
                              if (autoArv?.rcmDosage) {
                                handleArvChange(
                                  idx,
                                  "dosage",
                                  autoArv.rcmDosage
                                );
                              }
                            }}
                          >
                            <SelectTrigger className="bg-white border-gray-300">
                              <SelectValue
                                placeholder={
                                  isLoadingArvs
                                    ? "Loading medications..."
                                    : "Select ARV medication"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {(arvs || []).map((arv) => (
                                <SelectItem key={arv.arvId} value={arv.arvId}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {arv.arvId}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {arv.genericName}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Dosage */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">
                            Dosage *
                          </Label>
                          <Input
                            placeholder="e.g., 1 tablet/day"
                            value={row.dosage}
                            onChange={(e) =>
                              handleArvChange(idx, "dosage", e.target.value)
                            }
                            className="bg-white border-gray-300"
                          />
                          {selectedArv?.rcmDosage && (
                            <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                              <Info className="h-3 w-3" />
                              <span>
                                Recommended:{" "}
                                <strong>{selectedArv.rcmDosage}</strong>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">
                            Duration (days) *
                          </Label>
                          <Input
                            placeholder="e.g., 30"
                            type="number"
                            value={row.duration}
                            onChange={(e) =>
                              handleArvChange(idx, "duration", e.target.value)
                            }
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>

                      {/* Medication Details */}
                      {selectedArv && (
                        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Info className="h-4 w-4 text-blue-600" />
                            Medication Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">
                                Drug Class:
                              </span>
                              <span className="ml-2 text-gray-600">
                                {selectedArv.drugClass} -{" "}
                                {selectedArv.regimenLevel}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">
                                Route:
                              </span>
                              <span className="ml-2 text-gray-600">
                                {selectedArv.admRoute}
                              </span>
                            </div>
                          </div>

                          <Separator className="my-3" />

                          <div className="space-y-3">
                            {selectedArv.indication &&
                              selectedArv.indication.length > 0 && (
                                <div>
                                  <span className="font-medium text-green-700">
                                    Indications:
                                  </span>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {selectedArv.indication.join("; ")}
                                  </p>
                                </div>
                              )}

                            {selectedArv.contraindication &&
                              selectedArv.contraindication.length > 0 && (
                                <Alert className="border-red-200 bg-red-50">
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                  <AlertDescription className="text-red-800">
                                    <span className="font-medium">
                                      Contraindications:
                                    </span>{" "}
                                    {selectedArv.contraindication.join("; ")}
                                  </AlertDescription>
                                </Alert>
                              )}

                            {selectedArv.sideEffect &&
                              selectedArv.sideEffect.length > 0 && (
                                <div>
                                  <span className="font-medium text-orange-700">
                                    Side Effects:
                                  </span>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {selectedArv.sideEffect.join("; ")}
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Form Validation Alert */}
          {!isFormValid && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Please complete all required fields for each medication before
                saving the prescription.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
