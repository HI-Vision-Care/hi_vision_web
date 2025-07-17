import axiosInstance from "@/config/axios";
import type {
  BlogPostBasic,
  BlogPostDetail,
  BlogPostRequest,
  ContentRequest,
} from "@/services/Post/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 1. Lấy danh sách bài viết
export const useGetBlogPosts = () => {
  return useQuery<BlogPostBasic[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blog-post");
      return res.data;
    },
  });
};

// 2. Lấy chi tiết 1 bài viết
export const useGetBlogPostDetail = (blogID: number | string) => {
  return useQuery<BlogPostDetail>({
    queryKey: ["blog-post-detail", blogID],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blog-post/content/${blogID}`);
      return res.data;
    },
    enabled: !!blogID,
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      accountID,
      blogID,
      blogPostRequest,
      contentRequests,
    }: {
      accountID: string;
      blogID: number;
      blogPostRequest: BlogPostRequest;
      contentRequests: ContentRequest[];
    }) => {
      await axiosInstance.put(`/blog-post/update/${blogID}/${accountID}`, {
        blogPostRequest,
        contentRequests,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      accountID,
      blogPostRequest,
      contentRequests,
    }: {
      accountID: string;
      blogPostRequest: BlogPostRequest;
      contentRequests: ContentRequest[];
    }) => {
      const res = await axiosInstance.post(`/blog-post/create/${accountID}`, {
        blogPostRequest,
        contentRequests,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

export function useHideBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogID: number) => {
      await axiosInstance.patch(`/blog-post/hide/${blogID}`);
      return blogID;
    },
    onSuccess: (blogID) => {
      // Sau khi ẩn, cập nhật lại cache (nếu cần)
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPost", blogID] });
    },
  });
}

// PATCH /blog-post/show/{blogID}
export function useShowBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogID: number) => {
      await axiosInstance.patch(`/blog-post/show/${blogID}`);
      return blogID;
    },
    onSuccess: (blogID) => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPost", blogID] });
    },
  });
}


export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blogID: number) => {
      const response = await axiosInstance.delete(`/blog-post/${blogID}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] })
    },
  })
}