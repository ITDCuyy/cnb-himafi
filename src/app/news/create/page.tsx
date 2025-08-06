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
import { ArrowLeft, Save, Eye, Megaphone, FileText } from "lucide-react";
import Link from "next/link";
import { processTextForHyphenation } from "~/utils/hyphenation";

export default function CreateNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const createPost = api.post.create.useMutation({
    onSuccess: (data) => {
      toast.success(
        `News ${published ? "published" : "saved as draft"} successfully!`,
      );
      if (data) {
        router.push(`/posts/${data.id}`);
      }
    },
    onError: (error) => {
      toast.error("Failed to create news: " + error.message);
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
      type: "post", // Use "post" for news
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
      type: "post",
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
      type: "post",
      published: true,
    });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Megaphone className="h-6 w-6" />
              Create News Announcement
            </h1>
            <p className="text-muted-foreground">
              Share important updates and announcements with the community
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
                  News Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">News Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your news headline..."
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
                      placeholder="Write your news announcement... Keep it concise and informative."
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
                          {title || "Your News Title Here"}
                        </h1>
                        <div
                          className="prose prose-sm overflow-wrap-anywhere max-w-none hyphens-auto break-words text-justify [&_*]:hyphens-auto [&_*]:break-words [&_*]:text-justify [&_a]:break-all [&_blockquote]:hyphens-auto [&_blockquote]:break-words [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:text-justify [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:hyphens-auto [&_h1]:break-words [&_h1]:text-justify [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:hyphens-auto [&_h2]:break-words [&_h2]:text-justify [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:hyphens-auto [&_h3]:break-words [&_h3]:text-justify [&_h3]:text-xl [&_h3]:font-bold [&_h4]:mb-2 [&_h4]:mt-3 [&_h4]:hyphens-auto [&_h4]:break-words [&_h4]:text-justify [&_h4]:text-lg [&_h4]:font-bold [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img]:shadow-sm [&_li]:mb-1 [&_li]:hyphens-auto [&_li]:break-words [&_li]:text-justify [&_ol]:mb-3 [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:mb-3 [&_p]:hyphens-auto [&_p]:break-words [&_p]:text-justify [&_p]:leading-relaxed [&_pre]:hyphens-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:text-left [&_ul]:mb-3 [&_ul]:ml-6 [&_ul]:list-disc"
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
                              "<p class='text-muted-foreground'>Your news content will appear here...</p>",
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
            {/* News Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  News Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-orange-50 p-4 text-sm">
                  <h4 className="font-medium text-orange-900">
                    News Guidelines
                  </h4>
                  <ul className="mt-2 space-y-1 text-orange-700">
                    <li>• Keep announcements clear and concise</li>
                    <li>• Include important dates and deadlines</li>
                    <li>• Use bullet points for multiple items</li>
                    <li>• Add contact information if needed</li>
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
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700"
                  >
                    News
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
                    <Megaphone className="mr-2 h-4 w-4" />
                    {createPost.isPending ? "Publishing..." : "Publish News"}
                  </Button>
                </div>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {createPost.isPending
                    ? "Creating your news announcement..."
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
