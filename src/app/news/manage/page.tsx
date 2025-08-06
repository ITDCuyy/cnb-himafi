"use client";

import { useState } from "react";
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
  Megaphone,
  Clock,
  ArrowLeft,
  Plus,
  Filter,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default function NewsManagePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  // Fetch user's own posts (including drafts)
  const { data: posts, isLoading } = api.post.getMyPosts.useQuery();
  const { data: session } = api.authorization.currentSession.useQuery();

  // Filter for news posts only and apply search/status filters
  const newsPosts = posts?.filter((post) => {
    const isNews = post.type === "post";
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && post.published) ||
      (statusFilter === "draft" && !post.published);

    return isNews && matchesSearch && matchesStatus;
  });

  const canManagePosts =
    session && ["member", "admin"].includes(session.user.role);

  if (!canManagePosts) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to manage news articles.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading news articles...</p>
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
          <Link href="/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <Megaphone className="h-8 w-8 text-orange-600" />
              Manage News Articles
            </h1>
            <p className="text-muted-foreground">
              View and manage your news articles and drafts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/drafts?type=post">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View News Drafts
            </Button>
          </Link>
          <Link href="/news/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New News Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Total News Articles
                </p>
                <p className="text-2xl font-bold text-orange-500">
                  {newsPosts?.length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-500">
                  {newsPosts?.filter((p) => p.published).length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-orange-500">
                  {newsPosts?.filter((p) => !p.published).length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value: "all" | "published" | "draft") =>
            setStatusFilter(value)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Published
              </div>
            </SelectItem>
            <SelectItem value="draft">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Drafts
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* News Articles List */}
      {newsPosts && newsPosts.length > 0 ? (
        <div className="space-y-4">
          {newsPosts.map((post) => (
            <Card key={post.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        variant={post.published ? "default" : "outline"}
                        className={
                          post.published
                            ? "border-green-200 bg-green-100 text-green-800"
                            : "bg-gray-50 text-gray-700"
                        }
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-orange-200 bg-orange-50 text-orange-700"
                      >
                        <Megaphone className="mr-1 h-3 w-3" />
                        News Article
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
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author?.name ?? "Unknown Author"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        {post.published ? "View" : "Preview"}
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
            <Megaphone className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">
              No News Articles Found
            </h3>
            <p className="mb-4 text-muted-foreground">
              {searchQuery
                ? "No news articles found matching your search criteria."
                : statusFilter === "draft"
                  ? "You don't have any news drafts yet."
                  : statusFilter === "published"
                    ? "You don't have any published news articles yet."
                    : "You haven't created any news articles yet."}
            </p>
            <Link href="/news/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First News Article
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Footer Stats */}
      {newsPosts && newsPosts.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {newsPosts.length} news article
          {newsPosts.length === 1 ? "" : "s"}
          {searchQuery && ` matching "${searchQuery}"`}
          {statusFilter !== "all" && ` in ${statusFilter}`}
        </div>
      )}
    </div>
  );
}
