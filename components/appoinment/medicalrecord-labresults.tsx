import { useState } from "react";
import { useLabResultsByAppointmentId } from "@/services/doctor/hooks";
import {
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Pencil,
  PlusCircle,
} from "lucide-react";
import { MedicalRecordWithLabResultsProps } from "@/types";
import { Button } from "../ui/button";
import AddLabResultModal from "./AddLabResultModal";

const MedicalRecordWithLabResults = ({
  medicalRecord,
  appointment,
  onEditMedicalRecord,
}: MedicalRecordWithLabResultsProps) => {
  const [open, setOpen] = useState(false);

  const [openAddLabModal, setOpenAddLabModal] = useState(false);

  const {
    data: labResults = [],
    isLoading,
    error,
  } = useLabResultsByAppointmentId(appointment.appointmentID);

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="font-semibold">
            Diagnosis:{" "}
            <span className="font-normal">
              {medicalRecord.diagnosis || "--"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Created:{" "}
            {medicalRecord.createDate
              ? new Date(medicalRecord.createDate).toLocaleString("vi-VN")
              : "--"}
          </div>
          {medicalRecord.note && (
            <div className="mt-1 text-sm">Note: {medicalRecord.note}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Nút Edit Medical Record */}
          {onEditMedicalRecord && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEditMedicalRecord();
              }}
              title="Edit medical record"
            >
              <Pencil className="h-5 w-5" />
            </Button>
          )}
          {/* Toggle mở/đóng */}
          <button className="ml-3">
            {open ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 border-t pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold mb-2">
            <FlaskConical className="h-4 w-4" /> Lab Results
            {/* Nút Add Lab Result */}
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => setOpenAddLabModal(true)}
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Lab Result
            </Button>
          </div>
          {isLoading ? (
            <div>Loading lab results...</div>
          ) : error ? (
            <div className="text-red-500">Error loading lab results.</div>
          ) : labResults.length === 0 ? (
            <div>No lab results for this record.</div>
          ) : (
            <div className="space-y-2">
              {labResults.map((result) => (
                <div
                  key={`${result.testType}-${result.testDate}`}
                  className="border rounded-lg p-2 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{result.testType}</div>
                    <div className="text-xs text-muted-foreground">
                      Date & Time:{" "}
                      {result.testDate
                        ? (() => {
                            const d = new Date(result.testDate);
                            const hh = d
                              .getUTCHours()
                              .toString()
                              .padStart(2, "0");
                            const mm = d
                              .getUTCMinutes()
                              .toString()
                              .padStart(2, "0");
                            const dd = d
                              .getUTCDate()
                              .toString()
                              .padStart(2, "0");
                            const MM = (d.getUTCMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const yyyy = d.getUTCFullYear();
                            return `${hh}:${mm} ${dd}/${MM}/${yyyy}`;
                          })()
                        : "--"}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Reference: {result.referenceRange || "--"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      By: {result.performedBy || "--"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {result.resultValue} {result.unit}
                    </div>
                    <div className="text-xs">{result.resultText}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <AddLabResultModal
        recordId={medicalRecord.recordId}
        open={openAddLabModal}
        performedByDefault={appointment.doctor?.name}
        onClose={() => setOpenAddLabModal(false)}
      />
    </div>
  );
};

export default MedicalRecordWithLabResults;
