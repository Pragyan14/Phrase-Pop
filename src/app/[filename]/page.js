'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {clearTranscriptionItems} from "@/lib/awsTranscriptionHelper";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import {CaptionTrial} from "@/components/CaptionTrial";
import {CaptionCustomizer} from "@/components/CaptionCustomizer";
import {ColorInput, Select} from "@mantine/core";

export default function FilePage({params}){
    const {filename} = React.use(params);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [awsTranscriptionItems,setAwsTranscriptionItems] = useState([]);
    const [primaryColor,setPrimaryColor] = useState("#FFFFFF");
    const [fontSize,setFontSize] = useState("24pt");

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
            <div className={"h-[56rem] mt-28 px-6 md:px-16 lg:px-16 sm:px-6"}>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-5">

                    <div className="overflow-y-scroll h-[49rem] border-2 border-gray-200 round row-span-1 sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-6">
                        <div className={"p-4 pb-2 sticky top-0 bg-white"}>
                            <h3 className={"text-xl"}>Caption Editor</h3>
                            <div className={"mt-6 grid grid-cols-3 gap-4 font-bold text-lg"}>
                                <div>Start Time</div>
                                <div>End Time</div>
                                <div>Content</div>
                            </div>
                        </div>
                        <div className={"px-4"}>
                            <TranscriptionEditor
                                awsTranscriptionItems={awsTranscriptionItems}
                                setAwsTranscriptionItems={setAwsTranscriptionItems}
                            />
                        </div>
                    </div>

                    <ResultVideo
                        filename={filename}
                        transcriptionItems={awsTranscriptionItems}
                    />

                    <CaptionTrial
                        primaryColor={primaryColor}
                        fontSize={fontSize}
                    />

                    <CaptionCustomizer
                        primaryColor={primaryColor}
                        setPrimaryColor={setPrimaryColor}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                    />

                </div>
            </div>
        </div>
    )
}