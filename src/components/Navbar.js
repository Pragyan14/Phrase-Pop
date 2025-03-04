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
                    <div className="w-8">
                        <svg className="svg-inline--fa fa-closed-captioning" aria-hidden="true" focusable="false"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill="black"
                                  d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"></path>
                        </svg>
                    </div>
                    <span className="text-xl font-semibold">PhrasePop</span>
                </Link>

            </div>
        </header>
    )
}

