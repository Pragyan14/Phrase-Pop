export function CaptionPreview({primaryColor,fontSize,previewBgColor,outlineColor}){

    let textShadow = `-1px -1px 0 ${outlineColor},\n` + `1px -1px 0 ${outlineColor},\n` + `-1px 1px 0 ${outlineColor},\n` + `1px 1px 0 ${outlineColor}`;

    return(
        <>
            <div
                className="bg-red-400 rounded-lg aspect-[9/16] row-span-1 sm:col-start-4 sm:col-end-5 sm:row-start-1 sm:row-end-4 relative"
                style={{background:previewBgColor}}
            >
                <div
                    className={"-translate-x-1/2 left-1/2 absolute bottom-16 sm:bottom-24 md:bottom-28"}
                     style={{color: primaryColor, fontSize: fontSize, textShadow: textShadow}}
                >
                    Dummy
                </div>
            </div>
        </>
    )
}