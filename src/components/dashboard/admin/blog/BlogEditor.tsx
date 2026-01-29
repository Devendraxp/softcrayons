"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import EditorToolbar from "./EditorToolbar";
import CodeBlockComponent from "./CodeBlockComponent";

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

type BlogEditorProps = {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
};

export default function BlogEditor({
  content,
  onChange,
  placeholder = "Start writing your blog content...",
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      ImageResize.configure({
        allowBase64: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "code-block",
        },
      }).extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap prose-editor",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="blog-editor overflow-hidden rounded-lg border border-border bg-card">
      <EditorToolbar editor={editor} />
      <div className="min-h-[400px] p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
