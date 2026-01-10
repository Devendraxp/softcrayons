"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Courses", href: "/courses" },
	{ name: "Mentorship", href: "#mentorship" },
	{ name: "Community", href: "#community" },
	{ name: "About", href: "#about" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
			<div className="container mx-auto">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 group">
						<div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
							<Image
                                    src={theme === "dark" ? "/dark.svg" : "/light.svg"}
                                    alt="Soft Crayons Logo"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                />
						</div>
						<span className="text-xl font-bold tracking-tight">
							Soft <span className="text-gradient"> Crayons</span>
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm"
							>
								{link.name}
							</Link>
						))}
					</div>

					{/* Desktop Actions */}
					<div className="hidden md:flex items-center gap-4">
						<button
							onClick={toggleTheme}
							className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-200"
							aria-label="Toggle theme"
						>
							{theme === "dark" ? (
								<Sun className="w-5 h-5" />
							) : (
								<Moon className="w-5 h-5" />
							)}
						</button>
						<Button variant="default" size="default">
							Join Now
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<div className="flex items-center gap-2 md:hidden">
						<button
							onClick={toggleTheme}
							className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
							aria-label="Toggle theme"
						>
							{theme === "dark" ? (
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
					isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				)}
			>
				<div className="container py-4 space-y-2">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className="block px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors font-medium"
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
