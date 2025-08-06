"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import {
  Search,
  Calendar,
  User,
  BookOpen,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all published posts
  const { data: posts, isLoading } = api.post.getAll.useQuery();
  const { data: session } = api.authorization.currentSession.useQuery();

  // Filter for blog posts only and apply search
  const blogPosts = posts?.filter((post) => {
    const isBlog = post.type === "blog";
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return isBlog && matchesSearch;
  });

  const canCreatePosts =
    session && ["member", "admin"].includes(session.user.role);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">HIMAFI Blog</h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover insights, experiences, and thoughtful articles from our
          community members
        </p>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {canCreatePosts && (
          <Link href="/blog/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Write Blog Post
            </Button>
          </Link>
        )}
      </div>

      {/* Blog Posts Grid */}
      {blogPosts && blogPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700"
                  >
                    Blog
                  </Badge>
                </div>
                <CardTitle className="mb-2 line-clamp-2 text-lg transition-colors hover:text-primary">
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">
                      {post.author?.name ?? "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(post.createdAt, "MMM dd")}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="mb-4 line-clamp-3 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.replace(/<[^>]*>/g, " ").substring(0, 120) +
                      "...",
                  }}
                />
                <div className="flex items-center justify-between">
                  <Link href={`/posts/${post.id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(post.createdAt)} ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <CardContent>
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">
              No Blog Posts Available
            </h3>
            <p className="mb-4 text-muted-foreground">
              {searchQuery
                ? "No blog posts found matching your search criteria."
                : "No blog posts have been published yet."}
            </p>
            {canCreatePosts && !searchQuery && (
              <Link href="/blog/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Write First Blog Post
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {blogPosts && blogPosts.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {blogPosts.length} blog{" "}
          {blogPosts.length === 1 ? "post" : "posts"}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}
    </div>
  );
}
