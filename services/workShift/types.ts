export interface DoctorAccount {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  isDeleted: boolean;
}

export interface Doctor {
  doctorID: string;
  account: DoctorAccount;
  name: string;
  gender: string;
  specialty: string;
  degrees: string;
}

export interface WorkShift {
  id: number;
  doctor: Doctor; // ✅ thêm dòng này
  slot: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  note: string | null;
}
