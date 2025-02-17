'use client';
import SparklesIcon from "@/components/SparklesIcon";
import {useEffect, useState, useRef} from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import {transcriptionItemToSrt} from "@/lib/awsTranscriptionHelper";
import roboto from "./../fonts/Roboto-Regular.ttf"
import robotoBold from "./../fonts/Roboto-Bold.ttf"


export default function ResultVideo({filename,transciptionItems}){
    const videoUrl = `https://phrase-pop.s3.amazonaws.com/${filename}`;
    const [primaryColor,setPrimaryColor] = useState("#FFFFFF");
    const [outlineColor,setOutlineColor] = useState("#000000");
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

    function toFfmpegColor(rgb){
        const bgr = `&H${rgb.slice(5,7)}${rgb.slice(3,5)}${rgb.slice(1,3)}&`;
        console.log(rgb, bgr)
        return bgr;
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
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,Italic=1,FontSize=30,MarginV=100,PrimaryColour=${toFfmpegColor(primaryColor)},OutlineColour=${toFfmpegColor(outlineColor)}'`,
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
            <div>
                Primary color:
                <input
                    type={"color"}
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className={"bg-transparent border-black"}
                />
                <br/>
                Outline color:
                <input
                    type={"color"}
                    value={outlineColor}
                    onChange={e => setOutlineColor(e.target.value)}
                    className={"bg-transparent border-black"}
                />

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