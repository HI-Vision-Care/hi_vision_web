"use client"

import type React from "react"
import { useState } from "react"
import {
    useGetBlogPosts,
    useGetBlogPostDetail,
    useHideBlogPost,
    useShowBlogPost,
    useDeleteBlogPost,
} from "@/services/Post/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Edit3, Calendar, User, Eye, Clock, BookOpen, AlertCircle, Loader2, FileText, EyeOff, X, Heart, Trash, Trash2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface RecentPostListProps {
    onEdit: (postId: number) => void
}

const RecentPostList: React.FC<RecentPostListProps> = ({ onEdit }) => {
    const queryClient = useQueryClient()
    const { data: posts, isLoading, isError } = useGetBlogPosts()
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
    const { data: detail, isLoading: detailLoading } = useGetBlogPostDetail(selectedPostId ?? "")
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }
    const { mutateAsync: hidePost } = useHideBlogPost()
    const { mutateAsync: showPost } = useShowBlogPost()
    const { mutate: deleteBlogPost } = useDeleteBlogPost()

    const handleDelete = (id: number) => {
        if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
            deleteBlogPost(id)
        }
    }
    const calculateReadingTime = (contents: any[]) => {
        const wordsPerMinute = 200
        const totalWords = contents.reduce((total, content) => {
            const headerWords = content.header ? content.header.split(/\s+/).length : 0
            const bodyWords = content.body ? content.body.split(/\s+/).length : 0
            return total + headerWords + bodyWords
        }, 0)
        return Math.ceil(totalWords / wordsPerMinute)
    }

    // Loading State
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Blog Posts</h3>
                        <p className="text-gray-500">Please wait while we fetch your recent posts...</p>
                    </div>
                </div>
            </div>
        )
    }

    // Error State
    if (isError) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Posts</h3>
                        <p className="text-gray-500 mb-4">There was an error loading your blog posts. Please try again.</p>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // Empty State
    if (!posts || posts.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Blog Posts Yet</h3>
                        <p className="text-gray-500 mb-4">
                            You haven&apos;t created any blog posts yet. Start writing your first post!
                        </p>
                        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Create Your First Post
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Posts Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h3>
                        <p className="text-sm text-gray-600">Manage and edit your published content</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                        {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                    </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => {
                        const isHide = !!post.hide
                        return (
                            <Card
                                key={post.id}
                                className={`group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 bg-white overflow-hidden p-0 relative ${post.hide ? "opacity-50 grayscale hover:opacity-80 hover:grayscale-0" : ""
                                    }`}
                                onClick={() => setSelectedPostId(post.id)}
                            >
                                {/* Redesigned Delete Button - Top Left Corner */}
                                <div className="absolute top-3 left-3 z-20">
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg border-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(post.id)
                                        }}
                                        title="Delete post"
                                    >
                                        <Trash className="w-3 h-3" />
                                    </Button>
                                </div>

                                {/* Post Image */}
                                <div className="relative aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                    <img
                                        src={post.banner || "/placeholder.svg?height=200&width=350"}
                                        alt={`Cover image for ${post.title}`}
                                        className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-105 m-0
    ${isHide ? "opacity-50 grayscale" : "opacity-100 grayscale-0"}
  `}
                                        onError={(e) => {
                                            ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=350"
                                        }}
                                    />
                                

                                    {/* Edit Button Overlay */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onEdit(post.id)
                                            }}
                                        >
                                            <Edit3 className="w-3 h-3 mr-1" />
                                            Edit
                                        </Button>
                                    </div>
                                </div>

                                <CardHeader className="pb-3 min-h-[100px]">
                                    {/* Topic and Date */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <Badge
                                            variant="secondary"
                                            className={`text-xs ${isHide ? "bg-gray-200 text-gray-600" : "bg-blue-100 text-blue-800"}`}
                                        >
                                            <BookOpen className="w-3 h-3 mr-1" />
                                            {post.topic}
                                        </Badge>
                                        <div className={`flex items-center gap-1 text-xs ${isHide ? "text-gray-400" : "text-gray-500"}`}>
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(post.createAt)}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <CardTitle
                                        className={`text-lg font-semibold leading-tight line-clamp-2 transition-colors ${isHide ? "text-gray-500 group-hover:text-gray-600" : "group-hover:text-blue-600"
                                            }`}
                                    >
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="pt-0 mb-[10px]">
                                    {/* Author */}
                                    <div className={`flex items-center gap-2 text-sm mb-3 ${isHide ? "text-gray-400" : "text-gray-600"}`}>
                                        <User className="w-4 h-4" />
                                        <span>By {post.author}</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`flex items-center gap-1 px-2 py-2 rounded cursor-default select-none 
                                                ${isHide
                                                    ? "text-gray-400"
                                                    : "text-red-600 "
                                                }`}
                                        >
                                            <Heart className="w-4 h-4" fill={isHide ? "#d1d5db" : "#f43f5e"} strokeWidth={1.5} />
                                            <span className="font-semibold">{post.total}</span>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`bg-transparent ${isHide
                                                ? "border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                : "border-blue-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                }`}
                                            onClick={async (e) => {
                                                e.stopPropagation()
                                                // Gọi API hide/show tùy trạng thái
                                                if (isHide) {
                                                    // Gọi API hiện lại
                                                    await showPost(post.id)
                                                } else {
                                                    // Gọi API ẩn bài viết
                                                    await hidePost(post.id)
                                                }
                                                queryClient.invalidateQueries({ queryKey: ["blog-posts"] })
                                            }}
                                        >
                                            <EyeOff className="w-4 h-4 mr-1" />
                                            {isHide ? "Show Post" : "Hide Post"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Detail Modal */}
            <Dialog open={!!selectedPostId} onOpenChange={() => setSelectedPostId(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold pr-8">
                                {detailLoading ? "Loading..." : detail?.title || "Blog Post Details"}
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="overflow-y-auto pr-2" style={{ maxHeight: "calc(90vh - 120px)" }}>
                        {detailLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                                    <p className="text-gray-600">Loading post details...</p>
                                </div>
                            </div>
                        ) : detail ? (
                            <div className="space-y-6">
                                {/* Cover Image */}
                                {detail.banner && (
                                    <div className="relative aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg">
                                        <img
                                            src={detail.banner || "/placeholder.svg?height=300&width=600"}
                                            alt={`Cover image for ${detail.title}`}
                                            className="object-cover w-full h-full"
                                            onError={(e) => {
                                                ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=600"
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Post Meta */}
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                                {detail.topic}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(detail.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>By {detail.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{calculateReadingTime(detail.contents)} min read</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => {
                                                onEdit(detail.id)
                                                setSelectedPostId(null)
                                            }}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit This Post
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedPostId(null)}>
                                            Close
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Content Sections */}
                                <div className="space-y-8">
                                    <h4 className="text-lg font-semibold text-gray-900">Content Preview</h4>
                                    {detail.contents.map((item, idx) => (
                                        <div key={idx} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                            {item.header && <h5 className="text-lg font-semibold text-gray-800">{item.header}</h5>}
                                            {item.body && (
                                                <div className="text-gray-700 whitespace-pre-line leading-relaxed">{item.body}</div>
                                            )}
                                            {item.photo && (
                                                <div className="relative aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-md mt-4">
                                                    <img
                                                        src={item.photo || "/placeholder.svg?height=200&width=400"}
                                                        alt={`Section ${idx + 1} illustration`}
                                                        className="object-cover w-full h-full"
                                                        onError={(e) => {
                                                            ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Post not found or failed to load.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RecentPostList
