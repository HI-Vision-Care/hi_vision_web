// ---- ADD ----
import axiosInstance from "@/config/axios";
import type { CreateOrderBody, OrderResponse } from "./types";

export async function createOrder(
  patientID: string,
  body: CreateOrderBody
): Promise<OrderResponse> {
  const { data } = await axiosInstance.post<OrderResponse>(
    `/order/${patientID}`,
    body
  );
  return data;
}
