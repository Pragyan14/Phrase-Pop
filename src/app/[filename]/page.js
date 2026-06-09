'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { clearTranscriptionItems } from "@/lib/awsTranscriptionHelper";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import { Loader } from "@mantine/core";
import Image from "next/image";


export default function FilePage({ params }) {
    const { filename } = React.use(params);
    const [isFetching, setIsFetching] = useState(true);
    const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        getTranscription();
    }, [filename]);

    useEffect(() => {
        setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
    }, []);

    function getTranscription() {
    axios.get('/api/transcribe?filename=' + filename)
        .then(response => {
            const status = response.data?.status;
            const transcription = response.data?.transcription;
            if (status === "IN_PROGRESS") {
                setTimeout(getTranscription, 5000);
            } else {
                setIsFetching(false);
                setAwsTranscriptionItems(
                    clearTranscriptionItems(transcription.results.items)
                );
            }
        })
        .catch(err => {
            if (err.response?.status === 404) {
                setIsDeleted(true);
                setIsFetching(false);
            }
        });
}
    if (isFetching) {
        return (
            <div className="fixed inset-0 flex flex-col justify-center items-center z-[1000] gap-4"
                style={{ background: 'linear-gradient(135deg,#dde4ff 0%,#edfff6 45%,#f8f0ff 100%)' }}>
                <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] flex items-center justify-center">
                    <Image src="/logo.png" alt="PhrasePop logo" width={18} height={18} className="invert" />
                </div>
                <Loader color="#4f46e5" size="md" type="bars" />
                <p className="text-sm text-gray-500 font-medium">Transcribing your video...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-24 pb-16">

            {/* Page header */}
            <div className="flex items-center gap-3 mb-5">
                <h1 className="text-2xl font-semibold text-[#1a1a2e]">Caption editor</h1>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600
                     bg-indigo-50/80 border border-indigo-200/60 rounded-full px-3 py-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    {filename}
                </span>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-4"
                style={{ background: 'rgba(251,191,36,0.12)', border: '0.5px solid rgba(251,191,36,0.4)' }}>
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-amber-700 leading-relaxed">
                    This is a hobby project — your video was trimmed to the first <span className="font-semibold">15 seconds</span> before processing.
                    Captions are only available for that duration.
                </p>
            </div>

            {isMobile && (
                <div className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-4"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '0.5px solid rgba(239,68,68,0.3)' }}>
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-500 leading-relaxed">
                        You're on a mobile device — <span className="font-semibold">Apply captions</span> may be slow or crash due to browser memory limits. For best results, use a <span className="font-semibold">desktop browser</span>.
                    </p>
                </div>
            )}

            {/* ResultVideo handles the dynamic layout */}
            <ResultVideo
                filename={filename}
                transcriptionItems={awsTranscriptionItems}
            />

            {/* Caption editor table — always full width below */}
            <div className="mt-8 rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.42)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.65)' }}>

                {/* Table header */}
                <div className="grid grid-cols-[1fr_1fr_2fr] gap-4 px-5 py-3 font-medium text-sm text-gray-500 sticky top-0"
                    style={{ background: 'rgba(255,255,255,0.7)', borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
                    <div>Start time</div>
                    <div>End time</div>
                    <div>Content</div>
                </div>

                <div className="max-h-72 overflow-y-auto">
                    <TranscriptionEditor
                        awsTranscriptionItems={awsTranscriptionItems}
                        setAwsTranscriptionItems={setAwsTranscriptionItems}
                    />
                </div>
            </div>
        </div>
    );
}