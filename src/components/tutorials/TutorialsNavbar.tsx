"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Search, Menu, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TutorialSearch } from "@/components/tutorials/TutorialSearch";

type FeaturedTopic = {
  title: string;
  slug: string;
};

type TutorialsNavbarProps = {
  featuredTopics?: FeaturedTopic[];
};

export function TutorialsNavbar({ featuredTopics = [] }: TutorialsNavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();
	const { data: session } = useSession();

	const pathParts = pathname?.split("/").filter(Boolean) ?? [];
	const activeTopicSlug = pathParts[0] === "tutorials" ? pathParts[1] ?? null : null;
	const isTopicActive = (slug: string) => activeTopicSlug === slug;

	const [searchOpen, setSearchOpen] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	// Close menu on path change
	useEffect(() => {
		setIsOpen(false);
        setSearchOpen(false);
	}, [pathname]);

	// Handle click outside and scroll to close search
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setSearchOpen(false);
			}
		};
		const handleScroll = () => {
			if (searchOpen) setSearchOpen(false);
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [searchOpen]);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
			<div className="mx-auto w-full px-2 sm:px-3 lg:px-4 2xl:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/tutorials" className="flex items-center shrink-0">
					<div className="flex items-center shrink-0">
                            <div className="h-8 md:h-7 flex items-center">
                                <Image
                                    src="https://i.ibb.co/tphyBYTY/sc-logo.png"
                                    alt="Soft Crayons Logo"
                                    width={180}
                                    height={50}
                                    className="h-full w-auto object-contain"
                                    priority
                                />
                            </div>
						<span className="mx-3 text-2xl font-light text-foreground/70 dark:text-muted-foreground select-none">|</span>
                            <span className="text-xl md:text-2xl font-bold tracking-tight text-primary transition-colors group-hover:text-primary/80">
                                Tutorials
                            </span>
                            <span className="text-[10px] md:text-[11px] font-bold text-[#f97316] mb-0.5 md:mb-1 tracking-wider">
                                BETA v0.1
                            </span>
					</div>
                    </Link>

					{/* Middle: Featured Topics */}
					<div className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-6">
						{featuredTopics.slice(0, 4).map((topic) => (
							<Link
								key={topic.slug}
								href={`/tutorials/${topic.slug}`}
								className={cn(
									"transition-colors duration-200 font-medium text-sm",
									isTopicActive(topic.slug)
										? "text-primary font-semibold"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								{topic.title}
							</Link>
						))}
					</div>

                    {/* Right Actions */}
					<div className="hidden md:flex items-center gap-3 shrink-0">
						<div className="relative flex items-center" ref={searchRef}>
							<div className={cn(
								"flex items-center transition-all duration-300 rounded-full bg-muted/20",
								searchOpen ? "w-64 lg:w-72 bg-muted/40" : "w-10 hover:bg-muted/50"
							)}>
								<button
                                    onClick={() => setSearchOpen(!searchOpen)}
									className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0"
									aria-label="Search"
								>
									<Search className="w-5 h-5 text-muted-foreground" />
								</button>
								{searchOpen && (
                                    <div className="flex-1 min-w-0 pr-2">
                                        <TutorialSearch variant="navbar" />
                                    </div>
								)}
							</div>
						</div>

						<button
							onClick={toggleTheme}
							className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-200"
							aria-label="Toggle theme"
						>
							{mounted && theme === "dark" ? (
								<Sun className="w-5 h-5" />
							) : (
								<Moon className="w-5 h-5" />
							)}
						</button>

						<Link href="/query" passHref>
							<Button variant="default" size="lg" className="hidden lg:flex">
								Take Admission
							</Button>
						</Link>

						{session?.user ? (
							<Link href="/dashboard" passHref>
								<Button variant="outline" size="lg" className="flex items-center gap-2">
									{session.user.image ? (
										<Image
											src={session.user.image}
											alt={session.user.name || "Profile"}
											width={24}
											height={24}
											className="w-6 h-6 rounded-full object-cover"
										/>
									) : (
										<span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
											{session.user.name?.charAt(0).toUpperCase() || "U"}
										</span>
									)}
									Dashboard
								</Button>
							</Link>
						) : (
							<Link href="/sign-in" passHref>
								<Button variant="outline" size="lg">
									Log In
								</Button>
							</Link>
						)}

						<Link
							href="/"
							className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-[10px] hover:bg-muted transition-colors ml-2"
						>
							<span className="text-sm font-semibold text-muted-foreground">Back to Home</span>
						</Link>
					</div>

                    {/* Mobile Toggle */}
					<div className="flex items-center gap-2 md:hidden ml-auto">
						<button
							onClick={toggleTheme}
							className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
							aria-label="Toggle theme"
						>
							{mounted && theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
						</button>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
							aria-label="Toggle menu"
						>
							{isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</button>
					</div>
				</div>
			</div>

            {/* Mobile Menu */}
			<div
				className={cn(
					"md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden",
					isOpen ? "max-h-[calc(100dvh-4rem)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
				)}
			>
				<div className="container py-4 space-y-4">
                    <div className="px-1 relative z-50">
                        <TutorialSearch />
                    </div>

                    <div className="space-y-1">
                        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Featured Topics
                        </div>
                        {featuredTopics.map((topic) => (
                            <Link
                                key={topic.slug}
                                href={`/tutorials/${topic.slug}`}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-4 py-3 rounded-lg transition-colors font-medium",
									isTopicActive(topic.slug)
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {topic.title}
                            </Link>
                        ))}
                    </div>

					<div className="px-4 pt-3 flex flex-col gap-2 border-t border-border">
						<Link href="/query" passHref onClick={() => setIsOpen(false)}>
							<Button variant="default" size="lg" className="w-full">
								Take Admission
							</Button>
						</Link>
						{session?.user ? (
							<Link href="/dashboard" passHref onClick={() => setIsOpen(false)}>
								<Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
									{session.user.image ? (
										<Image
											src={session.user.image}
											alt={session.user.name || "Profile"}
											width={24}
											height={24}
											className="w-6 h-6 rounded-full object-cover"
										/>
									) : (
										<span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
											{session.user.name?.charAt(0).toUpperCase() || "U"}
										</span>
									)}
									Dashboard
								</Button>
							</Link>
						) : (
							<Link href="/sign-in" passHref onClick={() => setIsOpen(false)}>
								<Button variant="outline" size="lg" className="w-full">
									Log In
								</Button>
							</Link>
						)}
                        <Link href="/" passHref onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" size="lg" className="w-full text-muted-foreground mt-2 border border-border">
                                Back to Home
                            </Button>
                        </Link>
					</div>
				</div>
			</div>
		</nav>
	);
}