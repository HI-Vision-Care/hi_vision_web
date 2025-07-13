import type React from "react"
import { Badge } from "@/components/ui/badge"

// Update the interface to match your existing types
interface ContentRequest {
  header: string
  body: string
  photo: string
}

interface BlogPostPreviewProps {
  post: {
    title: string
    banner: string
    topic: string
  }
  contents: ContentRequest[]
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ post, contents }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Banner */}
        {post.banner && (
          <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
            <img
              src={post.banner || "/placeholder.svg"}
              alt="Banner"
              className="object-cover w-full h-auto"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg"
              }}
            />
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-3">
            {post.topic && <Badge variant="secondary">{post.topic}</Badge>}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title || "Tiêu đề bài viết"}</h1>
          <div className="text-sm text-gray-500">{new Date().toLocaleDateString("vi-VN")}</div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {contents.map((content, idx) => (
            <div key={idx} className="space-y-4">
              {content.header && <h2 className="text-xl font-semibold text-gray-800">{content.header}</h2>}
              {content.body && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content.body}</p>
                </div>
              )}
              {content.photo && (
                <div className="my-6 relative aspect-video">
                  <img
                    src={content.photo || "/placeholder.svg"}
                    alt={`Illustration ${idx + 1}`}
                    className="object-cover rounded-lg shadow-sm w-full h-auto"
                    style={{ aspectRatio: "16/9" }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

export default BlogPostPreview
