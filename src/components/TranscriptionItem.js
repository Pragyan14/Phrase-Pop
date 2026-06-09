export default function TranscriptionItem({ item, handleStartTimeChange, handleEndTimeChange, handleContentChange }) {
    if (!item) return null;

    return (
        <div className="grid grid-cols-[1fr_1fr_2fr] gap-3 px-5 py-2 border-b items-center"
             style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <input
                className="w-full h-8 rounded-lg px-2.5 text-sm text-gray-700 transition-all
                           focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                style={{ background: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(0,0,0,0.1)' }}
                value={item.start_time}
                onChange={handleStartTimeChange}
            />
            <input
                className="w-full h-8 rounded-lg px-2.5 text-sm text-gray-700 transition-all
                           focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                style={{ background: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(0,0,0,0.1)' }}
                value={item.end_time}
                onChange={handleEndTimeChange}
            />
            <input
                className="w-full h-8 rounded-lg px-2.5 text-sm text-gray-700 transition-all
                           focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                style={{ background: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(0,0,0,0.1)' }}
                value={item.content}
                onChange={handleContentChange}
            />
        </div>
    );
}