export default function TranscriptionItem({item,handleStartTimeChange,handleEndTimeChange,handleContentChange}){
    if(!item){
        return '';
    }
    return (
        <>
            <div className={"grid grid-cols-3 gap-1 items-center border-t-2 border-[#e5e7eb]"}>
                <input
                    value={item.start_time}
                    className={"bg-white/20 rounded-md p-1 py-2"}
                    onChange={handleStartTimeChange}
                />
                <input
                    value={item.end_time}
                    className={"bg-white/20 rounded-md p-1 py-2"}
                    onChange={handleEndTimeChange}
                />
                <input
                    value={item.content}
                    className={"bg-white/20 rounded-md p-1 py-2"}
                    onChange={handleContentChange}
                />
            </div>
        </>
    )
}