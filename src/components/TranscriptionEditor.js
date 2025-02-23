import TranscriptionItem from "@/components/TranscriptionItem";
import {useEffect} from "react";

export default function TranscriptionEditor({awsTranscriptionItems, setAwsTranscriptionItems}){

    const updateTranscriptionItem = (index, prop, e) => {
        setAwsTranscriptionItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, [prop]: e.target.value } : item
            )
        );
    };



    return(
        <>
            {/*<div className={"grid grid-cols-3 sticky top-0 bg-violet-800/80 rounded-md p-2"}>*/}
            {/*    <div>Start</div>*/}
            {/*    <div>End</div>*/}
            {/*    <div>Content</div>*/}
            {/*</div>*/}

            {awsTranscriptionItems.length > 0 && (
                <div>
                    { awsTranscriptionItems.map((item,key) => (
                        <div key={key}>
                            <TranscriptionItem
                                item = {item}
                                handleStartTimeChange={(e)=>{updateTranscriptionItem(key,'start_time',e)}}
                                handleEndTimeChange={(e)=>{updateTranscriptionItem(key,'end_time',e)}}
                                handleContentChange={(e)=>{updateTranscriptionItem(key,'content',e)}}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}