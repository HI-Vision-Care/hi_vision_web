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
  id?: number;
  doctor?: Doctor; 
  slot?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  note?: string | null;
  doctorId?: string;
  doctorName?: string;
  shiftType?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Payload cho API đăng ký work shift
export interface WorkShiftRegistrationPayload {
  slot: string;
  date: string; // ISO string, vd: "2025-07-07T02:26:08.628Z"
  startTime: string; // ISO string
  endTime: string; // ISO string
}

export type WorkShiftRegistrationList = WorkShiftRegistrationPayload[];
