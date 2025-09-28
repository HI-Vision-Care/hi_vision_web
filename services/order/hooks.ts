// ---- ADD ----
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "./api";
import type { CreateOrderBody, OrderResponse } from "./types";

export const useCreateOrder = () =>
  useMutation<
    OrderResponse,
    Error,
    { patientID: string; body: CreateOrderBody }
  >({
    mutationFn: ({ patientID, body }) => createOrder(patientID, body),
  });
