import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./api";
import type { Category } from "./types";

export const useCategories = (enabled = true) =>
  useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled,
  });
