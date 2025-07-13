"use client";

import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicalRecord } from "@/types";

interface MedicalRecordsListProps {
  medicalRecords: MedicalRecord[];
  onRecordSelect: (record: MedicalRecord) => void;
  onCreateNew: () => void;
}

export default function MedicalRecordsList({
  medicalRecords,
  onRecordSelect,
  onCreateNew,
}: MedicalRecordsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch = record.diagnosis
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">
            Manage HIV treatment records and patient care documentation
          </p>
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by patient name or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by HIV stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Stage 1">Stage 1</SelectItem>
                <SelectItem value="Stage 2">Stage 2</SelectItem>
                <SelectItem value="Stage 3">Stage 3</SelectItem>
                <SelectItem value="AIDS">AIDS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <Card
            key={record.recordId}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    Record ID: {record.recordId}
                  </h3>
                </div>
                <div className="text-sm mb-2">
                  <span className="font-medium">Diagnosis:</span>{" "}
                  {record.diagnosis}
                </div>
                <div className="text-sm mb-2">
                  <span className="font-medium">Appointment ID:</span>{" "}
                  {record.appointmentId}
                </div>
                <div className="text-sm mb-2">
                  <span className="font-medium">Date:</span>{" "}
                  {record.createDate
                    ? new Date(record.createDate).toLocaleDateString("vi-VN")
                    : "N/A"}
                </div>
                <div className="text-sm mb-2">
                  <span className="font-medium">Note:</span> {record.note}
                </div>
              </div>
              <Button
                onClick={() => onRecordSelect(record)}
                className="bg-primary hover:bg-primary/90"
              >
                View Record
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No medical records found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || stageFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No medical records have been created yet."}
            </p>
            <Button
              onClick={onCreateNew}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Record
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
