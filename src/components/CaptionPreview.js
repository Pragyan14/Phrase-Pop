export function CaptionPreview({primaryColor,fontSize}){
    return(
        <>
            <div className="bg-slate-900 text-white rounded-lg aspect-[9/16] row-span-1 sm:col-start-4 sm:col-end-5 sm:row-start-1 sm:row-end-4 relative">
                <div className={"-translate-x-1/2 left-1/2 absolute text-outline bottom-16 sm:bottom-24 md:bottom-28"} style={{color: primaryColor, fontSize: fontSize}}>
                    Dummy
                </div>
            </div>
        </>
    )
}