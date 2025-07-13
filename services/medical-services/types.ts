export interface MedicalService {
  serviceID: number;
  name: string;
  description: string;
  price: number;
  img: string;
  type: string;
  specialty: string;
  isActive: boolean;
  isRequireDoctor: boolean;
  isOnline: boolean;
  createAt: string; // ISO date string
}
