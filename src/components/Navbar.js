"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-16 lg:px-16 sm:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                        <span className="text-sm font-medium text-white">cc</span>
                    </div>
                    <span className="text-xl font-semibold">PhrasePop</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link href="/" className="text-base text-gray-900 transition-colors hover:text-gray-600">
                        Home
                    </Link>
                    <Link href="/about" className="text-base text-gray-900 transition-colors hover:text-gray-600">
                        About
                    </Link>
                    <Link href="/contact" className="text-base text-gray-900 transition-colors hover:text-gray-600">
                        Contact
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </button>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="absolute left-0 right-0 top-16 border-b border-gray-200 bg-white/70 backdrop-blur-sm md:hidden">
                        <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

