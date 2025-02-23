export function CaptionTrial({primaryColor,fontSize}){
    return(
        <>
            <div className="bg-slate-900 text-white rounded-lg aspect-[9/16] flex top-28 justify-center row-span-1 sm:col-start-4 sm:col-end-5 sm:row-start-1 sm:row-end-4">
                {/*{primaryColor+"  "+fontSize}*/}
                <div className={"absolute bottom-40"} style={{color: primaryColor, fontSize: fontSize}}>
                    Dummy Caption
                </div>
            </div>
        </>
    )
}