import { useQuery } from "@tanstack/react-query";
import { getAllMedicalServices } from "./api";
import { MedicalService } from "./types";

export const useGetAllMedicalServices = (enabled = true) =>
  useQuery<MedicalService[], Error>({
    queryKey: ["medical-services", "all"],
    queryFn: getAllMedicalServices,
    enabled,
    select: (data: MedicalService[]) => {
      // Sắp xếp mới nhất lên trước (nếu cần)
      return [...data].sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );
    },
  });
