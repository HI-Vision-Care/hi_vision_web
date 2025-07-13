"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Eye, Share2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  // Calculate reading time based on content
  const calculateReadingTime = () => {
    const wordsPerMinute = 200
    const totalWords = contents.reduce((total, content) => {
      const headerWords = content.header ? content.header.split(/\s+/).length : 0
      const bodyWords = content.body ? content.body.split(/\s+/).length : 0
      return total + headerWords + bodyWords
    }, 0)
    const titleWords = post.title ? post.title.split(/\s+/).length : 0
    const allWords = totalWords + titleWords
    const minutes = Math.ceil(allWords / wordsPerMinute)
    return minutes
  }

  const readingTime = calculateReadingTime()
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title || "Blog Post",
        text: `Check out this blog post: ${post.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <article className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Banner Image */}
        {post.banner && (
          <div className="relative aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <img
              src={post.banner || "/placeholder.svg?height=400&width=800"}
              alt={`Cover image for: ${post.title || "Blog Post"}`}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=800"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Article Header */}
        <div className="p-8 border-b border-gray-100">
          {/* Topic Badge */}
          <div className="flex items-center gap-3 mb-4">
            {post.topic && (
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800">
                <BookOpen className="w-3 h-3 mr-1" />
                {post.topic}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title || "Blog Post Title"}</h1>

          {/* Article Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Admin Author</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Preview Mode</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2 bg-transparent"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-8">
          {contents.length > 0 ? (
            <div className="space-y-10">
              {contents.map((content, idx) => (
                <section key={idx} className="space-y-6">
                  {/* Section Header */}
                  {content.header && (
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold text-gray-900 leading-tight">{content.header}</h2>
                      <div className="w-12 h-1 bg-blue-500 rounded-full" />
                    </div>
                  )}

                  {/* Section Content */}
                  {content.body && (
                    <div className="prose prose-lg prose-gray max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                        {content.body.split("\n").map(
                          (paragraph, pIdx) =>
                            paragraph.trim() && (
                              <p key={pIdx} className="mb-4 last:mb-0">
                                {paragraph}
                              </p>
                            ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Section Image */}
                  {content.photo && (
                    <div className="my-8">
                      <Card className="overflow-hidden border-0 shadow-md">
                        <CardContent className="p-0">
                          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                              src={content.photo || "/placeholder.svg?height=400&width=700"}
                              alt={`Section illustration ${idx + 1}${content.header ? `: ${content.header}` : ""}`}
                              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                              onError={(e) => {
                                ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=700"
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      {content.header && (
                        <p className="text-sm text-gray-500 text-center mt-3 italic">
                          Figure {idx + 1}: {content.header}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Section Separator */}
                  {idx < contents.length - 1 && (
                    <div className="pt-6">
                      <Separator className="bg-gray-200" />
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Added Yet</h3>
              <p className="text-gray-500">Start adding content blocks to see your blog post preview here.</p>
            </div>
          )}
        </div>

        {/* Article Footer */}
        <div className="border-t border-gray-100 bg-gray-50 p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Admin Author</h4>
                <p className="text-sm text-gray-600">Content Creator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2 bg-transparent"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Reading Progress Indicator */}
      <div className="mt-6 bg-white rounded-lg border border-gray-100 p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Estimated reading time: {readingTime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{contents.length} content sections</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostPreview
