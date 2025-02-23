'use client'
import {ColorInput, Select} from "@mantine/core";

export function CaptionCustomizer({primaryColor,setPrimaryColor,fontSize,setFontSize}){

    return (
        <>
            <div
                className="p-4 h-[13rem] border-2 border-gray-200 round row-span-1 sm:col-start-3 sm:col-end-5 sm:row-start-4 sm:row-end-6">
                <h3 className={"text-xl mb-4"}>Caption Customization</h3>
                <div className={"grid grid-cols-2 gap-4 "}>

                    <ColorInput label="Primary Color" value={primaryColor} onChange={setPrimaryColor}/>

                    <Select
                        label="Font size"
                        placeholder="Pick value"
                        value={fontSize}
                        onChange={setFontSize}
                        data={['16pt', '18pt', '24pt', '32pt']}
                    />

                </div>
                <div>
                    <button className="w-full mt-4 rounded-lg bg-black text-white h-12 text-center">
                        {/*<Upload className="w-4 h-4 mr-2"/>*/}
                        Apply Captions
                    </button>
                </div>
            </div>
        </>
    )
}