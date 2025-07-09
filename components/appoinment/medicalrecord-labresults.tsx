import { useState } from "react";
import { useLabResultsByAppointmentId } from "@/services/doctor/hooks";
import { ChevronDown, ChevronUp, FlaskConical } from "lucide-react";
import { MedicalRecordWithLabResultsProps } from "@/types";

const MedicalRecordWithLabResults = ({
  medicalRecord,
  appointment,
}: MedicalRecordWithLabResultsProps) => {
  const [open, setOpen] = useState(false);

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
        <button className="ml-3">
          {open ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      {open && (
        <div className="mt-3 border-t pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold mb-2">
            <FlaskConical className="h-4 w-4" /> Lab Results
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
                      Date:{" "}
                      {result.testDate
                        ? new Date(result.testDate).toLocaleDateString("vi-VN")
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
    </div>
  );
};

export default MedicalRecordWithLabResults;
