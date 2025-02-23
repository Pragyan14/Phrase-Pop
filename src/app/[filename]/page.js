'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {clearTranscriptionItems} from "@/lib/awsTranscriptionHelper";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";

export default function FilePage({params}){
    const {filename} = React.use(params);
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

                    <TranscriptionEditor
                        awsTranscriptionItems={awsTranscriptionItems}
                        setAwsTranscriptionItems={setAwsTranscriptionItems}
                    />

                </div>
                <div>

                    <h2 className={"text-2xl text-white/60 mb-4 text-center"}>Result</h2>

                    <ResultVideo
                        filename={filename}
                        transciptionItems = {awsTranscriptionItems}
                    />

                </div>
            </div>
        </div>
    )
}