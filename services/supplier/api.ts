import axiosInstance from "@/config/axios";
import { Supplier } from "./types";

// GET /supplier
export async function getSuppliers(): Promise<Supplier[]> {
  const { data } = await axiosInstance.get<Supplier[]>("/supplier");
  return data;
}
