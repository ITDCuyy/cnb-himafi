"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { Switch } from "~/components/ui/switch";
import { WysiwygEditor } from "~/components/wysiwyg-editor";
import { api } from "~/trpc/react";
import { ArrowLeft, Save, Eye, Newspaper, BookOpen } from "lucide-react";
import Link from "next/link";
import { processTextForHyphenation } from "~/utils/hyphenation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const createPost = api.post.create.useMutation({
    onSuccess: (data) => {
      toast.success(
        `Blog post ${published ? "published" : "saved as draft"} successfully!`,
      );
      if (data) {
        router.push(`/posts/${data.id}`);
      }
    },
    onError: (error) => {
      toast.error("Failed to create blog post: " + error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    createPost.mutate({
      title: title.trim(),
      content: content.trim(),
      type: "blog", // Always create as blog
      published,
    });
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }
    createPost.mutate({
      title: title.trim(),
      content: content.trim(),
      type: "blog",
      published: false,
    });
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }
    createPost.mutate({
      title: title.trim(),
      content: content.trim(),
      type: "blog",
      published: true,
    });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <BookOpen className="h-6 w-6" />
              Create New Blog Post
            </h1>
            <p className="text-muted-foreground">
              Write an in-depth article or story for the community
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Blog Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Blog Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your blog post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                    disabled={createPost.isPending}
                  />
                </div>

                {!isPreview ? (
                  <div>
                    <Label>Content *</Label>
                    <WysiwygEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Start writing your blog post... Share your thoughts, experiences, and insights with the community."
                      minHeight="500px"
                      className="mt-2"
                    />
                  </div>
                ) : (
                  <div>
                    <Label>Preview</Label>
                    <Card className="mt-2">
                      <CardContent className="p-6">
                        <h1
                          className="mb-4 hyphens-auto break-words text-3xl font-bold"
                          lang="id"
                          style={{ hyphens: "auto", wordBreak: "break-word" }}
                        >
                          {title || "Your Blog Title Here"}
                        </h1>
                        <div
                          className="prose prose-sm overflow-wrap-anywhere max-w-none hyphens-auto break-words text-justify [&_*]:hyphens-auto [&_*]:break-words [&_*]:text-justify [&_a]:break-all [&_pre]:hyphens-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:text-left"
                          lang="id"
                          style={{
                            hyphens: "auto",
                            wordBreak: "break-word",
                            WebkitHyphens: "auto",
                            msHyphens: "auto",
                            textAlign: "justify",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              processTextForHyphenation(content) ||
                              "<p class='text-muted-foreground'>Your blog content will appear here...</p>",
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blog Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Blog Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4 text-sm">
                  <h4 className="font-medium text-blue-900">Blog Guidelines</h4>
                  <ul className="mt-2 space-y-1 text-blue-700">
                    <li>• Write in-depth, thoughtful content</li>
                    <li>• Share personal insights and experiences</li>
                    <li>• Use engaging headlines and structure</li>
                    <li>• Include relevant images when appropriate</li>
                  </ul>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="published">Publish Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {published ? "Visible to everyone" : "Save as draft"}
                    </p>
                  </div>
                  <Switch
                    id="published"
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={published ? "default" : "secondary"}>
                    {published ? "Published" : "Draft"}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Blog Post
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handleSaveDraft}
                    variant="outline"
                    className="w-full"
                    disabled={
                      createPost.isPending || !title.trim() || !content.trim()
                    }
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save as Draft
                  </Button>

                  <Button
                    type="button"
                    onClick={handlePublish}
                    className="w-full"
                    disabled={
                      createPost.isPending || !title.trim() || !content.trim()
                    }
                  >
                    <Newspaper className="mr-2 h-4 w-4" />
                    {createPost.isPending ? "Publishing..." : "Publish Blog"}
                  </Button>
                </div>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {createPost.isPending
                    ? "Creating your blog post..."
                    : "All fields marked with * are required"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
