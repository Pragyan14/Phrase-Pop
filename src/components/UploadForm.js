'use client';
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropzone } from "@/components/DropZone";
import { Loader } from "@mantine/core";

export default function UploadForm() {

    const [isUploading, setIsUploading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [statusText, setStatusText] = useState('');
    const router = useRouter();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                setIsError(true);
                e.target.value = '';
            } else {
                setIsError(false);
                upload(file);
            }
        }
    }

    async function trimVideo(file) {
        setStatusText('Loading FFmpeg...');

        const { FFmpeg } = await import('@ffmpeg/ffmpeg');
        const { fetchFile, toBlobURL } = await import('@ffmpeg/util');

        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpeg = new FFmpeg();

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        setStatusText('Trimming video to 15 seconds...');

        const inputName = 'input.' + file.name.split('.').pop();
        await ffmpeg.writeFile(inputName, await fetchFile(file));

        await ffmpeg.exec([
            '-i', inputName,
            '-t', '15',          // trim to 15 seconds
            '-c', 'copy',        // no re-encoding, very fast
            'trimmed.mp4'
        ]);

        const data = await ffmpeg.readFile('trimmed.mp4');
        return new File(
            [data.buffer],
            'trimmed.mp4',
            { type: 'video/mp4' }
        );
    }

    async function upload(file) {
        setIsUploading(true);
        try {
            const trimmedFile = await trimVideo(file);
            setStatusText('Uploading...');
            const res = await axios.postForm('/api/upload', { file: trimmedFile });
            const newName = res.data.newName;
            router.push('/' + newName);
        } catch (err) {
            console.error('Error processing video:', err);
            setIsError(true);
            setIsUploading(false);
            setStatusText('');
        }
    }

    return (
        <>
            {isUploading && (
                <div className="text-white bg-black/90 fixed inset-0 flex justify-center items-center z-[1000]">
                    <Loader color="white" size="xl" type="bars" />
                </div>
            )}

            {/* Upload button */}
            {/* <div className="flex flex-col items-center mb-4">
                <label className="bg-[#4f46e5] text-white py-3.5 px-8 rounded-xl text-base font-medium inline-flex gap-2 cursor-pointer transition duration-200 hover:scale-105 hover:bg-[#4338ca]">
                    <UploadIcon />
                    <span>Upload Video</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="video/mp4"
                        className="hidden"
                    />
                </label>
                {isError && <p className="text-xs text-red-500 mt-2">Max size: 10MB</p>}
            </div> */}

            {/* Dropzone — desktop only */}
            <div className="md:block">
                <Dropzone onFileSelect={upload} />
            </div>
        </>
    )
}