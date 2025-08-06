"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import {
  Search,
  Calendar,
  User,
  Edit,
  Eye,
  FileText,
  Newspaper,
  Clock,
  ArrowLeft,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

function DraftsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "post" | "blog">("all");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for type parameter in URL only after component is mounted
  useEffect(() => {
    if (mounted) {
      const typeParam = searchParams.get("type");
      if (typeParam === "blog" || typeParam === "post") {
        setTypeFilter(typeParam);
      }
    }
  }, [searchParams, mounted]);

  // Fetch user's own posts (including drafts)
  const { data: posts, isLoading } = api.post.getMyPosts.useQuery();

  // Filter for drafts only and apply search/type filters
  const drafts = posts?.filter((post) => {
    const isDraft = !post.published;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || post.type === typeFilter;

    return isDraft && matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading drafts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/posts/manage">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Manage
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">My Drafts</h1>
            <p className="text-muted-foreground">
              View and manage your unpublished content
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={typeFilter}
          onValueChange={(value: "all" | "post" | "blog") =>
            setTypeFilter(value)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="blog">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Blog Posts
              </div>
            </SelectItem>
            <SelectItem value="post">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                News
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Drafts</p>
                <p className="text-2xl font-bold">{drafts?.length ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Blog Drafts</p>
                <p className="text-2xl font-bold text-blue-500">
                  {drafts?.filter((p) => p.type === "blog").length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">News Drafts</p>
                <p className="text-2xl font-bold text-orange-500">
                  {drafts?.filter((p) => p.type === "post").length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drafts List */}
      {drafts && drafts.length > 0 ? (
        <div className="space-y-4">
          {drafts.map((post) => (
            <Card key={post.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-700"
                      >
                        Draft
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          post.type === "blog"
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-orange-200 bg-orange-50 text-orange-700"
                        }
                      >
                        <div className="flex items-center gap-1">
                          {post.type === "blog" ? (
                            <BookOpen className="h-3 w-3" />
                          ) : (
                            <Megaphone className="h-3 w-3" />
                          )}
                          {post.type === "blog" ? "Blog" : "News"}
                        </div>
                      </Badge>
                    </div>
                    <CardTitle className="mb-2 text-xl">{post.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created {format(post.createdAt, "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDistanceToNow(post.createdAt)} ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </Link>
                    <Link href={`/posts/edit/${post.id}`}>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="line-clamp-2 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.replace(/<[^>]*>/g, " ").substring(0, 150) +
                      "...",
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <CardContent>
            <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Drafts Found</h3>
            <p className="mb-4 text-muted-foreground">
              {searchQuery
                ? "No drafts found matching your search criteria."
                : "You don't have any drafts yet."}
            </p>
            <div className="flex justify-center gap-2">
              <Link href="/blog/create">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Write Blog
                </Button>
              </Link>
              <Link href="/news/create">
                <Button variant="outline">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Create News
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer Stats */}
      {drafts && drafts.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {drafts.length} draft{drafts.length === 1 ? "" : "s"}
          {searchQuery && ` matching "${searchQuery}"`}
          {typeFilter !== "all" &&
            ` in ${typeFilter === "blog" ? "blog posts" : "news"}`}
        </div>
      )}
    </div>
  );
}

function DraftsPageFallback() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading drafts...</p>
        </div>
      </div>
    </div>
  );
}

export default function DraftsPage() {
  return (
    <Suspense fallback={<DraftsPageFallback />}>
      <DraftsContent />
    </Suspense>
  );
}
