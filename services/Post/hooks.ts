import { useState } from "react";
import axiosInstance from "@/config/axios";
import type { CreateBlogPostPayload } from "@/services/Post/types";

export function useCreateBlogPost() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  async function mutate(accountID: string, payload: CreateBlogPostPayload) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await axiosInstance.post<any>(
        `/blog-post/create/${accountID}`,
        payload
      );
      setData(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { mutate, loading, error, data };
}
