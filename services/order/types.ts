import { Product } from "../product/types";

// body khi tạo đơn hàng
export interface CreateOrderBody {
  productId: number; // theo swagger: "productId"
  quantity: number;
}

// các kiểu lót trong response
export interface Authority {
  authority: string;
}

export interface Account {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: "GUEST" | string;
  isDeleted: boolean;
  authorities: Authority[];
}

export interface Disease {
  diseaseID: number;
  name: string;
}

export interface PatientDisease {
  patientDiseaseID: number;
  patient: string;
  disease: Disease;
}

export interface Patient {
  patientID: string;
  account: Account;
  name: string;
  dob: string;
  gender: string;
  medNo: string;
  medDate: string;
  medFac: string;
  patientDiseases: PatientDisease[];
}

// response khi tạo thành công
export interface OrderResponse {
  id: number;
  patient: Patient;
  product: Product; // dùng Product bạn đã khai báo ở phần trước
  quantity: number;
  amount: number;
}
