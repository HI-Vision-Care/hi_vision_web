export interface DoctorResponse {
  doctorID: string;
  name: string;
  gender: string;
  specialty: string;
  degrees: string;
  avatar: string;
  email: string;
  phone: string;
  status: "active" | "on_leave" | "inactive";
}
// types.ts
export interface DoctorUpdateRequest {
  fullName: string;
  gender: string;
  specialty: string;
  degrees: string;
  // Thêm các trường khác nếu cần
}
