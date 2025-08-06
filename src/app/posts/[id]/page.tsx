"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";
import {
  ArrowLeft,
  Calendar,
  User,
  Edit,
  FileText,
  Newspaper,
  Clock,
  Share2,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import { processTextForHyphenation } from "~/utils/hyphenation";

export default function PostViewPage() {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);

  const {
    data: post,
    isLoading,
    error,
  } = api.post.getById.useQuery({ id: postId }, { enabled: !!postId });

  const { data: session } = api.authorization.currentSession.useQuery();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text:
            post?.content?.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
          <p className="mb-6 text-muted-foreground">
            The post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if user can edit this post
  const canEdit =
    session &&
    (session.user.role === "admin" || session.user.id === post.authorId);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>

          {canEdit && (
            <Link href={`/posts/edit/${post.id}`}>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Post Content */}
      <article className="space-y-6">
        {/* Post Header */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-4">
              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline" className="capitalize">
                  <div className="flex items-center gap-1">
                    {post.type === "blog" ? (
                      <Newspaper className="h-3 w-3" />
                    ) : (
                      <FileText className="h-3 w-3" />
                    )}
                    {post.type}
                  </div>
                </Badge>

                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {/* eslint-disable-next-line */}
                  {format(new Date(post.createdAt), "MMM dd, yyyy")}
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {/* eslint-disable-next-line */}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              {/* Title */}
              <h1
                className="hyphens-auto break-words text-4xl font-bold leading-tight"
                lang="id"
                style={{ hyphens: "auto", wordBreak: "break-word" }}
              >
                {post.title}
              </h1>

              <Separator />

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.image ?? undefined} />
                  <AvatarFallback>
                    {post.author.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Body */}
        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-lg overflow-wrap-anywhere max-w-none hyphens-auto break-words text-justify [&_*]:hyphens-auto [&_*]:break-words [&_*]:text-justify [&_a]:break-all [&_a]:text-primary [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 hover:[&_a]:text-primary/80 [&_blockquote]:my-6 [&_blockquote]:break-words [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/20 [&_blockquote]:py-2 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:hyphens-none [&_code]:break-words [&_code]:rounded [&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:font-mono [&_code]:text-sm [&_em]:italic [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:break-words [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:first:mt-0 [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:break-words [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:break-words [&_h3]:text-xl [&_h3]:font-bold [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:break-words [&_h4]:text-lg [&_h4]:font-bold [&_hr]:my-8 [&_hr]:border-border [&_img]:mx-auto [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img]:shadow-md [&_li]:break-words [&_li]:text-foreground [&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_p]:mb-4 [&_p]:break-words [&_p]:leading-relaxed [&_p]:text-foreground [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:hyphens-none [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-left [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-bold [&_strong]:text-foreground [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted/50 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1"
              lang="id"
              style={{
                hyphens: "auto",
                wordBreak: "break-word",
                WebkitHyphens: "auto",
                msHyphens: "auto",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{
                __html: processTextForHyphenation(post.content),
              }}
            />
          </CardContent>
        </Card>

        {/* Post Footer */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                <p>
                  Published on {/* eslint-disable-next-line */}
                  {format(new Date(post.createdAt), "MMMM dd, yyyy 'at' HH:mm")}
                </p>
                {post.updatedAt &&
                  new Date(post.updatedAt) > new Date(post.createdAt) && (
                    <p>
                      Last updated {/* eslint-disable-next-line */}
                      {formatDistanceToNow(new Date(post.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Post
                </Button>

                {canEdit && (
                  <Link href={`/posts/edit/${post.id}`}>
                    <Button size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Post
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
