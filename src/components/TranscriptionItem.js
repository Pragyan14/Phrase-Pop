export default function TranscriptionItem({item,handleStartTimeChange,handleEndTimeChange,handleContentChange}){
    if(!item){
        return '';
    }
    return (
        <>
            <div className={"grid grid-cols-[1fr_1fr_2fr] gap-4 px-4 py-1 border-t items-center"}>
                <input
                    className={"w-full h-8 rounded-md"}
                    value={item.start_time}
                    onChange={handleStartTimeChange}
                />
                <input
                    className={"w-full h-8 rounded-md"}
                    value={item.end_time}
                    onChange={handleEndTimeChange}
                />
                <input
                    className={"w-full h-8 rounded-md"}
                    value={item.content}
                    onChange={handleContentChange}
                />
            </div>
        </>
    )
}