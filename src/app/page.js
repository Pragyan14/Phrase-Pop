"use client"

import UploadForm from "@/components/UploadForm";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Languages, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <div>
            {/* ── Hero ── */}
            <section className="min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left — copy */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50/80 border border-indigo-200/60 rounded-full px-3 py-1 mb-5">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            AI-powered captions
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.15] text-[#1a1a2e] mb-5">
                            Enhance your reels<br />
                            with <span className="text-indigo-600">smart captions</span>
                        </h1>

                        <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                            PhrasePop automatically generates precise captions for your videos — ideal for content creators, educators, and businesses.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            {[
                                { icon: Languages, label: "30+ languages" },
                                { icon: Zap, label: "Minutes, not hours" },
                                { icon: ShieldCheck, label: "AWS-powered" },
                            ].map(({ icon: Icon, label }) => (
                                <span key={label}
                                    className="glass-light inline-flex items-center gap-1.5 text-sm text-gray-600 font-medium px-3 py-1.5 rounded-full">
                                    <Icon size={16} strokeWidth={1.75} />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — upload card */}
                    <div id="upload" className="w-full lg:w-[420px] flex-shrink-0">
                        <div className="glass rounded-2xl p-5 shadow-lg shadow-indigo-100/20">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-700">Upload your video</span>
                                <span className="text-xs text-gray-400 bg-gray-100/70 px-2.5 py-1 rounded-full">MP4 · Max 10MB</span>
                            </div>
                            <UploadForm />
                        </div>
                    </div>

                </div>
            </section>

            {/* ── Features ── */}
            <section id="features" className="pb-24">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
                    <h3 className="text-s font-semibold text-gray-400 tracking-widest text-center uppercase mb-10">
                        Why PhrasePop
                    </h3>
                    <FeaturesSection />
                </div>
            </section>
        </div>
    );
}