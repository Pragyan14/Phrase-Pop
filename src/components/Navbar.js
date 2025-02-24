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

            </div>
        </header>
    )
}

