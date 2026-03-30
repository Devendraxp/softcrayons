"use client";

import { useMemo, useState } from "react";
import { Check, Copy, List } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type TocItem = { id: string; text: string };

type ContentProps = {
  content: string | null;
  tableOfContent?: TocItem[] | null;
};

export function TutorialContent({ content, tableOfContent }: ContentProps) {
  const hasToc = Array.isArray(tableOfContent) && tableOfContent.length > 0;
  const parsedSegments = useMemo(() => parseContentSegments(content || ""), [content]);

  const containerClass = hasToc
    ? "grid gap-10 lg:grid-cols-[1fr_280px]"
    : "space-y-6";

  return (
    <div className={containerClass}>
      <article className="prose prose-slate max-w-none dark:prose-invert">
        {parsedSegments.map((segment, index) => {
          if (segment.type === "code") {
            return (
              <CodeBlock key={index} code={segment.code} language={segment.language} />
            );
          }
          return (
            <div key={index} dangerouslySetInnerHTML={{ __html: segment.html }} />
          );
        })}
      </article>

      {hasToc && (
        <aside className="rounded-xl border border-border bg-muted/50 p-4 text-sm shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground font-semibold uppercase tracking-wide">
            <List className="h-4 w-4" />
            Contents
          </div>
          <ul className="space-y-2">
            {tableOfContent!.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-md px-2 py-1 text-foreground hover:bg-primary/10"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

type ContentSegment =
  | { type: "html"; html: string }
  | { type: "code"; code: string; language: string };

function parseContentSegments(html: string): ContentSegment[] {
  if (!html) return [];

  const segments: ContentSegment[] = [];
  const codeBlockRegex = /<pre[^>]*>\s*<code(?:\s+class="language-([^"]*)")?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const htmlSegment = html.slice(lastIndex, match.index).trim();
      if (htmlSegment) segments.push({ type: "html", html: htmlSegment });
    }

    const rawCode = match[2]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/")
      .replace(/&nbsp;/g, " ")
      .replace(/\u00A0/g, " ");

    const cleanCode = rawCode.trim().replace(/^\n+|\n+$/g, "");

    segments.push({
      type: "code",
      code: cleanCode,
      language: match[1] || "plaintext",
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    const htmlSegment = html.slice(lastIndex).trim();
    if (htmlSegment) segments.push({ type: "html", html: htmlSegment });
  }

  if (segments.length === 0) {
    segments.push({ type: "html", html });
  }

  return segments;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const langLabel = language || "plaintext";

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>{langLabel}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={langLabel}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.9rem",
          padding: "0.9rem 1rem",
        }}
        showLineNumbers={false}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
