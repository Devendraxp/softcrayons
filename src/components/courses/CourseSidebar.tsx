"use client";

import { Filter } from "lucide-react";

interface Category {
    id: string;
    name: string;
    count: number;
}

interface CourseSidebarProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

export function CourseSidebar({
    categories,
    selectedCategory,
    onCategoryChange,
}: CourseSidebarProps) {
    return (
        <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-5">
                        <Filter className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold">Categories</h2>
                    </div>
                    <ul className="space-y-1.5">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onClick={() => onCategoryChange(category.id)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
                                        selectedCategory === category.id
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                >
                                    <span className="font-medium text-sm">
                                        {category.name}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${
                                            selectedCategory === category.id
                                                ? "bg-primary-foreground/20 text-primary-foreground"
                                                : "bg-muted-foreground/10"
                                        }`}
                                    >
                                        {category.count}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-2xl p-5 mt-4">
                    <h3 className="font-bold mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Courses</span>
                            <span className="font-semibold">10+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Students Enrolled</span>
                            <span className="font-semibold">5,000+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Avg. Completion</span>
                            <span className="font-semibold">92%</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}