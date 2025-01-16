export default function TranscriptionItem({item,handleStartTimeChange,handleEndTimeChange,handleContentChange}){
    if(!item){
        return '';
    }
    return (
        <div className={"my-1 grid grid-cols-3 gap-1 items-center"}>
            <input
                value={item.start_time}
                className={"bg-white/20 rounded-md p-1"}
                onChange={handleStartTimeChange}
            />
            <input
                value={item.end_time}
                className={"bg-white/20 rounded-md p-1"}
                onChange={handleEndTimeChange}
            />
            <input
                value={item.content}
                className={"bg-white/20 rounded-md p-1"}
                onChange={handleContentChange}
            />
        </div>
    )
}