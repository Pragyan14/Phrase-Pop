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

        <>
            <div className="container my-28 px-6 md:px-16 lg:px-16 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Caption Editor</h2>
                        </div>

                        <div className="border rounded-lg max-h-[500px] overflow-y-auto">
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

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Video Previews with 9:16 aspect ratio */}
                            <div className="relative bg-slate-900 rounded-lg aspect-[9/16] flex items-center justify-center">
                                <ResultVideo
                                    filename={filename}
                                    transcriptionItems={awsTranscriptionItems}
                                />
                            </div>
                            <div
                                className="relative bg-slate-900 rounded-lg aspect-[9/16] flex items-center justify-center">
                                <span className="text-white">Caption Preview</span>
                            </div>
                        </div>

                        <div className="space-y-6 border-gray-600 border-2 p-4 rounded-lg ">
                            <h3 className="text-xl font-semibold">Caption Customization</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <ColorInput label="Primary Color" value={"#000"}/>
                                </div>

                                <div className="space-y-2">
                                    <Select
                                        label="Font size"
                                        placeholder="Pick value"
                                        value={"12px"}
                                        // onChange={setFontSize}
                                        data={['16pt', '18pt', '24pt', '32pt']}
                                    />
                                </div>

                            </div>

                            <button className="w-full rounded-lg bg-black text-white h-12 text-center">
                                {/*<Upload className="w-4 h-4 mr-2"/>*/}
                                Apply Captions
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/*<div>*/}
            {/*    <div className={"h-[56rem] mt-28 px-6 md:px-16 lg:px-16 sm:px-6"}>*/}

            {/*        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-5">*/}

            {/*            <div*/}
            {/*                className="overflow-y-scroll h-[49rem] border-2 border-gray-200 round row-span-1 sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-6">*/}
            {/*                <div className={"p-4 pb-2 sticky top-0 bg-white"}>*/}
            {/*                    <h3 className={"text-xl"}>Caption Editor</h3>*/}
            {/*                    <div className={"mt-6 grid grid-cols-3 gap-4 font-bold text-lg"}>*/}
            {/*                        <div>Start Time</div>*/}
            {/*                        <div>End Time</div>*/}
            {/*                        <div>Content</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className={"px-4"}>*/}
            {/*                    <TranscriptionEditor*/}
            {/*                        awsTranscriptionItems={awsTranscriptionItems}*/}
            {/*                        setAwsTranscriptionItems={setAwsTranscriptionItems}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <ResultVideo*/}
            {/*                filename={filename}*/}
            {/*                transcriptionItems={awsTranscriptionItems}*/}
            {/*            />*/}

            {/*            <CaptionTrial*/}
            {/*                primaryColor={primaryColor}*/}
            {/*                fontSize={fontSize}*/}
            {/*            />*/}

            {/*            <CaptionCustomizer*/}
            {/*                primaryColor={primaryColor}*/}
            {/*                setPrimaryColor={setPrimaryColor}*/}
            {/*                fontSize={fontSize}*/}
            {/*                setFontSize={setFontSize}*/}
            {/*            />*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

    )
}