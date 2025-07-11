import { useQuery } from "@tanstack/react-query";
import { ArvRegimenResponse, Regimen } from "./types";
import { getAllRegimens, getAllRegimensArv } from "./api";

export const useGetAllRegimens = () =>
  useQuery<Regimen[], Error>({
    queryKey: ["regimens"],
    queryFn: getAllRegimens,
  });

export function useGetAllRegimensArv() {
  return useQuery<ArvRegimenResponse>({
    queryKey: ["regimens-arv"],
    queryFn: getAllRegimensArv,
  });
}
