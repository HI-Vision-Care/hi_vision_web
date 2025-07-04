import axiosInstance from "@/config/axios";
import type { ARVResponse } from "./types";

export async function getAllArvs(): Promise<ARVResponse[]> {
  const response = await axiosInstance.get<ARVResponse[]>("/arv");
  return response.data;
}
