import { redirect } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/server";
import { canManageUsers } from "~/lib/auth-utils";
import { UsersTable } from "./_components/users-table";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Users,
  FileText,
  Newspaper,
  Plus,
  Settings,
  Link as LinkIcon,
  BarChart3,
} from "lucide-react";

export default async function AdminPage() {
  const session = await api.authorization.currentSession();

  if (!canManageUsers(session)) {
    redirect("/");
  }

  const users = await api.user.getAll();

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your site content and users
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <Link href="/blog/create" className="block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Newspaper className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create Blog</h3>
                    <p className="text-sm text-muted-foreground">
                      Write a blog post
                    </p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <Link href="/news/create" className="block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <Plus className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create News</h3>
                    <p className="text-sm text-muted-foreground">
                      Post an announcement
                    </p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <Link href="/posts/create" className="block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create Post</h3>
                    <p className="text-sm text-muted-foreground">
                      General content
                    </p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <Link href="/posts/manage" className="block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Settings className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Manage Posts</h3>
                    <p className="text-sm text-muted-foreground">
                      Edit existing content
                    </p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <Link href="/link" className="block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <LinkIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Short Links</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage URL shortcuts
                    </p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Management */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Content Management</h2>
          <div className="flex gap-2">
            <Link href="/posts/create">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
            <Link href="/posts/manage">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                All Posts
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                Blog & News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Published posts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Newspaper className="h-4 w-4" />
                Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Unpublished drafts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <LinkIcon className="h-4 w-4" />
                Short Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active redirects</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Management */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Users className="h-5 w-5" />
            User Management
          </h2>
        </div>
        <UsersTable users={users} />
      </div>
    </div>
  );
}
