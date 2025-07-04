import { useQuery } from "@tanstack/react-query";
import { getAllArvs } from "./api";

export const useGetAllArvs = (enabled = true) =>
  useQuery({
    queryKey: ["arvs", "all"],
    queryFn: getAllArvs,
    enabled,
  });
