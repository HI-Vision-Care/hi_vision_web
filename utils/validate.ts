import { LabResult } from "@/types";

export function isValidDiagnosis(text: string) {
  return text && text.trim().length >= 4 && text.length <= 500;
}
export function isValidNote(text: string) {
  return !text || text.length <= 1000;
}

export function validateMedicalRecord(data) {
  if (!data.diagnosis || data.diagnosis.trim().length < 4) {
    return "Diagnosis is required (at least 4 characters).";
  }
  if (data.diagnosis.length > 500) {
    return "Diagnosis must be under 500 characters.";
  }
  if (data.note && data.note.length > 1000) {
    return "Notes must be under 1000 characters.";
  }
  return null; // valid!
}

export function validateLabResult(lab: Partial<LabResult>) {
  if (!lab.testType) return "Test type is required.";
  if (!lab.resultValue) return "Result value is required.";
  // Chỉ cho phép số? Nếu có:
  if (!/^\d+(\.\d+)?$/.test(lab.resultValue.trim())) {
    return "Result value must be a number.";
  }
  if (!lab.unit || (lab.unit === "Other" && !lab.unitOther)) {
    return "Unit is required.";
  }
  if (lab.referenceRange && lab.referenceRange.length > 100) {
    return "Reference range is too long.";
  }
  if (lab.resultText && lab.resultText.length > 300) {
    return "Additional notes must be under 300 characters.";
  }
  if (lab.testDate) {
    const d = new Date(lab.testDate);
    const now = new Date();
    if (d > now) return "Test date cannot be in the future.";
    if (d < new Date(now.getFullYear() - 30, now.getMonth(), now.getDate()))
      return "Test date is too far in the past.";
  }
  return null; // hợp lệ
}
