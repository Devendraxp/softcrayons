"use client";

import { useEffect, useState } from "react";
import { type Editor } from "@tiptap/react";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import {
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  ImagePlus,
  Quote,
  Undo,
  Redo,
  Minus,
  Link as LinkIcon,
  Unlink,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ToolbarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
};

// Use forwardRef to allow PopoverTrigger to work correctly - simplified as component
const ToolbarButton = ({ onClick, isActive, children, title, disabled }: ToolbarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-primary text-primary-foreground"
      )}
    >
      {children}
    </button>
  );
};

function ToolbarDivider() {
  return <div className="mx-1.5 h-6 w-px bg-border" />;
}

type EditorToolbarProps = {
  editor: Editor | null;
};

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [, setTick] = useState(0);
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  // Force re-render on editor updates
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      setTick((prev) => prev + 1);
    };

    editor.on("transaction", handleUpdate);
    editor.on("selectionUpdate", handleUpdate);

    return () => {
      editor.off("transaction", handleUpdate);
      editor.off("selectionUpdate", handleUpdate);
    };
  }, [editor]);

  // Update link URL state when selection changes
  useEffect(() => {
    if (editor && editor.isActive("link")) {
      setLinkUrl(editor.getAttributes("link").href);
    } else {
      setLinkUrl("");
    }
  }, [editor && editor.state.selection]);

  if (!editor) return null;

  const handleImageUpload = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    if (linkUrl === "") {
      unsetLink();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    setIsLinkPopoverOpen(false);
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkUrl("");
    setIsLinkPopoverOpen(false);
  };

  const setHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const highlightColors = [
    { name: "Orange", color: "#f97316", class: "bg-orange-500" },
    { name: "Soft Green", color: "#bbf7d0", class: "bg-green-200" },
    { name: "Navy Blue", color: "#1e3a8a", class: "bg-blue-900" },
    { name: "Soft Purple", color: "#ddd6fe", class: "bg-violet-200" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 p-2">
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Text styles */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>

      {/* Highlight Color Picker */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              editor.isActive("highlight") && "bg-primary text-primary-foreground"
            )}
            title="Highlight Color"
          >
            <Highlighter className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem onClick={() => editor.chain().focus().unsetHighlight().run()}>
            <div className="mr-2 h-4 w-4 rounded border bg-transparent" />
            None
          </DropdownMenuItem>
          {highlightColors.map((item) => (
            <DropdownMenuItem key={item.color} onClick={() => setHighlight(item.color)}>
              <div className={cn("mr-2 h-4 w-4 rounded border", item.class)} />
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ToolbarDivider />

      {/* Link */}
      <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              editor.isActive("link") && "bg-primary text-primary-foreground"
            )}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="start">
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="h-8"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setLink();
                }
              }}
            />
            <Button size="sm" onClick={setLink} className="h-8 px-3">
              <Check className="h-4 w-4" />
            </Button>
            {editor.isActive("link") && (
              <Button size="sm" variant="destructive" onClick={unsetLink} className="h-8 px-3">
                <Unlink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Blockquote */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      {/* Code block */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        title="Code Block"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      {/* Horizontal Rule */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Line"
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Image Upload via Cloudinary */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "blog_unsigned"}
        options={{
          folder: "blog-images",
          maxFiles: 1,
          resourceType: "image",
        }}
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
            handleImageUpload(result.info.secure_url as string);
          }
        }}
      >
        {({ open }) => (
          <ToolbarButton onClick={() => open()} title="Insert Image">
            <ImagePlus className="h-4 w-4" />
          </ToolbarButton>
        )}
      </CldUploadWidget>
    </div>
  );
}
