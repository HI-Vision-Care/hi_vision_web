// --- ADD BELOW (giữ nguyên import axiosInstance như file của bạn) ---
import axiosInstance from "@/config/axios";
import { CreateProductBody, CreateProductResponse, Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get<Product[]>("/product");
  return data;
}

export async function createProduct(
  body: CreateProductBody
): Promise<CreateProductResponse> {
  const { data } = await axiosInstance.post<CreateProductResponse>(
    "/product/create",
    body
  );
  return data;
}
