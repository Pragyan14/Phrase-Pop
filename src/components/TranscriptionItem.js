import {useState} from "react";

export default function TranscriptionItem({item}){
    const [startTime,setStartTime] = useState(item.start_time);
    const [endTime,setEndTime] = useState(item.end_time);
    const [content,setContent] = useState(item.content);
    return (
        <div className={"my-1 grid grid-cols-3 gap-1 items-center"}>
            <input
                value={startTime}
                className={"bg-white/20 rounded-md p-1"}
                onChange={e => setStartTime(e.target.value)}
            />
            <input
                value={endTime}
                className={"bg-white/20 rounded-md p-1"}
                onChange={e => setEndTime(e.target.value)}
            />
            <input
                value={content}
                className={"bg-white/20 rounded-md p-1"}
                onChange={e => setContent(e.target.value)}
            />
        </div>
    )
}