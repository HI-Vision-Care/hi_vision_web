"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { Eye, Edit3, Plus, FileText, Clock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Import your BlogPostPreview component
import type { BlogPostRequest, ContentRequest } from "@/services/Post/types"
import { useCreateBlogPost, useGetBlogPostDetail, useUpdateBlogPost } from "@/services/Post/hooks"
import { useAccountId } from "@/hooks/useAccountId"
import BlogPostPreview from "@/components/post/preview"
import PostEditForm from "@/components/post/PostEditForm"
import RecentPostList from "@/components/post/RecentPostList"
import { toast } from "sonner"

const defaultContent: ContentRequest = {
    header: "",
    body: "",
    photo: "",
}

export default function BlogPostManagementPage() {
    const [post, setPost] = useState<BlogPostRequest>({
        title: "",
        banner: "",
        topic: "",
    })
    const [contents, setContents] = useState<ContentRequest[]>([{ ...defaultContent }])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [activeTab, setActiveTab] = useState<"edit" | "preview" | "recent">("recent")
    const staffAccountId = useAccountId()
    const { mutate: createBlogPost } = useCreateBlogPost()
    const [editingPostId, setEditingPostId] = useState<number | null>(null)
    const { data: editingDetail } = useGetBlogPostDetail(editingPostId ?? "")
    const { mutate: updateBlogPost } = useUpdateBlogPost()

    const handleEditPost = (postId: number) => {
        setEditingPostId(postId)
        setActiveTab("edit")
    }

    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleContentChange = (idx: number, field: keyof ContentRequest, value: string) => {
        setContents(contents.map((item, i) => (i === idx ? { ...item, [field]: value } : item)))
    }

    const addContent = () => setContents([...contents, { ...defaultContent }])

    const removeContent = (idx: number) => {
        if (contents.length === 1) return
        setContents(contents.filter((_, i) => i !== idx))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setMsg("")
        setLoading(true)

        if (!staffAccountId) {
            setMsg("Please enter your Account ID")
            setLoading(false)
            return
        }

        if (editingPostId) {
            updateBlogPost(
                {
                    accountID: staffAccountId,
                    blogID: editingPostId,
                    blogPostRequest: post,
                    contentRequests: contents,
                },
                {
                    onSuccess: () => {
                        toast.success("Blog post updated successfully!");
                        setPost({ title: "", banner: "", topic: "" })
                        setContents([{ ...defaultContent }])
                        setActiveTab("recent")
                        setEditingPostId(null)
                        setLoading(false)
                    },
                    onError: () => {
                        toast.error("Failed to update blog post!");
                        setLoading(false)
                    },
                },
            )
        } else {
            createBlogPost(
                {
                    accountID: staffAccountId,
                    blogPostRequest: post,
                    contentRequests: contents,
                },
                {
                    onSuccess: () => {
                        toast.success("Blog post published successfully!");
                        setPost({ title: "", banner: "", topic: "" })
                        setContents([{ ...defaultContent }])
                        setActiveTab("recent")
                        setLoading(false)
                    },
                    onError: () => {
                        toast.error("Failed to publish blog post!");
                        setLoading(false)
                    },
                },
            )
        }
    }

    const resetForm = () => {
        setPost({ title: "", banner: "", topic: "" })
        setContents([{ ...defaultContent }])
        setEditingPostId(null)
        setMsg("")
    }

    useEffect(() => {
        if (editingDetail) {
            setPost({
                title: editingDetail.title,
                banner: editingDetail.banner,
                topic: editingDetail.topic,
            })
            setContents(editingDetail.contents)
        }
    }, [editingDetail])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <BookOpen className="w-8 h-8 text-blue-600" />
                                </div>
                                {editingPostId ? "Edit Blog Post" : "Create New Blog Post"}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {editingPostId
                                    ? "Update your blog post and preview changes before saving"
                                    : "Create and preview your blog post before publishing"}
                            </p>
                        </div>
                        {editingPostId && (
                            <Button variant="outline" onClick={resetForm} className="flex items-center gap-2 bg-transparent">
                                <Plus className="w-4 h-4" />
                                New Post
                            </Button>
                        )}
                    </div>

                    {editingPostId && (
                        <div className="mt-4">
                            <Badge variant="secondary" className="text-sm">
                                <Edit3 className="w-3 h-3 mr-1" />
                                Editing Post ID: {editingPostId}
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Navigation Tabs */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl max-w-fit">
                            <button
                                onClick={() => setActiveTab("recent")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "recent"
                                    ? "bg-white text-blue-600 shadow-md ring-1 ring-blue-100"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                <Clock className="w-4 h-4" />
                                Recent Posts
                            </button>
                            <button
                                onClick={() => setActiveTab("edit")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "edit"
                                    ? "bg-white text-blue-600 shadow-md ring-1 ring-blue-100"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                <Edit3 className="w-4 h-4" />
                                Editor
                            </button>
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "preview"
                                    ? "bg-white text-blue-600 shadow-md ring-1 ring-blue-100"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                <Eye className="w-4 h-4" />
                                Preview
                            </button>

                        </div>
                    </CardContent>
                </Card>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === "edit" && (
                        <PostEditForm
                            post={post}
                            contents={contents}
                            loading={loading}
                            msg={msg}
                            onPostChange={handlePostChange}
                            onContentChange={handleContentChange}
                            addContent={addContent}
                            removeContent={removeContent}
                            onSubmit={handleSubmit}
                            setActiveTab={setActiveTab}
                            isEditing={!!editingPostId}
                        />
                    )}

                    {activeTab === "preview" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Eye className="w-5 h-5 text-blue-600" />
                                            Blog Post Preview
                                        </CardTitle>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => setActiveTab("edit")}
                                                className="flex items-center gap-2"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                                Back to Editor
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        {editingPostId ? "Updating..." : "Publishing..."}
                                                    </>
                                                ) : (
                                                    <>
                                                        <FileText className="w-4 h-4" />
                                                        {editingPostId ? "Update Post" : "Publish Post"}
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className="p-0">
                                    <BlogPostPreview post={post} contents={contents} />
                                </CardContent>
                            </Card>

                            {msg && (
                                <Card
                                    className={`border-l-4 ${msg.includes("successfully") || msg.includes("success")
                                        ? "border-l-green-500 bg-green-50"
                                        : "border-l-red-500 bg-red-50"
                                        }`}
                                >
                                    <CardContent className="p-4">
                                        <div
                                            className={`flex items-center gap-2 text-sm font-medium ${msg.includes("successfully") || msg.includes("success") ? "text-green-800" : "text-red-800"
                                                }`}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${msg.includes("successfully") || msg.includes("success") ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            />
                                            {msg}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {activeTab === "recent" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    Recent Blog Posts
                                </CardTitle>
                                <p className="text-gray-600">View and edit your recently published blog posts</p>
                            </CardHeader>
                            <Separator />
                            <CardContent className="p-6">
                                <RecentPostList onEdit={handleEditPost} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
