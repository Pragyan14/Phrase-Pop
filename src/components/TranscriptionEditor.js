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