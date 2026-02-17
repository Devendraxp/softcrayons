"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Courses", href: "/courses" },
	{ name: "Placements", href: "/placements" },
	{ name: "Blogs", href: "/blogs" },
	{ name: "Reviews", href: "/reviews" },
	{ name: "FAQs", href: "/faqs" },
	{ name: "About Us", href: "/about-us" },
	{ name: "Faculties", href: "/faculties" },
	{ name: "Enterprise Hiring", href: "/enterprise" },
	{ name: "Join as an Instructor", href: "/instructor" },

	
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMoreOpen, setIsMoreOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const { data: session } = useSession();

	useEffect(() => {
		setMounted(true);
	}, []);

	const visibleLinks = navLinks.slice(0, 7);
	const moreLinks = navLinks.slice(7);

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsMoreOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
			<div className="mx-auto w-full px-2 sm:px-3 lg:px-4 2xl:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center shrink-0">
						<div className="h-6 sm:h-7 md:h-9">
							<Image
								src="https://i.ibb.co/tphyBYTY/sc-logo.png"
								alt="Soft Crayons Logo"
								width={120}
								height={36}
								className="h-full w-auto object-contain"
								priority
							/>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-9 ml-8 lg:ml-12">
						{visibleLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={cn(
									"transition-colors duration-200 font-medium text-sm",
									isActive(link.href)
										? "text-primary font-semibold"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								{link.name}
							</Link>
						))}

						{moreLinks.length > 0 && (
							<div className="relative" ref={dropdownRef}>
								<button
									onClick={() => setIsMoreOpen(!isMoreOpen)}
									className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm"
								>
									More
									<ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMoreOpen ? "rotate-180" : "")} />
								</button>

								{isMoreOpen && (
									<div className="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 focus:outline-none p-1 border border-border">
										<div className="py-1">
											{moreLinks.map((link) => (
												<Link
													key={link.name}
													href={link.href}
													onClick={() => setIsMoreOpen(false)}
													className={cn(
														"block px-4 py-2 text-sm rounded-sm",
														isActive(link.href)
															? "text-primary bg-primary/10 font-semibold"
															: "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
													)}
												>
													{link.name}
												</Link>
											))}
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Desktop Actions */}
					<div className="hidden md:flex items-center gap-4">
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
							<Button variant="default" size="lg">
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
					</div>

					{/* Mobile Menu Button */}
					<div className="flex items-center gap-2 md:hidden">
						<button
							onClick={toggleTheme}
							className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
							aria-label="Toggle theme"
						>
							{mounted && theme === "dark" ? (
								<Sun className="w-5 h-5" />
							) : (
								<Moon className="w-5 h-5" />
							)}
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
					isOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
				)}
			>
				<div className="container py-4 space-y-2">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className={cn(
								"block px-4 py-3 rounded-lg transition-colors font-medium",
								isActive(link.href)
									? "bg-primary/10 text-primary font-semibold"
									: "hover:bg-muted text-muted-foreground hover:text-foreground"
							)}
						>
							{link.name}
						</Link>
					))}
					<div className="px-4 pt-2">
						<Button variant="default" size="lg" className="w-full">
							Join Now
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
