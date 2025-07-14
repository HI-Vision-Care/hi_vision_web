export interface BlogPostRequest {
  title: string;
  banner: string;
  topic: string;
}

export interface ContentRequest {
  header: string;
  body: string;
  photo: string;
}

export interface CreateBlogPostPayload {
  blogPostRequest: BlogPostRequest;
  contentRequests: ContentRequest[];
}

// types.ts

export interface BlogPostBasic {
  id: number;
  author: string;
  title: string;
  topic: string;
  banner: string;
  createAt: string;
}

export interface ContentRequest {
  header: string;
  body: string;
  photo: string;
}

export interface BlogPostDetail {
  id: number;
  author: string;
  title: string;
  banner: string;
  topic: string;
  createdAt: string;
  contents: ContentRequest[];
}

// Yêu cầu cập nhật bài viết
export interface BlogPostRequest {
  title: string;
  banner: string;
  topic: string;
}

