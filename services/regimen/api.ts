import axiosInstance from "@/config/axios";
import { ArvRegimenResponse, Regimen } from "./types";

export const getAllRegimens = async (): Promise<Regimen[]> => {
  const res = await axiosInstance.get("/regimen/get-all-regimens");
  return res.data;
};

export async function getAllRegimensArv(): Promise<ArvRegimenResponse> {
  const response = await axiosInstance.get("/regimen/get-all-regimens-arv");
  return response.data;
}
