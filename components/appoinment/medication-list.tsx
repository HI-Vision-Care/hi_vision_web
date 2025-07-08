"use client";

import { useState } from "react";
import { Plus, Pill, AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Medication } from "@/types";

interface MedicationsListProps {
  medications: Medication[];
  onMedicationSelect: (medication: Medication) => void;
  onCreateNew: () => void;
}

export default function MedicationsList({
  medications,
  onMedicationSelect,
  onCreateNew,
}: MedicationsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [drugClassFilter, setDrugClassFilter] = useState("all");

  const filteredMedications = medications.filter((medication) => {
    const matchesSearch =
      medication.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.medicationName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || medication.status === statusFilter;
    const matchesDrugClass =
      drugClassFilter === "all" || medication.drugClass === drugClassFilter;
    return matchesSearch && matchesStatus && matchesDrugClass;
  });

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

  const needsRefill = (medication: Medication) => {
    return medication.refillsRemaining <= 1;
  };

  const isExpiringSoon = (medication: Medication) => {
    if (!medication.endDate) return false;
    const endDate = new Date(medication.endDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  // Calculate statistics
  const totalMedications = medications.length;
  const activeMedications = medications.filter(
    (m) => m.status === "Active"
  ).length;
  const needingRefills = medications.filter((m) => needsRefill(m)).length;
  const expiringSoon = medications.filter((m) => isExpiringSoon(m)).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HIV Medications</h1>
          <p className="text-muted-foreground">
            Manage HIV treatment medications and prescriptions
          </p>
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Medications
            </CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMedications}</div>
            <p className="text-xs text-muted-foreground">All prescriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Pill className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {activeMedications}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently prescribed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Refills</CardTitle>
            <RefreshCw className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {needingRefills}
            </div>
            <p className="text-xs text-muted-foreground">Low refill count</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {expiringSoon}
            </div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(needingRefills > 0 || expiringSoon > 0) && (
        <div className="space-y-2">
          {needingRefills > 0 && (
            <Alert>
              <RefreshCw className="h-4 w-4" />
              <AlertDescription>
                <strong>{needingRefills} medication(s)</strong> need refill
                authorization. Review and approve refills to ensure continuous
                treatment.
              </AlertDescription>
            </Alert>
          )}
          {expiringSoon > 0 && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>{expiringSoon} medication(s)</strong> are expiring
                within 30 days. Consider treatment plan review.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by patient name or medication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Discontinued">Discontinued</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={drugClassFilter} onValueChange={setDrugClassFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Drug Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="INSTI + NRTI">INSTI + NRTI</SelectItem>
                <SelectItem value="NNRTI + NRTI">NNRTI + NRTI</SelectItem>
                <SelectItem value="PI + NRTI">PI + NRTI</SelectItem>
                <SelectItem value="Entry Inhibitor">Entry Inhibitor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medications List */}
      <div className="grid gap-4">
        {filteredMedications.map((medication) => (
          <Card
            key={medication.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-primary">
                      {new Date(medication.prescribedDate).getDate()}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {new Date(medication.prescribedDate).toLocaleDateString(
                        "en-US",
                        { month: "short" }
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(medication.prescribedDate).getFullYear()}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {medication.patientName}
                      </h3>
                      <Badge className={getStatusColor(medication.status)}>
                        {medication.status}
                      </Badge>
                      {needsRefill(medication) && (
                        <Badge
                          variant="outline"
                          className="text-warning border-warning"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Refill Needed
                        </Badge>
                      )}
                      {isExpiringSoon(medication) && (
                        <Badge
                          variant="outline"
                          className="text-red-500 border-red-500"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Expiring Soon
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm mb-2">
                      <span className="font-medium">Medication:</span>{" "}
                      {medication.medicationName}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Dosage:
                        </span>
                        <div className="font-medium">{medication.dosage}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Frequency:
                        </span>
                        <div className="font-medium">
                          {medication.frequency}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Drug Class:
                        </span>
                        <div>
                          <Badge
                            className={getDrugClassColor(medication.drugClass)}
                            variant="outline"
                          >
                            {medication.drugClass}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Refills:
                        </span>
                        <div className="font-medium">
                          {medication.refillsRemaining}/
                          {medication.totalRefills}
                        </div>
                      </div>
                    </div>

                    {medication.instructions && (
                      <div className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium">Instructions:</span>{" "}
                        {medication.instructions}
                      </div>
                    )}

                    {medication.sideEffects &&
                      medication.sideEffects.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <span className="text-sm text-muted-foreground">
                            Side effects:{" "}
                            {medication.sideEffects.slice(0, 3).join(", ")}
                            {medication.sideEffects.length > 3 && "..."}
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <Button
                    onClick={() => onMedicationSelect(medication)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    View Details
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Duration: {medication.duration}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    By: {medication.prescribedBy}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No medications found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || drugClassFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No medications have been prescribed yet."}
            </p>
            <Button
              onClick={onCreateNew}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Prescription
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
