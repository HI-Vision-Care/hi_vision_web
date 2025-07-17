"use client"

import type React from "react"
import { Eye, Plus, X, FileText, ImageIcon, Tag, Type, Save, Edit, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { BlogPostRequest, ContentRequest } from "@/services/Post/types"

interface PostEditFormProps {
    post: BlogPostRequest
    contents: ContentRequest[]
    loading: boolean
    msg: string
    onPostChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onContentChange: (idx: number, field: keyof ContentRequest, value: string) => void
    addContent: () => void
    removeContent: (idx: number) => void
    onSubmit: (e: React.FormEvent) => void
    setActiveTab: (tab: "edit" | "preview") => void
    isEditing?: boolean
}

const PostEditForm: React.FC<PostEditFormProps> = ({
    post,
    contents,
    loading,
    msg,
    onPostChange,
    onContentChange,
    addContent,
    removeContent,
    onSubmit,
    setActiveTab,
    isEditing,
}) => {
    const getTitleCharacterCount = () => post.title.length
    const getHeaderCharacterCount = (content: ContentRequest) => content.header.length
    const getBodyWordCount = (content: ContentRequest) =>
        content.body
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length

    return (
        <div className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
                        <CardTitle className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{isEditing ? "Edit Blog Post" : "Create Blog Post"}</h3>
                                <p className="text-sm text-gray-600 font-normal">
                                    {isEditing ? "Update your blog post details" : "Enter the main details for your blog post"}
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {/* Title Field */}
                        <div className="space-y-3">
                            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                                <Type className="w-4 h-4 text-blue-600" />
                                Blog Post Title
                                <Badge variant="destructive" className="text-xs">
                                    Required
                                </Badge>
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={post.title}
                                onChange={onPostChange}
                                placeholder="Enter an engaging title for your blog post"
                                required
                                className="text-lg h-12 border-2 focus:border-blue-500 transition-colors"
                                maxLength={100}
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">Make it catchy and descriptive</p>
                                <div
                                    className={`text-xs font-medium ${getTitleCharacterCount() >= 90
                                            ? "text-red-500"
                                            : getTitleCharacterCount() >= 70
                                                ? "text-yellow-500"
                                                : "text-gray-500"
                                        }`}
                                >
                                    {getTitleCharacterCount()}/100 characters
                                    {getTitleCharacterCount() === 100 && " - Maximum reached"}
                                </div>
                            </div>
                        </div>

                        {/* Banner Field */}
                        <div className="space-y-3">
                            <Label htmlFor="banner" className="flex items-center gap-2 text-sm font-medium">
                                <ImageIcon className="w-4 h-4 text-blue-600" />
                                Cover Image URL
                                <Badge variant="destructive" className="text-xs">
                                    Required
                                </Badge>
                            </Label>
                            <Input
                                id="banner"
                                name="banner"
                                value={post.banner}
                                onChange={onPostChange}
                                placeholder="https://example.com/your-cover-image.jpg"
                                required
                                className="h-11 border-2 focus:border-blue-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500">
                                Use a high-quality image (recommended: 1200x630px) that represents your content
                            </p>
                            {post.banner && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-2">Preview:</p>
                                    <img
                                        src={post.banner || "/placeholder.svg"}
                                        alt="Cover preview"
                                        className="w-full h-32 object-cover rounded-md border"
                                        onError={(e) => {
                                            ; (e.target as HTMLImageElement).style.display = "none"
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Topic Field */}
                        <div className="space-y-3">
                            <Label htmlFor="topic" className="flex items-center gap-2 text-sm font-medium">
                                <Tag className="w-4 h-4 text-blue-600" />
                                Category/Topic
                                <Badge variant="destructive" className="text-xs">
                                    Required
                                </Badge>
                            </Label>
                            <Input
                                id="topic"
                                name="topic"
                                value={post.topic}
                                onChange={onPostChange}
                                placeholder="e.g., Technology, Travel, Food, Lifestyle..."
                                required
                                maxLength={50}
                                className="h-11 border-2 focus:border-blue-500 transition-colors"
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">Choose a relevant category for better discoverability</p>
                                <div className="text-xs text-gray-500">{post.topic.length}/50 characters</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content Blocks */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Edit className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Content Sections</h3>
                                    <p className="text-sm text-gray-600 font-normal">
                                        Add multiple content blocks to structure your blog post
                                    </p>
                                </div>
                            </CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addContent}
                                className="flex items-center gap-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                            >
                                <Plus className="w-4 h-4" />
                                Add Content Block
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {contents.map((content, idx) => (
                            <Card
                                key={idx}
                                className="relative border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-xs">
                                                Section {idx + 1}
                                            </Badge>
                                            <h4 className="text-sm font-medium text-gray-700">Content Block {idx + 1}</h4>
                                        </div>
                                        {contents.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeContent(idx)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    {/* Section Header */}
                                    <div className="space-y-2">
                                        <Label htmlFor={`header-${idx}`} className="text-sm font-medium">
                                            Section Heading (Optional)
                                        </Label>
                                        <Input
                                            id={`header-${idx}`}
                                            value={content.header}
                                            onChange={(e) => onContentChange(idx, "header", e.target.value)}
                                            placeholder="Enter a heading for this section"
                                            maxLength={100}
                                            className="border-2 focus:border-blue-500 transition-colors"
                                        />
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">Use headings to break up your content</p>
                                            <div
                                                className={`text-xs ${getHeaderCharacterCount(content) >= 90 ? "text-red-500" : "text-gray-500"
                                                    }`}
                                            >
                                                {getHeaderCharacterCount(content)}/100 characters
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Body */}
                                    <div className="space-y-2">
                                        <Label htmlFor={`body-${idx}`} className="text-sm font-medium">
                                            Content
                                        </Label>
                                        <Textarea
                                            id={`body-${idx}`}
                                            value={content.body}
                                            onChange={(e) => onContentChange(idx, "body", e.target.value)}
                                            placeholder="Write your content for this section..."
                                            className="min-h-[140px] resize-y border-2 focus:border-blue-500 transition-colors"
                                        />
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">Write engaging and informative content</p>
                                            <div className="text-xs text-gray-500">{getBodyWordCount(content)} words</div>
                                        </div>
                                    </div>

                                    {/* Section Image */}
                                    <div className="space-y-2">
                                        <Label htmlFor={`photo-${idx}`} className="text-sm font-medium">
                                            Section Image URL (Optional)
                                        </Label>
                                        <Input
                                            id={`photo-${idx}`}
                                            value={content.photo}
                                            onChange={(e) => onContentChange(idx, "photo", e.target.value)}
                                            placeholder="https://example.com/section-image.jpg"
                                            className="border-2 focus:border-blue-500 transition-colors"
                                        />
                                        <p className="text-xs text-gray-500">Add an image to illustrate this section (optional)</p>
                                        {content.photo && (
                                            <div className="mt-2 p-2 bg-gray-50 rounded-md">
                                                <img
                                                    src={content.photo || "/placeholder.svg"}
                                                    alt={`Section ${idx + 1} preview`}
                                                    className="w-full h-24 object-cover rounded border"
                                                    onError={(e) => {
                                                        ; (e.target as HTMLImageElement).style.display = "none"
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {/* Submit Section */}
                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setActiveTab("preview")}
                                    className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview Post
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 min-w-[140px] bg-purple-600 hover:bg-purple-700"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {isEditing ? "Updating..." : "Publishing..."}
                                    </>
                                ) : (
                                    <>
                                        {isEditing ? <Save className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                        {isEditing ? "Update Post" : "Publish Post"}
                                    </>
                                )}
                            </Button>
                        </div>

                     
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default PostEditForm
