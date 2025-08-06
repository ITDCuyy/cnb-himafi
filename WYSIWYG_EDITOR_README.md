# WYSIWYG Blog/News Editor System

This documentation covers the comprehensive WYSIWYG (What You See Is What You Get) editor system built for the HIMAFI blog and news platform.

## 🚀 Features

### ✨ Rich Text Editor (`WysiwygEditor`)

- **Text Formatting**: Bold, italic, underline, strikethrough
- **Text Alignment**: Left, center, right, justify
- **Lists**: Bulleted and numbered lists
- **Headings**: H1-H4 with visual preview
- **Colors**: Text and background color picker
- **Special Elements**: Blockquotes and code blocks
- **Media**: Link and image insertion with dialogs
- **History**: Undo/redo functionality
- **Responsive**: Mobile-friendly toolbar

### 📝 Post Management System

- **Create Posts**: Rich interface for writing blog posts and news
- **Edit Posts**: Full editing capabilities with live preview
- **Post Types**: Separate "post" and "blog" content types
- **Draft System**: Save as draft or publish immediately
- **Preview Mode**: Toggle between edit and preview views
- **Role-based Access**: Members and admins can create content

### 🛠 Admin Dashboard

- **Content Overview**: Statistics and quick actions
- **Post Management**: View, edit, delete all posts
- **User Management**: Integrated with existing user system
- **Quick Actions**: Fast access to common tasks

## 📁 File Structure

```
src/
├── components/
│   └── wysiwyg-editor.tsx          # Main WYSIWYG editor component
├── app/
│   ├── admin/
│   │   └── page.tsx                # Enhanced admin dashboard
│   ├── blog/
│   │   └── page.tsx                # Public blog listing
│   └── posts/
│       ├── create/
│       │   └── page.tsx            # Create new post
│       ├── edit/
│       │   └── [id]/
│       │       └── page.tsx        # Edit existing post
│       ├── manage/
│       │   └── page.tsx            # Admin post management
│       └── [id]/
│           └── page.tsx            # View individual post
└── components/ui/
    ├── select.tsx                  # Select dropdown component
    ├── alert-dialog.tsx            # Confirmation dialogs
    └── avatar.tsx                  # User avatar component
```

## 🎯 Usage

### Creating a New Post

1. Navigate to `/posts/create` or use the admin dashboard
2. Enter a title and select post type (post/blog)
3. Use the WYSIWYG editor to write your content
4. Toggle between edit and preview modes
5. Save as draft or publish immediately

### Using the WYSIWYG Editor

The editor toolbar includes:

- **Text Formatting**: ![Bold](B) ![Italic](I) ![Underline](U) ![Strikethrough](S)
- **Alignment**: ![Left](⬅) ![Center](↔) ![Right](➡) ![Justify](⬌)
- **Lists**: ![Bullet](•) ![Number](1.)
- **Styles**: Dropdown for headings (H1-H4)
- **Colors**: Text and background color pickers
- **Elements**: Blockquotes and code blocks
- **Media**: Link and image insertion
- **History**: Undo/redo buttons

### Post Types

- **Post**: Short updates, announcements, news
- **Blog**: Long-form articles, in-depth content

### Access Control

- **Public**: Can read published posts
- **Members**: Can create, edit own posts
- **Admins**: Can manage all posts and users

## 🔧 Technical Details

### Backend Integration

The system integrates with the existing tRPC API:

```typescript
// Create post
api.post.create.useMutation({
  title: string,
  content: string,
  type: "post" | "blog",
  published: boolean
})

// Update post
api.post.update.useMutation({
  id: number,
  title?: string,
  content?: string,
  type?: "post" | "blog",
  published?: boolean
})

// Delete post
api.post.delete.useMutation({ id: number })

// Get posts
api.post.getAll.useQuery()        // All published posts
api.post.getById.useQuery({id})   // Single post
api.post.getMyPosts.useQuery()    // User's own posts
```

### Database Schema

Posts are stored with the following structure:

```sql
posts {
  id: serial PRIMARY KEY
  title: varchar(256)
  content: text
  type: varchar(50) DEFAULT 'post'    -- 'post' or 'blog'
  published: boolean DEFAULT false
  authorId: varchar(255) REFERENCES users(id)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Security

- Role-based access control using middleware
- Author ownership validation for edits/deletes
- Admin override for all operations
- XSS protection with content sanitization

## 🚀 Getting Started

1. Ensure required packages are installed:

   ```bash
   pnpm install @radix-ui/react-avatar @radix-ui/react-alert-dialog @radix-ui/react-select date-fns
   ```

2. Access the admin dashboard at `/admin`

3. Create your first post at `/posts/create`

4. View all posts at `/blog`

## 🎨 Customization

### Styling

The editor uses Tailwind CSS classes and can be customized by modifying:

- `wysiwyg-editor.tsx` - Editor appearance and toolbar
- Global CSS for content styling
- Card components for post layouts

### Extending Features

To add more editor features:

1. Add new toolbar buttons in `WysiwygEditor`
2. Implement corresponding `execCommand` functions
3. Add any required dialogs or dropdowns
4. Update the content styling classes

## 📱 Mobile Support

The editor is fully responsive with:

- Collapsible toolbar on small screens
- Touch-friendly controls
- Adaptive button sizing
- Mobile-optimized dialogs

## ⚡ Performance

- Lazy loading of editor components
- Optimistic updates for better UX
- Efficient re-rendering with React hooks
- Content caching where appropriate

## 🔄 Future Enhancements

Potential improvements:

- [ ] Image upload integration with existing system
- [ ] Auto-save drafts functionality
- [ ] Comment system for posts
- [ ] Categories and tags
- [ ] SEO metadata fields
- [ ] Export/import functionality
- [ ] Collaborative editing
- [ ] Version history
- [ ] Content templates

---

Built with ❤️ for HIMAFI using Next.js, tRPC, and modern web technologies.
