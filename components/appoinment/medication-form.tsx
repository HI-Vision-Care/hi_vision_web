"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Pill,
  User,
  AlertTriangle,
  Info,
  Calendar,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Medication, Patient } from "@/types";

interface MedicationFormProps {
  medication: Medication | null;
  onSave: (medication: Medication) => void;
  onDelete: (medicationId: string) => void;
  onBack: () => void;
  patients: Patient[];
}

// HIV Medication Database
const hivMedications = [
  {
    name: "Bictegravir/Tenofovir alafenamide/Emtricitabine",
    brandName: "Biktarvy",
    drugClass: "INSTI + NRTI",
    commonDosages: ["50mg/25mg/200mg"],
    frequencies: ["Once daily"],
    sideEffects: ["Nausea", "Headache", "Diarrhea", "Fatigue"],
    interactions: ["Antacids", "Iron supplements", "Calcium supplements"],
    instructions: "Take with or without food at the same time each day",
  },
  {
    name: "Efavirenz/Emtricitabine/Tenofovir disoproxil",
    brandName: "Atripla",
    drugClass: "NNRTI + NRTI",
    commonDosages: ["600mg/200mg/300mg"],
    frequencies: ["Once daily at bedtime"],
    sideEffects: ["Dizziness", "Vivid dreams", "Rash", "Depression"],
    interactions: ["Warfarin", "Voriconazole", "Midazolam"],
    instructions: "Take on empty stomach, preferably at bedtime",
  },
  {
    name: "Dolutegravir/Abacavir/Lamivudine",
    brandName: "Triumeq",
    drugClass: "INSTI + NRTI",
    commonDosages: ["50mg/600mg/300mg"],
    frequencies: ["Once daily"],
    sideEffects: ["Insomnia", "Headache", "Nausea"],
    interactions: ["Metformin", "Dofetilide"],
    instructions: "Take with or without food",
  },
  {
    name: "Rilpivirine/Emtricitabine/Tenofovir alafenamide",
    brandName: "Odefsey",
    drugClass: "NNRTI + NRTI",
    commonDosages: ["25mg/200mg/25mg"],
    frequencies: ["Once daily with meal"],
    sideEffects: ["Depression", "Insomnia", "Headache"],
    interactions: ["Proton pump inhibitors", "H2 antagonists"],
    instructions: "Take with a meal",
  },
];

export default function MedicationForm({
  medication,
  onSave,
  onDelete,
  onBack,
  patients,
}: MedicationFormProps) {
  const [formData, setFormData] = useState<Partial<Medication>>({
    patientId: "",
    patientName: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    prescribedBy: "Dr. Sarah Wilson",
    prescribedDate: new Date().toISOString().split("T")[0],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "Active",
    refillsRemaining: 5,
    totalRefills: 5,
    notes: "",
    drugClass: "",
    sideEffects: [],
    interactions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [selectedMedication, setSelectedMedication] = useState<
    (typeof hivMedications)[0] | null
  >(null);
  const [showInteractions, setShowInteractions] = useState(false);
  const [showSideEffects, setShowSideEffects] = useState(false);

  useEffect(() => {
    if (medication) {
      setFormData(medication);
      const medInfo = hivMedications.find(
        (med) => med.name === medication.medicationName
      );
      if (medInfo) {
        setSelectedMedication(medInfo);
      }
    }
  }, [medication]);

  const handleInputChange = (field: keyof Medication, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setFormData((prev) => ({
        ...prev,
        patientId: patient.id,
        patientName: patient.name,
      }));
    }
  };

  const handleMedicationSelect = (medicationName: string) => {
    const medInfo = hivMedications.find((med) => med.name === medicationName);
    if (medInfo) {
      setSelectedMedication(medInfo);
      setFormData((prev) => ({
        ...prev,
        medicationName: medInfo.name,
        drugClass: medInfo.drugClass,
        instructions: medInfo.instructions,
        sideEffects: medInfo.sideEffects,
        interactions: medInfo.interactions,
        dosage: medInfo.commonDosages[0] || "",
        frequency: medInfo.frequencies[0] || "",
      }));
    }
  };

  const handleSave = () => {
    if (
      !formData.patientId ||
      !formData.medicationName ||
      !formData.dosage ||
      !formData.duration
    ) {
      return;
    }

    const medicationToSave: Medication = {
      id: formData.id || `med_${Date.now()}`,
      patientId: formData.patientId!,
      patientName: formData.patientName!,
      medicationName: formData.medicationName!,
      dosage: formData.dosage!,
      frequency: formData.frequency!,
      duration: formData.duration!,
      instructions: formData.instructions || "",
      prescribedBy: formData.prescribedBy!,
      prescribedDate: formData.prescribedDate!,
      startDate: formData.startDate!,
      endDate: formData.endDate || "",
      status: (formData.status as any) || "Active",
      refillsRemaining: formData.refillsRemaining || 0,
      totalRefills: formData.totalRefills || 0,
      notes: formData.notes || "",
      drugClass: formData.drugClass || "",
      sideEffects: formData.sideEffects || [],
      interactions: formData.interactions || [],
      createdAt: formData.createdAt!,
      updatedAt: new Date().toISOString(),
    };

    onSave(medicationToSave);
  };

  const handleDelete = () => {
    if (medication?.id) {
      onDelete(medication.id);
      onBack();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Discontinued":
        return "bg-red-100 text-red-800";
      case "On Hold":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDrugClassColor = (drugClass: string) => {
    switch (drugClass) {
      case "INSTI + NRTI":
        return "bg-primary text-primary-foreground";
      case "NNRTI + NRTI":
        return "bg-secondary text-secondary-foreground";
      case "PI + NRTI":
        return "bg-accent text-accent-foreground";
      case "Entry Inhibitor":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            {medication ? "Edit Medication" : "New HIV Prescription"}
          </h1>
          <p className="text-muted-foreground">
            {medication
              ? `Last updated: ${new Date(
                  medication.updatedAt
                ).toLocaleString()}`
              : "Prescribe HIV treatment medication"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {medication && (
            <Button
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Prescription
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient & Medication Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient & Medication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    value={formData.patientId}
                    onValueChange={handlePatientSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} - Age {patient.age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="prescribedDate">Prescribed Date</Label>
                  <Input
                    id="prescribedDate"
                    type="date"
                    value={formData.prescribedDate}
                    onChange={(e) =>
                      handleInputChange("prescribedDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="medication">HIV Medication</Label>
                <Select
                  value={formData.medicationName}
                  onValueChange={handleMedicationSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select HIV medication" />
                  </SelectTrigger>
                  <SelectContent>
                    {hivMedications.map((med) => (
                      <SelectItem key={med.name} value={med.name}>
                        {med.brandName} ({med.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMedication && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{selectedMedication.brandName}</strong> -{" "}
                    {selectedMedication.drugClass}
                    <br />
                    {selectedMedication.instructions}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Prescription Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Prescription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Select
                    value={formData.dosage}
                    onValueChange={(value) =>
                      handleInputChange("dosage", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dosage" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedMedication?.commonDosages.map((dosage) => (
                        <SelectItem key={dosage} value={dosage}>
                          {dosage}
                        </SelectItem>
                      )) || (
                        <SelectItem value="custom">
                          Enter custom dosage
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {!selectedMedication && (
                    <Input
                      className="mt-2"
                      placeholder="Enter dosage (e.g., 50mg/25mg/200mg)"
                      value={formData.dosage}
                      onChange={(e) =>
                        handleInputChange("dosage", e.target.value)
                      }
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) =>
                      handleInputChange("frequency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedMedication?.frequencies.map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      )) || (
                        <>
                          <SelectItem value="Once daily">Once daily</SelectItem>
                          <SelectItem value="Twice daily">
                            Twice daily
                          </SelectItem>
                          <SelectItem value="Three times daily">
                            Three times daily
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) =>
                      handleInputChange("duration", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="30 days">30 days</SelectItem>
                      <SelectItem value="60 days">60 days</SelectItem>
                      <SelectItem value="90 days">90 days</SelectItem>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="1 year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="totalRefills">Total Refills</Label>
                  <Input
                    id="totalRefills"
                    type="number"
                    min="0"
                    max="12"
                    value={formData.totalRefills}
                    onChange={(e) =>
                      handleInputChange(
                        "totalRefills",
                        Number.parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="refillsRemaining">Refills Remaining</Label>
                  <Input
                    id="refillsRemaining"
                    type="number"
                    min="0"
                    value={formData.refillsRemaining}
                    onChange={(e) =>
                      handleInputChange(
                        "refillsRemaining",
                        Number.parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Discontinued">Discontinued</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Special instructions for taking this medication..."
                  value={formData.instructions}
                  onChange={(e) =>
                    handleInputChange("instructions", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes">Clinical Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about this prescription..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Drug Interactions & Side Effects */}
          {selectedMedication && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Safety Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showInteractions"
                    checked={showInteractions}
                    onCheckedChange={setShowInteractions}
                  />
                  <Label htmlFor="showInteractions">
                    Show Drug Interactions
                  </Label>
                </div>

                {showInteractions && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Drug Interactions:</strong>
                      <ul className="mt-2 space-y-1">
                        {selectedMedication.interactions.map(
                          (interaction, index) => (
                            <li key={index} className="text-sm">
                              • {interaction}
                            </li>
                          )
                        )}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showSideEffects"
                    checked={showSideEffects}
                    onCheckedChange={setShowSideEffects}
                  />
                  <Label htmlFor="showSideEffects">
                    Show Common Side Effects
                  </Label>
                </div>

                {showSideEffects && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Common Side Effects:</strong>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selectedMedication.sideEffects.map((effect, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prescription Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Prescription Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.medicationName && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Medication
                  </span>
                  <div className="font-medium text-sm">
                    {formData.medicationName}
                  </div>
                </div>
              )}

              {formData.drugClass && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Drug Class
                  </span>
                  <div>
                    <Badge
                      className={getDrugClassColor(formData.drugClass)}
                      variant="outline"
                    >
                      {formData.drugClass}
                    </Badge>
                  </div>
                </div>
              )}

              {formData.dosage && (
                <div>
                  <span className="text-sm text-muted-foreground">Dosage</span>
                  <div className="font-medium">{formData.dosage}</div>
                </div>
              )}

              {formData.frequency && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Frequency
                  </span>
                  <div className="font-medium">{formData.frequency}</div>
                </div>
              )}

              {formData.duration && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <div className="font-medium">{formData.duration}</div>
                </div>
              )}

              {formData.status && (
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div>
                    <Badge className={getStatusColor(formData.status)}>
                      {formData.status}
                    </Badge>
                  </div>
                </div>
              )}

              {formData.refillsRemaining !== undefined &&
                formData.totalRefills !== undefined && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Refills
                    </span>
                    <div className="font-medium">
                      {formData.refillsRemaining}/{formData.totalRefills}{" "}
                      remaining
                    </div>
                  </div>
                )}

              {formData.startDate && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Start Date
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(formData.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* HIV Treatment Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>HIV Treatment Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <Pill className="h-4 w-4" />
                <AlertDescription>
                  <strong>ART Adherence:</strong>
                  <br />
                  Take medications exactly as prescribed. Missing doses can lead
                  to drug resistance.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Drug Interactions:</strong>
                  <br />
                  Always check for interactions with new medications,
                  supplements, or herbal products.
                </AlertDescription>
              </Alert>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Monitoring:</strong>
                  <br />
                  Regular viral load and CD4 count monitoring is essential for
                  treatment success.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <User className="h-4 w-4 mr-2" />
                View Patient Records
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <Pill className="h-4 w-4 mr-2" />
                Check Drug Database
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
