'use client';
import UploadIcon from "@/components/UploadIcons";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Dropzone} from "@/components/DropZone";
import {Loader} from "@mantine/core";

export default function UploadForm() {

    const [isUploading,setIsUploading] = useState(false);

    const router = useRouter();

    const [isError, setIsError] = useState(false);

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

    async function upload(file){
        setIsUploading(true);  // loading screen set to true
        const res = await axios.postForm('/api/upload',{file,});  // upload
        setIsUploading(false);  // loading screen set to false
        const newName = res.data.newName;
        router.push('/'+newName);
    }

    return (
        <>
            {isUploading && (
                <div className="text-white bg-black/90 fixed inset-0 flex justify-center items-center z-[1000]">
                    <Loader color="white" size="xl" type="bars" />
                </div>
            )}

            <label
                className="bg-black text-white py-4 px-8 rounded-md text-lg font-normal inline-flex gap-2 cursor-pointer transition duration-300 ease-in-out transform hover: hover:scale-105">
                <UploadIcon/>
                <span>Upload Video</span>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="video/mp4"
                    className="hidden"
                />
            </label>
            {isError && <p className="text-sm text-red-500">Max size: 10MB</p>}

            <div className={"hidden sm:hidden md:block mt-32 px-6 md:px-16 lg:px-16 sm:px-6"}>
                <Dropzone onFileSelect={upload}/>
            </div>
        </>
    )
}