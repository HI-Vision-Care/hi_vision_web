import { CreateProductBody, CreateProductResponse, Product } from "./types";
import { createProduct, getProducts } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProducts = (enabled = true) =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled,
  });

export const useCreateProduct = () =>
  useMutation<CreateProductResponse, Error, CreateProductBody>({
    mutationFn: (body) => createProduct(body),
  });
