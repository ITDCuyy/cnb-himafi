"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Toggle } from "~/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Undo,
  Redo,
  Type,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Upload,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { UploadButton } from "~/utils/uploadthing";
import NextImage from "next/image";

interface WysiwygEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export function WysiwygEditor({
  value = "",
  onChange,
  placeholder = "Start writing...",
  className,
  minHeight = "300px",
}: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Execute command
  const execCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput],
  );

  // Format text commands
  const formatCommands = {
    bold: () => execCommand("bold"),
    italic: () => execCommand("italic"),
    underline: () => execCommand("underline"),
    strikethrough: () => execCommand("strikeThrough"),
    insertUnorderedList: () => execCommand("insertUnorderedList"),
    insertOrderedList: () => execCommand("insertOrderedList"),
    indent: () => execCommand("indent"),
    outdent: () => execCommand("outdent"),
    formatBlock: (tag: string) => execCommand("formatBlock", tag),
    undo: () => execCommand("undo"),
    redo: () => execCommand("redo"),
  };

  // Insert link
  const insertLink = () => {
    if (linkUrl) {
      const selection = window.getSelection();
      const text = linkText ?? selection?.toString() ?? linkUrl;
      execCommand(
        "insertHTML",
        `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`,
      );
      setLinkUrl("");
      setLinkText("");
      setIsLinkDialogOpen(false);
    }
  };

  // Insert image
  const insertImage = () => {
    const finalImageUrl = uploadedImageUrl || imageUrl;
    console.log("Inserting image with URL:", finalImageUrl);
    console.log("uploadedImageUrl:", uploadedImageUrl);
    console.log("imageUrl:", imageUrl);

    if (finalImageUrl && editorRef.current) {
      const altText = imageAlt || "Image";

      // Focus the editor first
      editorRef.current.focus();

      // Create the image HTML
      const imageHtml = `<img src="${finalImageUrl}" alt="${altText}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0;" />`;

      // Try different methods to insert the image
      try {
        // Method 1: Try execCommand
        const success = document.execCommand("insertHTML", false, imageHtml);
        if (!success) {
          throw new Error("execCommand failed");
        }
        console.log("Image inserted using execCommand");
      } catch (error) {
        console.log("execCommand failed, trying manual insertion:", error);

        // Method 2: Manual insertion at cursor position
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();

          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = imageHtml;
          const imageNode = tempDiv.firstChild as HTMLElement;

          if (imageNode) {
            range.insertNode(imageNode);
            range.setStartAfter(imageNode);
            range.setEndAfter(imageNode);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        } else {
          // Method 3: Append to end if no selection
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = imageHtml;
          const imageNode = tempDiv.firstChild as HTMLElement;
          if (imageNode) {
            editorRef.current.appendChild(imageNode);
          }
        }
        console.log("Image inserted using manual method");
      }

      // Trigger change event
      handleInput();
      console.log("Image inserted successfully");

      // Reset state and close dialog
      setImageUrl("");
      setImageAlt("");
      setUploadedImageUrl("");
      setIsImageDialogOpen(false);
    } else {
      console.error("Cannot insert image - missing URL or editor ref", {
        finalImageUrl,
        editorRef: !!editorRef.current,
      });
    }
  };

  // Handle successful upload
  const handleUploadComplete = (res: { url: string }[]) => {
    console.log("Upload complete response:", res);
    if (res?.[0]?.url) {
      setUploadedImageUrl(res[0].url);
      setIsUploading(false);
      console.log("Image URL set:", res[0].url);
    } else {
      console.error("No URL in upload response:", res);
      setIsUploading(false);
    }
  };

  // Handle upload error
  const handleUploadError = (error: Error) => {
    console.error("Upload failed:", error);
    setIsUploading(false);
  };

  // Insert blockquote
  const insertBlockquote = () => {
    const selection = window.getSelection();
    const text = selection?.toString() ?? "Quote text here...";
    execCommand(
      "insertHTML",
      `<blockquote style="border-left: 4px solid #e5e7eb; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280;">${text}</blockquote>`,
    );
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-0">
        {/* Toolbar */}
        <div className="border-b p-3">
          <div className="flex flex-wrap items-center gap-1">
            {/* Text Formatting */}
            <ToggleGroup type="multiple" className="mr-2">
              <ToggleGroupItem
                value="bold"
                onClick={formatCommands.bold}
                size="sm"
              >
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                onClick={formatCommands.italic}
                size="sm"
              >
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="underline"
                onClick={formatCommands.underline}
                size="sm"
              >
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="strikethrough"
                onClick={formatCommands.strikethrough}
                size="sm"
              >
                <Strikethrough className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Lists */}
            <ToggleGroup type="multiple" className="mr-2">
              <ToggleGroupItem
                value="ul"
                onClick={formatCommands.insertUnorderedList}
                size="sm"
              >
                <List className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="ol"
                onClick={formatCommands.insertOrderedList}
                size="sm"
              >
                <ListOrdered className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Heading Styles */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Type className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => formatCommands.formatBlock("p")}
                >
                  Normal Text
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => formatCommands.formatBlock("h1")}
                >
                  <span className="text-2xl font-bold">Heading 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => formatCommands.formatBlock("h2")}
                >
                  <span className="text-xl font-bold">Heading 2</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => formatCommands.formatBlock("h3")}
                >
                  <span className="text-lg font-bold">Heading 3</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => formatCommands.formatBlock("h4")}
                >
                  <span className="text-base font-bold">Heading 4</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Special Elements */}
            <Button variant="outline" size="sm" onClick={insertBlockquote}>
              <Quote className="h-4 w-4" />
            </Button>

            {/* Link Dialog */}
            <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Insert Link</DialogTitle>
                  <DialogDescription>
                    Add a link to your content
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="link-text">Link Text</Label>
                    <Input
                      id="link-text"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      placeholder="Link text (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="link-url">URL</Label>
                    <Input
                      id="link-url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsLinkDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={insertLink}>Insert Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Image Dialog */}
            <Dialog
              open={isImageDialogOpen}
              onOpenChange={setIsImageDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" aria-label="Insert image">
                  {/* eslint-disable-next-line */}
                  <Image className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Insert Image</DialogTitle>
                  <DialogDescription>
                    Add an image from URL or upload from your device
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">From URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="space-y-4">
                    <div>
                      <Label htmlFor="image-url">Image URL</Label>
                      <Input
                        id="image-url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image-alt">Alt Text</Label>
                      <Input
                        id="image-alt"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="Describe the image"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {uploadedImageUrl ? (
                        <div className="space-y-2">
                          <p className="text-sm text-green-600">
                            ✓ Image uploaded successfully!
                          </p>
                          <NextImage
                            src={uploadedImageUrl}
                            alt="Preview"
                            width={200}
                            height={128}
                            className="max-h-32 max-w-full rounded border object-contain"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUploadedImageUrl("")}
                          >
                            Choose Different Image
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full">
                          <Label htmlFor="image-upload">Upload Image</Label>
                          <div className="mt-2">
                            <UploadButton
                              endpoint="imageUploader"
                              onClientUploadComplete={handleUploadComplete}
                              onUploadError={handleUploadError}
                              onUploadBegin={() => setIsUploading(true)}
                              appearance={{
                                button:
                                  "ut-ready:bg-primary ut-ready:text-primary-foreground ut-uploading:cursor-not-allowed ut-uploading:bg-muted",
                                allowedContent: "text-xs text-muted-foreground",
                              }}
                            />
                          </div>
                          {isUploading && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              Uploading image...
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="upload-alt">Alt Text</Label>
                      <Input
                        id="upload-alt"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="Describe the image"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsImageDialogOpen(false);
                      setImageUrl("");
                      setImageAlt("");
                      setUploadedImageUrl("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Insert Image button clicked");
                      console.log("imageUrl:", imageUrl);
                      console.log("uploadedImageUrl:", uploadedImageUrl);
                      console.log(
                        "Button disabled:",
                        !imageUrl && !uploadedImageUrl,
                      );
                      insertImage();
                    }}
                    disabled={!imageUrl && !uploadedImageUrl}
                    className={cn(
                      !imageUrl && !uploadedImageUrl
                        ? "opacity-50"
                        : "opacity-100",
                    )}
                  >
                    Insert Image{" "}
                    {!imageUrl && !uploadedImageUrl
                      ? "(No image selected)"
                      : ""}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Undo/Redo */}
            <Button variant="outline" size="sm" onClick={formatCommands.undo}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={formatCommands.redo}>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          lang="id"
          className={cn(
            "prose prose-sm max-w-none p-4 text-justify focus:outline-none",
            "overflow-wrap-anywhere min-h-[300px] overflow-y-auto hyphens-auto break-words",
            "[&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:hyphens-auto [&_h1]:break-words [&_h1]:text-justify [&_h1]:text-3xl [&_h1]:font-bold",
            "[&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:hyphens-auto [&_h2]:break-words [&_h2]:text-justify [&_h2]:text-2xl [&_h2]:font-bold",
            "[&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:hyphens-auto [&_h3]:break-words [&_h3]:text-justify [&_h3]:text-xl [&_h3]:font-bold",
            "[&_h4]:mb-2 [&_h4]:mt-3 [&_h4]:hyphens-auto [&_h4]:break-words [&_h4]:text-justify [&_h4]:text-lg [&_h4]:font-bold",
            "[&_p]:mb-3 [&_p]:hyphens-auto [&_p]:break-words [&_p]:text-justify [&_p]:leading-relaxed",
            "[&_ul]:mb-3 [&_ul]:ml-6 [&_ul]:list-disc",
            "[&_ol]:mb-3 [&_ol]:ml-6 [&_ol]:list-decimal",
            "[&_li]:mb-1 [&_li]:hyphens-auto [&_li]:break-words [&_li]:text-justify",
            "[&_a]:break-all [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800",
            "[&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img]:shadow-sm",
            "[&_blockquote]:hyphens-auto [&_blockquote]:break-words [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:text-justify [&_blockquote]:italic [&_blockquote]:text-gray-600",
            "[&_pre]:overflow-x-auto [&_pre]:hyphens-none [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-lg [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm",
            "[&_code]:hyphens-none [&_code]:break-words [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
          )}
          style={{
            minHeight,
            hyphens: "auto",
            wordBreak: "break-word",
            WebkitHyphens: "auto",
            msHyphens: "auto",
            textAlign: "justify",
          }}
          onInput={handleInput}
          suppressContentEditableWarning={true}
          data-placeholder={placeholder}
        />
      </CardContent>
    </Card>
  );
}
