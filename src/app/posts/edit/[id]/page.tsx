"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { WysiwygEditor } from "~/components/wysiwyg-editor";
import { api } from "~/trpc/react";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Newspaper,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { processTextForHyphenation } from "~/utils/hyphenation";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = parseInt(params.id as string);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"post" | "blog">("post");
  const [published, setPublished] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // Fetch existing post
  const { data: post, isLoading } = api.post.getById.useQuery(
    { id: postId },
    { enabled: !!postId },
  );

  // Update post mutation
  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      toast.success(
        `${type === "blog" ? "Blog post" : "Post"} updated successfully!`,
      );
      router.push(`/posts/${postId}`);
    },
    onError: (error) => {
      toast.error("Failed to update post: " + error.message);
    },
  });

  // Delete post mutation
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      router.push("/admin");
    },
    onError: (error) => {
      toast.error("Failed to delete post: " + error.message);
    },
  });

  // Load post data when available
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setType(post.type as "post" | "blog");
      setPublished(post.published);
    }
  }, [post]);

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

    updatePost.mutate({
      id: postId,
      title: title.trim(),
      content: content.trim(),
      type,
      published,
    });
  };

  const handleSaveDraft = () => {
    setPublished(false);
    // Directly call updatePost.mutate instead of faking a form event
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }
    updatePost.mutate({
      id: postId,
      title: title.trim(),
      content: content.trim(),
      type,
      published: false,
    });
  };

  const handlePublish = () => {
    setPublished(true);
    // Directly call updatePost.mutate instead of faking a form event
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }
    updatePost.mutate({
      id: postId,
      title: title.trim(),
      content: content.trim(),
      type,
      published: true,
    });
  };

  const handleDelete = () => {
    deletePost.mutate({ id: postId });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
          <p className="mb-6 text-muted-foreground">
            The post you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <Link href="/admin">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              Edit {type === "blog" ? "Blog Post" : "Post"}
            </h1>
            <p className="text-muted-foreground">
              Make changes to your content
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
                  <FileText className="h-5 w-5" />
                  Title & Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                    disabled={updatePost.isPending}
                  />
                </div>

                {!isPreview ? (
                  <div>
                    <Label>Content *</Label>
                    <WysiwygEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Start writing your content..."
                      minHeight="400px"
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
                          {title || "Your Title Here"}
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
                              "<p class='text-muted-foreground'>Your content will appear here...</p>",
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
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Post Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">Post Type</Label>
                  <Select
                    value={type}
                    onValueChange={(value: "post" | "blog") => setType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Post</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="blog">
                        <div className="flex items-center gap-2">
                          <Newspaper className="h-4 w-4" />
                          <span>Blog</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {type === "blog"
                      ? "Long-form articles and in-depth content"
                      : "Short updates and announcements"}
                  </p>
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
                  <Badge variant="outline" className="capitalize">
                    {type}
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
                      updatePost.isPending || !title.trim() || !content.trim()
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
                      updatePost.isPending || !title.trim() || !content.trim()
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {updatePost.isPending ? "Updating..." : "Update & Publish"}
                  </Button>
                </div>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {updatePost.isPending
                    ? "Updating your post..."
                    : "All fields marked with * are required"}
                </p>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-sm text-destructive">
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Post
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post and remove all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deletePost.isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deletePost.isPending ? "Deleting..." : "Delete Post"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
