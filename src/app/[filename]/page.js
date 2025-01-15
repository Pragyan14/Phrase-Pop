'use client';
import {useEffect, useState} from "react";
import axios from "axios";
import {clearTranscriptionItems} from "@/lib/awsTranscriptionHelper";
import TranscriptionItem from "@/components/TranscriptionItem";
import SparklesIcon from "@/components/SparklesIcon";
import ResultVideo from "@/components/ResultVideo";

export default function FilePage({params}){
    const filename = params.filename;
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [awsTranscriptionItems,setAwsTranscriptionItems] = useState([]);

    useEffect(()=>{
        getTranscription();
    },[filename]);

    function getTranscription(){
        setIsFetching(true);
        axios.get('/api/transcribe?filename='+filename).then(response => {
            setIsFetching(false);
            const status = response.data?.status;
            const transcription = response.data?.transcription;

            if(status === "IN_PROGRESS"){
                setIsTranscribing(true);
                setTimeout(getTranscription,5000);
            }else {
                setIsTranscribing(false);

                setAwsTranscriptionItems(
                    clearTranscriptionItems(transcription.results.items) // removes punctuation(, . ?)
                );
            }
        });
    }

    if(isFetching){
        return(
            <div>Fetching your file...</div>
        )
    }

    if(isTranscribing){
        return(
            <div>Transcribing your file...</div>
        )
    }

    return(
        <div>
            {/*{filename}*/}
            {/*<div>is transcribing: {JSON.stringify(isTranscribing)}</div>*/}
            <div className={"grid grid-cols-2 gap-16"}>
                <div className={"max-w-xs"}>
                    <h2 className={"text-2xl text-white/60 mb-4 text-center"}>Transcription</h2>
                    <div className={"grid grid-cols-3 sticky top-0 bg-violet-800/80 rounded-md p-2"}>
                        <div>Start</div>
                        <div>End</div>
                        <div>Content</div>
                    </div>
                    {awsTranscriptionItems.length > 0 && awsTranscriptionItems.map(item => (
                        <TranscriptionItem item = {item}/>
                    ))}
                </div>
                <div>
                    <h2 className={"text-2xl text-white/60 mb-4 text-center"}>Result</h2>
                    <ResultVideo filename={filename}/>
                </div>
            </div>
        </div>
    )
}