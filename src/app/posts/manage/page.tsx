"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Calendar,
  User,
  FileText,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function PostsManagementPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "post" | "blog">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  // Fetch user's own posts (including drafts)
  const { data: posts, isLoading, refetch } = api.post.getMyPosts.useQuery();

  // Delete post mutation
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      void refetch();
    },
    onError: (error) => {
      toast.error("Failed to delete post: " + error.message);
    },
  });

  // Filter posts based on search and filters
  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || post.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && post.published) ||
      (statusFilter === "draft" && !post.published);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (postId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      )
    ) {
      deletePost.mutate({ id: postId });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage My Posts</h1>
          <p className="text-muted-foreground">
            View and manage your published and draft content
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/drafts">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Drafts
            </Button>
          </Link>
          <Link href="/blog/create">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              New Blog
            </Button>
          </Link>
          <Link href="/news/create">
            <Button>
              <Megaphone className="mr-2 h-4 w-4" />
              New News
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{posts?.length ?? 0}</p>
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
                  {posts?.filter((p) => p.published).length ?? 0}
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
                  {posts?.filter((p) => !p.published).length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Blog Posts</p>
                <p className="text-2xl font-bold text-blue-500">
                  {posts?.filter((p) => p.type === "blog").length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search posts..."
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
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
                <SelectItem value="blog">Blogs</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value: "all" | "published" | "draft") =>
                setStatusFilter(value)
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center">
                    <div className="text-center">
                      <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">
                        No posts found
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        {searchQuery ||
                        typeFilter !== "all" ||
                        statusFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Get started by creating your first post"}
                      </p>
                      {!searchQuery &&
                        typeFilter === "all" &&
                        statusFilter === "all" && (
                          <Link href="/posts/create">
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Create First Post
                            </Button>
                          </Link>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts?.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <p className="line-clamp-2 font-medium">{post.title}</p>
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {post.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 100)}
                          ...
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
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
                    </TableCell>

                    <TableCell>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {post.author?.name ?? "Unknown Author"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {/* eslint-disable-next-line */}
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem asChild>
                            <Link href={`/posts/${post.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link href={`/posts/edit/${post.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleDelete(post.id)}
                            className="text-destructive focus:text-destructive"
                            disabled={deletePost.isPending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
