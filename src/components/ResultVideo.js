'use client';
import React, {useEffect, useRef, useState} from "react";
import {FFmpeg} from '@ffmpeg/ffmpeg';
import {fetchFile, toBlobURL} from '@ffmpeg/util';
import {transcriptionItemToSrt} from "@/lib/awsTranscriptionHelper";
import roboto from "./../fonts/Roboto-Regular.ttf"
import robotoBold from "./../fonts/Roboto-Bold.ttf"
import {Progress} from '@mantine/core';
import {CaptionCustomizer} from "@/components/CaptionCustomizer";
import {CaptionPreview} from "@/components/CaptionPreview";


export default function ResultVideo({filename,transcriptionItems}){
    const videoUrl = `https://phrase-pop.s3.amazonaws.com/${filename}`;
    const [primaryColor,setPrimaryColor] = useState("#FFFFFF");
    const [outlineColor,setOutlineColor] = useState("#000000");
    const [fontSize,setFontSize] = useState("24pt");
    const [previewBgColor,setPreviewBgColor] = useState("#0f172a");
    const [progress,setProgress] = useState(1);
    const [videoSrc,setVideoSrc] = useState('0');
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(null);
    const videoRef = useRef(null);
    const messageRef = useRef(null);

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            videoRef.current.src = videoUrl;
            load();
        }
    },[])

    const load = async () => {
        if (typeof window === 'undefined') return;

        const { FFmpeg } = await import('@ffmpeg/ffmpeg');
        const { fetchFile, toBlobURL } = await import('@ffmpeg/util');

        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }

    function toFfmpegColor(rgb){
        return `&H${rgb.slice(5, 7)}${rgb.slice(3, 5)}${rgb.slice(1, 3)}&`;
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        const srt = transcriptionItemToSrt(transcriptionItems)
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile("subs.srt",srt);
        const duration = videoRef.current.duration;
        ffmpeg.on('log', ({ message }) => {
            const regResult = /time=([0-9:.]+)/.exec(message);
            if(regResult && regResult?.[1]){
                const howMuchIsDone = regResult?.[1];
                const [hours,minutes,seconds] = howMuchIsDone.split(":");
                const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
                const videoProgress = doneTotalSeconds / duration;
                setProgress(videoProgress);
            }
        });
        await ffmpeg.exec([
            '-i', filename,
            '-preset','ultrafast',
            // '-to', '00:00:05',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,FontSize=${fontSize.slice(0,2)},MarginV=64,PrimaryColour=${toFfmpegColor(primaryColor)},OutlineColour=${toFfmpegColor(outlineColor)}'`,
            'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        setProgress(1);
    }

    return(
        <>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="relative bg-slate-900 rounded-lg aspect-[9/16] flex items-center justify-center">
                        <div
                            className={"row-span-1 aspect-[9/16] sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-4"}>
                            <video className={"rounded-lg"}
                                   data-video={0}
                                   ref={videoRef}
                                   controls
                            />

                        </div>
                    </div>

                    <div>
                        <CaptionPreview
                            primaryColor={primaryColor}
                            fontSize={fontSize}
                            previewBgColor={previewBgColor}
                            outlineColor={outlineColor}
                        />
                    </div>
                </div>

                {progress && progress < 1 && (
                    <div>
                        <Progress color="#639CD9" value={Math.floor(progress * 100)} radius="lg" size="xl" striped animated/>
                    </div>
                )}

                <CaptionCustomizer
                    fontSize={fontSize}
                    primaryColor={primaryColor}
                    setFontSize={setFontSize}
                    setPrimaryColor={setPrimaryColor}
                    previewBgColor={previewBgColor}
                    setPreviewBgColor={setPreviewBgColor}
                    outlineColor={outlineColor}
                    setOutlineColor={setOutlineColor}
                    transcode={transcode}
                />

            </div>

        </>
    )
}