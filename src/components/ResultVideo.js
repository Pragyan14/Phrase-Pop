import SparklesIcon from "@/components/SparklesIcon";
import {useEffect, useState} from "react";

export default function ResultVideo({filename}){
    const [videoSrc,setVideoSrc] = useState('0');
    useEffect(()=>{
        setVideoSrc(`https://phrase-pop.s3.amazonaws.com/${filename}`);
    },[])
    return(
        <>
            <div className={"mb-4"}>

                <video
                    controls
                    // data-video={videoSrc}
                    src={`https://phrase-pop.s3.amazonaws.com/${filename}`}
                />
            </div>
            <div>
                <button className={"bg-green-400 py-2 px-6 rounded-full inline-flex gap-2 cursor-pointer"}>
                    <SparklesIcon/>
                    Apply Caption
                </button>
            </div>
        </>
    )
}