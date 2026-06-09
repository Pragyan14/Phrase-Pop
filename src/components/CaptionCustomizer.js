'use client';
import { ColorInput, Select } from "@mantine/core";
import { Progress } from "@mantine/core";
import React from "react";

export function CaptionCustomizer({
    primaryColor, setPrimaryColor,
    fontSize, setFontSize,
    previewBgColor, setPreviewBgColor,
    transcode,
    outlineColor, setOutlineColor,
    loaded,
    progress,
    landscape = false,
}) {
    return (
        <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Caption customization
            </p>

            <div className={`grid gap-5 ${landscape ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'}`}>
                <div>
                    <ColorInput
                        label="Primary color"
                        value={primaryColor}
                        onChange={setPrimaryColor}
                        styles={{ label: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' } }}
                    />
                </div>
                <div>
                    <ColorInput
                        label="Outline color"
                        value={outlineColor}
                        onChange={setOutlineColor}
                        styles={{ label: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' } }}
                    />
                </div>
                <div>
                    <ColorInput
                        label="Preview background"
                        value={previewBgColor}
                        onChange={setPreviewBgColor}
                        styles={{ label: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' } }}
                    />
                </div>
                <div>
                    <Select
                        label="Font size"
                        value={fontSize}
                        onChange={setFontSize}
                        data={['16pt', '18pt', '24pt', '32pt']}
                        styles={{ label: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' } }}
                    />
                </div>
            </div>

            {/* Progress bar — only visible while processing */}
            {progress < 1 && (
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-gray-500">Applying captions...</span>
                        <span className="text-xs font-medium text-indigo-600">{Math.floor(progress * 100)}%</span>
                    </div>
                    <Progress
                        color="#4f46e5"
                        value={Math.floor(progress * 100)}
                        radius="xl"
                        size="sm"
                        striped
                        animated
                    />
                </div>
            )}

            <button
                onClick={transcode}
                disabled={!loaded}
                className="w-full rounded-xl py-3 text-sm font-medium transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:scale-[1.01] active:scale-[0.99]"
                style={{
                    background: loaded ? '#4f46e5' : '#9ca3af',
                    color: '#fff',
                }}
            >
                {loaded ? 'Apply captions' : 'Loading FFmpeg...'}
            </button>
        </div>
    );
}