"use client"

import Link from "next/link"
import Image from "next/image"

export function Navbar() {
    return (
        <header className="glass fixed top-0 z-50 w-full"
            style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 md:px-10">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] flex items-center justify-center">
                        <Image src="/logo.png" alt="PhrasePop logo" width={18} height={18} className="invert" />
                    </div>
                    <span className="text-lg font-semibold text-[#1e1b4b]">PhrasePop</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-6">
                    {/* Nav links — hidden on mobile */}
                    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
                        <Link href="#features" className="hover:text-gray-800 transition-colors">Features</Link>
                        <Link href="#" className="hover:text-gray-800 transition-colors">Docs</Link>
                    </nav>

                    {/* Button — always visible */}
                    <a href="#upload"
                       className="bg-[#4f46e5] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#4338ca] transition-colors whitespace-nowrap">
                        Get started
                    </a>
                </div>

            </div>
        </header>
    )
}