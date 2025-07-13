"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"

import { Eye, Edit3, Plus, X, ImageIcon, FileText, Tag, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Import types từ project của bạn
import type { BlogPostRequest, ContentRequest } from "@/services/Post/types"
import { useCreateBlogPost } from "@/services/Post/hooks"
import { useAccountId } from "@/hooks/useAccountId"

const defaultContent: ContentRequest = {
    header: "",
    body: "",
    photo: "",
}

export default function NewPostPage() {
    const [post, setPost] = useState<BlogPostRequest>({
        title: "",
        banner: "",
        topic: "",
    })
    const [contents, setContents] = useState<ContentRequest[]>([{ ...defaultContent }])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

    const staffAccountId = useAccountId()
    const { mutate: createBlogPost } = useCreateBlogPost()

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMsg("")
        setLoading(true)
        try {
            if (!staffAccountId) return setMsg("Bạn chưa nhập AccountID")
            await createBlogPost(staffAccountId, {
                blogPostRequest: post,
                contentRequests: contents,
            })
            setMsg("Đăng bài thành công!")
            setPost({ title: "", banner: "", topic: "" })
            setContents([{ ...defaultContent }])
            setActiveTab("edit")
        } catch (error) {
            console.error("Error creating blog post:", error)
            setMsg("Đăng bài thất bại!")
        } finally {
            setLoading(false)
        }
    }

    const PreviewComponent = () => (
        <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {/* Banner */}
                {post.banner && (
                    <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
                        <Image
                            src={post.banner || "/placeholder.svg"}
                            alt="Banner"
                            fill
                            className="object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=400&width=800"
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
                                    <Image
                                        src={content.photo || "/placeholder.svg"}
                                        alt={`Illustration ${idx + 1}`}
                                        fill
                                        className="object-cover rounded-lg shadow-sm"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.src = "/placeholder.svg?height=300&width=600"
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

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo bài viết mới</h1>
                    <p className="text-gray-600">Tạo và xem trước bài viết của bạn trước khi đăng</p>
                </div>

                {/* Custom Tab Implementation */}
                <div className="space-y-6">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                        <button
                            onClick={() => setActiveTab("edit")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "edit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            <Edit3 className="w-4 h-4" />
                            Chỉnh sửa
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "preview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            <Eye className="w-4 h-4" />
                            Xem trước
                        </button>
                    </div>

                    {activeTab === "edit" && (
                        <div className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            Thông tin cơ bản
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="flex items-center gap-2">
                                                <Type className="w-4 h-4" />
                                                Tiêu đề bài viết
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={post.title}
                                                onChange={handlePostChange}
                                                placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn"
                                                required
                                                className="text-lg"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="banner" className="flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4" />
                                                Ảnh bìa (URL)
                                            </Label>
                                            <Input
                                                id="banner"
                                                name="banner"
                                                value={post.banner}
                                                onChange={handlePostChange}
                                                placeholder="https://example.com/image.jpg"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="topic" className="flex items-center gap-2">
                                                <Tag className="w-4 h-4" />
                                                Chủ đề
                                            </Label>
                                            <Input
                                                id="topic"
                                                name="topic"
                                                value={post.topic}
                                                onChange={handlePostChange}
                                                placeholder="Ví dụ: Công nghệ, Du lịch, Ẩm thực..."
                                                required
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Content Blocks */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Nội dung bài viết</CardTitle>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addContent}
                                                className="flex items-center gap-2 bg-transparent"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Thêm khối nội dung
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {contents.map((content, idx) => (
                                            <Card key={idx} className="relative">
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-medium text-gray-700">Khối nội dung {idx + 1}</h4>
                                                        {contents.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeContent(idx)}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-3 pt-0">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`header-${idx}`}>Tiêu đề phụ</Label>
                                                        <Input
                                                            id={`header-${idx}`}
                                                            value={content.header}
                                                            onChange={(e) => handleContentChange(idx, "header", e.target.value)}
                                                            placeholder="Tiêu đề cho phần này (tùy chọn)"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`body-${idx}`}>Nội dung</Label>
                                                        <Textarea
                                                            id={`body-${idx}`}
                                                            value={content.body}
                                                            onChange={(e) => handleContentChange(idx, "body", e.target.value)}
                                                            placeholder="Viết nội dung cho phần này..."
                                                            className="min-h-[120px] resize-y"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`photo-${idx}`}>Ảnh minh họa (URL)</Label>
                                                        <Input
                                                            id={`photo-${idx}`}
                                                            value={content.photo}
                                                            onChange={(e) => handleContentChange(idx, "photo", e.target.value)}
                                                            placeholder="https://example.com/image.jpg (tùy chọn)"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Submit Section */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setActiveTab("preview")}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Xem trước
                                                </Button>
                                            </div>
                                            <Button type="submit" disabled={loading} className="flex items-center gap-2 min-w-[120px]">
                                                {loading ? "Đang đăng..." : "Đăng bài"}
                                            </Button>
                                        </div>
                                        {msg && (
                                            <div
                                                className={`mt-4 p-3 rounded-md text-sm font-medium ${msg.includes("thành công")
                                                        ? "bg-green-50 text-green-800 border border-green-200"
                                                        : "bg-red-50 text-red-800 border border-red-200"
                                                    }`}
                                            >
                                                {msg}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </form>
                        </div>
                    )}

                    {activeTab === "preview" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Xem trước bài viết</h2>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" onClick={() => setActiveTab("edit")} className="flex items-center gap-2">
                                        <Edit3 className="w-4 h-4" />
                                        Chỉnh sửa
                                    </Button>
                                    <Button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2">
                                        {loading ? "Đang đăng..." : "Đăng bài"}
                                    </Button>
                                </div>
                            </div>
                            <PreviewComponent />
                            {msg && (
                                <div
                                    className={`p-3 rounded-md text-sm font-medium ${msg.includes("thành công")
                                            ? "bg-green-50 text-green-800 border border-green-200"
                                            : "bg-red-50 text-red-800 border border-red-200"
                                        }`}
                                >
                                    {msg}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
