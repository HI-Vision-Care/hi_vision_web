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
