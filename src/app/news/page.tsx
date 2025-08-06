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
  Megaphone,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all published news (posts with type "post")
  const { data: posts, isLoading } = api.post.getAll.useQuery();
  const { data: session } = api.authorization.currentSession.useQuery();

  // Filter for news posts only and apply search
  const newsItems = posts?.filter((post) => {
    const isNews = post.type === "post";
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return isNews && matchesSearch;
  });

  const canCreatePosts =
    session && ["member", "admin"].includes(session.user.role);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading news...</p>
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
          <Megaphone className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">HIMAFI News</h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Stay updated with the latest announcements, events, and important
          information from the Mathematics and Physics Student Association
        </p>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {canCreatePosts && (
          <Link href="/news/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create News
            </Button>
          </Link>
        )}
      </div>

      {/* News Grid */}
      {newsItems && newsItems.length > 0 ? (
        <div className="space-y-6">
          {newsItems.map((post, index) => (
            <Card
              key={post.id}
              className={`transition-all hover:shadow-md ${
                index === 0 ? "border-orange-200 bg-orange-50/50" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {index === 0 && (
                        <Badge className="border-orange-200 bg-orange-100 text-orange-800">
                          Latest
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className="border-orange-200 bg-orange-50 text-orange-700"
                      >
                        News
                      </Badge>
                    </div>
                    <CardTitle className="mb-2 text-xl transition-colors hover:text-primary">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author?.name || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(post.createdAt, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDistanceToNow(post.createdAt)} ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="mb-4 line-clamp-3 text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.replace(/<[^>]*>/g, " ").substring(0, 200) +
                      "...",
                  }}
                />
                <Link href={`/posts/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <CardContent>
            <Megaphone className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No News Available</h3>
            <p className="mb-4 text-muted-foreground">
              {searchQuery
                ? "No news found matching your search criteria."
                : "There are no news announcements at the moment."}
            </p>
            {canCreatePosts && !searchQuery && (
              <Link href="/news/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First News
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {newsItems && newsItems.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {newsItems.length} news{" "}
          {newsItems.length === 1 ? "item" : "items"}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}
    </div>
  );
}
