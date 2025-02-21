'use client';
import UploadIcon from "@/components/UploadIcons";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Dropzone} from "@/components/DropZone";

export default function UploadForm() {

    const [isUploading,setIsUploading] = useState(false); // loading screen
    const router = useRouter();


    async function upload(e){
        e.preventDefault();
        console.log(e);
        const files = e.target.files;
        if(files.length > 0){
            const file = files[0];
            setIsUploading(true);  // loading screen set to true
            const res = await axios.postForm('/api/upload',{file,});  // upload
            setIsUploading(false);  // loading screen set to false
            const newName = res.data.newName;
            router.push('/'+newName);
        }
    }

    return (
        <>
            {/*loading screen*/}
            {isUploading && (
                <div className="bg-black/90 text-white fixed inset-0 flex items-center">
                    <div className="w-full text-center">
                        <h1 className="text-4xl mb-4">Uploading</h1>
                        <h2 className="text-xl">Please wait...</h2>
                    </div>
                </div>
            )}

            <label
                className="bg-black text-white py-4 px-8 rounded-md text-lg font-normal inline-flex gap-2 cursor-pointer">
                <UploadIcon/>
                <span>Upload Video</span>
                <input type="file" onChange={upload} className="hidden"/>
            </label>

            <div className={"hidden sm:hidden md:block mt-32 px-6 md:px-16 lg:px-16 sm:px-6"}>
                <Dropzone/>
            </div>
        </>
    )
}