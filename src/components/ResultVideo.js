'use client';
import SparklesIcon from "@/components/SparklesIcon";
import {useEffect, useState, useRef} from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import {transcriptionItemToSrt} from "@/lib/awsTranscriptionHelper";
import roboto from "./../fonts/Roboto-Regular.ttf"
import robotoBold from "./../fonts/Roboto-Bold.ttf"

// processVideo();

export default function ResultVideo({filename,transciptionItems}){
    const videoUrl = `https://phrase-pop.s3.amazonaws.com/${filename}`;
    const [videoSrc,setVideoSrc] = useState('0');
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    const messageRef = useRef(null);

    useEffect(()=>{
        videoRef.current.src = videoUrl;
        load();
    },[])

    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        const srt = transcriptionItemToSrt(transciptionItems)
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile("subs.srt",srt);
        ffmpeg.on('log', ({ message }) => {
            // messageRef.current.innerHTML = message;
            console.log(message);
        });
        await ffmpeg.exec([
            '-i', filename,
            '-preset','ultrafast',
            '-to', '00:00:05',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,FontSize=30,MarginV=100,PrimaryColour=&HFFFFFF&,OutlineColour=&H0000FF&'`,
            'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
    }

    return(
        <>
            <div>
                <button
                    className={"bg-green-400 py-2 px-6 rounded-full inline-flex gap-2 cursor-pointer"}
                    onClick={transcode}
                >
                    <SparklesIcon/>
                    Apply Caption
                </button>
            </div>
            <div className={"mb-4"}>

                <video
                    data-video={0}
                    ref={videoRef}
                    controls
                />
            </div>
        </>
    )
}