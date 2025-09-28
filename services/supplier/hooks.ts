import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "./api";
import type { Supplier } from "./types";

export const useSuppliers = (enabled = true) =>
  useQuery<Supplier[], Error>({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
    enabled,
  });
