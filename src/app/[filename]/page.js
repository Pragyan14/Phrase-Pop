'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {clearTranscriptionItems} from "@/lib/awsTranscriptionHelper";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import {CaptionCustomizer} from "@/components/CaptionCustomizer";
import {ColorInput, Loader, Select} from "@mantine/core";

export default function FilePage({params}){
    const {filename} = React.use(params);
    const [isFetching, setIsFetching] = useState(true);
    const [awsTranscriptionItems,setAwsTranscriptionItems] = useState([]);
    const [primaryColor,setPrimaryColor] = useState("#FFFFFF");
    const [fontSize,setFontSize] = useState("24pt");

    useEffect(()=>{
        getTranscription();
    },[filename]);

    function getTranscription(){
        axios.get('/api/transcribe?filename='+filename).then(response => {
            const status = response.data?.status;
            const transcription = response.data?.transcription;

            if(status === "IN_PROGRESS"){
                setTimeout(getTranscription,5000);
            }else {
                setIsFetching(false);

                setAwsTranscriptionItems(
                    clearTranscriptionItems(transcription.results.items) // removes punctuation(, . ?)
                );
            }
        });
    }

    if(isFetching){
        return(
            <div className="bg-white h-screen fixed inset-0 flex justify-center items-center z-[1000]">
                <Loader color="black" size="xl" type="bars" />
            </div>
        )
    }

    return(

        <>
            <div className="container my-28 px-6 md:px-16 lg:px-16 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Caption Editor</h2>
                        </div>

                        <div className="border rounded-lg max-h-[600px] overflow-y-auto md:max-h-[858px] sm:max-h-[600px]">
                            <div className="grid grid-cols-[1fr_1fr_2fr] gap-4 p-4 sticky top-0 bg-white font-medium min-w-0">
                                <div>Start Time</div>
                                <div>End Time</div>
                                <div>Content</div>
                            </div>

                            <div>
                                <TranscriptionEditor
                                    awsTranscriptionItems={awsTranscriptionItems}
                                    setAwsTranscriptionItems={setAwsTranscriptionItems}
                                />
                            </div>
                        </div>
                    </div>

                    <ResultVideo
                        filename={filename}
                        transcriptionItems={awsTranscriptionItems}
                    />
               </div>
            </div>

        </>

    )
}