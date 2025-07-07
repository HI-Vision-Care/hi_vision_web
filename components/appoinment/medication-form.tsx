"use client";

import { useState } from "react";
import { ArrowLeft, Save, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllArvs } from "@/services/arv/hooks";
import { useCreatePrescription } from "@/services/prescription/hooks";

interface MedicationFormProps {
  onBack: () => void;
  initialPatientId: string;
  prescribedBy?: string;
}

// function ArvInfoDisplay({ arv }) {
//   if (!arv) return null;
//   return (
//     <div className="mt-2 mb-2 p-3 rounded bg-muted text-sm shadow">
//       <div>
//         <b>Tên thuốc:</b> {arv.genericName} ({arv.arvId})
//       </div>
//       <div>
//         <b>Phân nhóm:</b> {arv.drugClass} – {arv.regimenLevel}
//       </div>
//       <div>
//         <b>Liều dùng khuyến nghị:</b> {arv.rcmDosage}
//       </div>
//       <div>
//         <b>Đường dùng:</b> {arv.admRoute}
//       </div>
//       <div>
//         <b>Chỉ định:</b> {arv.indication?.join("; ")}
//       </div>
//       <div>
//         <b>Chống chỉ định:</b> {arv.contraindication?.join("; ")}
//       </div>
//       <div>
//         <b>Tác dụng phụ:</b> {arv.sideEffect?.join("; ")}
//       </div>
//       <div>
//         <b>Nguồn tài trợ:</b> {arv.fundingSource}
//       </div>
//       <div>
//         <b>Hạn dùng:</b> {arv.shelfLife}
//       </div>
//     </div>
//   );
// }

export default function MedicationForm({
  onBack,
  initialPatientId,
  prescribedBy,
}: MedicationFormProps) {
  // Lấy danh sách ARV thật từ API
  const { data: arvs, isLoading: isLoadingArvs } = useGetAllArvs();
  // State cho từng thuốc
  const [arvRows, setArvRows] = useState([
    { arvID: "", dosage: "", duration: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);

  // Hook tạo đơn thuốc
  const { mutate: createPrescription, isLoading } = useCreatePrescription();

  // Giao diện không cho sửa patientId (ẩn hoặc disable)
  // Tên bác sĩ kê đơn: lấy từ prop hoặc context login (demo gán cứng)
  const doctorName = prescribedBy || "Dr. John Doe";

  // Handler
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

  // Submit đơn thuốc

  const handleSubmit = () => {
    if (!initialPatientId) return alert("Thiếu thông tin bệnh nhân!");
    if (arvRows.some((row) => !row.arvID || !row.dosage || !row.duration)) {
      return alert("Vui lòng nhập đầy đủ thông tin các thuốc!");
    }
    setSubmitting(true);
    createPrescription({
      patientId: initialPatientId,
      payload: {
        prescriptionRequest: { prescribeBy: doctorName },
        arvRequests: arvRows.map((row) => ({
          arvID: row.arvID,
          dosage: row.dosage,
          duration: row.duration,
        })),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Kê đơn ARV</h1>
          <p className="text-muted-foreground">
            Tạo đơn thuốc HIV, thêm nhiều loại thuốc, nhập liều và thời gian
            điều trị
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-primary"
          disabled={submitting || isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          Lưu đơn thuốc
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin bệnh nhân & bác sĩ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mã bệnh nhân</Label>
              <Input value={initialPatientId} disabled />
            </div>
            <div>
              <Label>Bác sĩ kê đơn</Label>
              <Input value={doctorName} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách thuốc ARV</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {arvRows.map((row, idx) => (
              <div className="grid grid-cols-4 gap-4 items-end" key={idx}>
                <div>
                  <Label>Thuốc ARV</Label>
                  <Select
                    value={row.arvID}
                    onValueChange={(val) => handleArvChange(idx, "arvID", val)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingArvs ? "Đang tải..." : "Chọn thuốc ARV"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {arvs?.map((arv) => (
                        <SelectItem key={arv.arvId} value={arv.arvId}>
                          {arv.arvId} - {arv.genericName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Liều dùng</Label>
                  <Input
                    placeholder="VD: 1 viên/ngày"
                    value={row.dosage}
                    onChange={(e) =>
                      handleArvChange(idx, "dosage", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Thời gian (ngày)</Label>
                  <Input
                    placeholder="VD: 30"
                    type="number"
                    value={row.duration}
                    onChange={(e) =>
                      handleArvChange(idx, "duration", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRow(idx)}
                    disabled={arvRows.length === 1}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                  {idx === arvRows.length - 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAddRow}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
