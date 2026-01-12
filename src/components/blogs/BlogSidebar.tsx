"use client";

import { cn } from "@/lib/utils";

interface Category {
    id: string;
    name: string;
    count: number;
}

interface BlogSidebarProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function BlogSidebar({
    categories,
    selectedCategory,
    onCategoryChange,
}: BlogSidebarProps) {
    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-4">
                <h3 className="font-semibold text-lg mb-4 px-2">Categories</h3>
                <nav className="space-y-1">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                selectedCategory === category.id
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            <span>{category.name}</span>
                            <span
                                className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    selectedCategory === category.id
                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                {category.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}