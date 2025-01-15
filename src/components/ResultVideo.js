import SparklesIcon from "@/components/SparklesIcon";

export default function ResultVideo({filename}){
    return(
        <>
            <div className={"mb-4"}>

                <video
                    controls
                    src={`https://phrase-pop.s3.amazonaws.com/${filename}`}
                />
            </div>
            <div>
                <button className={"bg-green-400 py-2 px-6 rounded-full inline-flex gap-2 cursor-pointer"}>
                    <SparklesIcon/>
                    Apply Caption
                </button>
            </div>
        </>
    )
}