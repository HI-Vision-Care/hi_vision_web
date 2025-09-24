import axiosInstance from "@/config/axios";
import { Category } from "./types";

// GET /category
export async function getCategories(): Promise<Category[]> {
  const { data } = await axiosInstance.get<Category[]>("/category");
  return data;
}
