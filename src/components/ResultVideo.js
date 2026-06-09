'use client';
import React, { useEffect, useRef, useState } from "react";
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { transcriptionItemToSrt } from "@/lib/awsTranscriptionHelper";
import roboto from "./../fonts/Roboto-Regular.ttf";
import robotoBold from "./../fonts/Roboto-Bold.ttf";
import notoSans from "./../fonts/NotoSans-Regular.ttf"
import { CaptionCustomizer } from "@/components/CaptionCustomizer";

export default function ResultVideo({ filename, transcriptionItems }) {
    const videoUrl = `https://phrase-pop.s3.amazonaws.com/${filename}`;
    const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
    const [outlineColor, setOutlineColor] = useState("#000000");
    const [fontSize, setFontSize] = useState("24pt");
    const [previewBgColor, setPreviewBgColor] = useState("#0f172a");
    const [progress, setProgress] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const [isPortrait, setIsPortrait] = useState(null);
    const [videoDimensions, setVideoDimensions] = useState(null); // { width, height }
    const ffmpegRef = useRef(null);
    const hiddenVideoRef = useRef(null); // only for detection
    const displayVideoRef = useRef(null); // shown to user

    useEffect(() => {
        load();
    }, []);

    // Use loadeddata (not loadedmetadata) — dimensions are reliable here
    const handleVideoData = () => {
        const video = hiddenVideoRef.current;
        if (!video) return;
        const w = video.videoWidth;
        const h = video.videoHeight;
        if (w > 0 && h > 0) {
            setIsPortrait(h > w);
            setVideoDimensions({ width: w, height: h });
        }
    };

    const load = async () => {
        if (typeof window === 'undefined') return;
        const { FFmpeg } = await import('@ffmpeg/ffmpeg');
        const { fetchFile, toBlobURL } = await import('@ffmpeg/util');
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        await ffmpeg.writeFile('/tmp/noto.ttf', await fetchFile(notoSans));
        setLoaded(true);
    };

    function toFfmpegColor(rgb) {
        return `&H${rgb.slice(5, 7)}${rgb.slice(3, 5)}${rgb.slice(1, 3)}&`;
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        const srt = transcriptionItemToSrt(transcriptionItems);
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile("subs.srt", srt);
        const duration = displayVideoRef.current.duration;
        ffmpeg.on('log', ({ message }) => {
            const regResult = /time=([0-9:.]+)/.exec(message);
            if (regResult?.[1]) {
                const [hours, minutes, seconds] = regResult[1].split(":");
                const doneTotalSeconds = hours * 3600 + minutes * 60 + +seconds;
                setProgress(doneTotalSeconds / duration);
            }
        });
        await ffmpeg.exec([
            '-i', filename,
            '-preset', 'ultrafast',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Noto Sans,FontSize=${(fontSize.slice(0, 2)) - 8},MarginV=12,PrimaryColour=${toFfmpegColor(primaryColor)},OutlineColour=${toFfmpegColor(outlineColor)}'`,
            'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        displayVideoRef.current.src = URL.createObjectURL(
            new Blob([data.buffer], { type: 'video/mp4' })
        );
        setProgress(1);
    };

    const glassCard = {
        background: 'rgba(255,255,255,0.42)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.65)',
        borderRadius: '16px',
        padding: '16px',
    };

    const sectionLabel = "text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3";

    const customizerProps = {
        fontSize, primaryColor, setFontSize, setPrimaryColor,
        previewBgColor, setPreviewBgColor,
        outlineColor, setOutlineColor,
        transcode, loaded, progress,
    };

    // Compute aspect ratio from actual video dimensions
    const aspectRatio = videoDimensions
        ? `${videoDimensions.width} / ${videoDimensions.height}`
        : (isPortrait ? '9/16' : '16/9');

    // Hidden probe video — always mounted, never visible
    const hiddenVideo = (
        <video
            ref={hiddenVideoRef}
            src={videoUrl}
            onLoadedData={handleVideoData}
            onLoadedMetadata={handleVideoData}
            className="hidden"
            muted
            playsInline
            preload="metadata"
        />
    );

    // Display video element
    const displayVideo = (
        <video
            ref={displayVideoRef}
            src={videoUrl}
            controls
            className="w-full rounded-xl block"
            style={{ background: '#0f172a', aspectRatio }}
            preload="metadata"
        />
    );

    // Preview with matching aspect ratio
    const preview = (
        <div
            className="w-full rounded-xl relative overflow-hidden"
            style={{ background: previewBgColor, aspectRatio }}
        >
            <div
                className="absolute left-1/2 -translate-x-1/2 bottom-8 whitespace-nowrap"
                style={{
                    color: primaryColor,
                    fontSize: fontSize,
                    textShadow: [
                        `-1px -1px 0 ${outlineColor}`,
                        `1px -1px 0 ${outlineColor}`,
                        `-1px 1px 0 ${outlineColor}`,
                        `1px 1px 0 ${outlineColor}`,
                    ].join(', '),
                }}
            >
                Caption text here
            </div>
        </div>
    );

    return (
        <div>
            {hiddenVideo}

            {/* Loading */}
            {isPortrait === null && (
                <div style={glassCard} className="flex items-center justify-center h-48">
                    <p className="text-sm text-gray-400">Detecting video orientation...</p>
                </div>
            )}

            <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div style={glassCard}>
                        <p className={sectionLabel}>Original</p>
                        {displayVideo}
                    </div>
                    <div style={glassCard}>
                        <p className={sectionLabel}>Caption preview</p>
                        {preview}
                    </div>
                </div>
                <div style={glassCard}>
                    <CaptionCustomizer {...customizerProps} landscape />
                </div>
            </div>

        </div>
    );
}