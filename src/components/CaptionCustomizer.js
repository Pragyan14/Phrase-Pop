'use client'
import {ColorInput, Select} from "@mantine/core";
import React from "react";

export function CaptionCustomizer({primaryColor,setPrimaryColor,fontSize,setFontSize,transcode}){

    return (
        <>
            <div className="space-y-6 border p-4 rounded-lg ">
                <h3 className="text-xl font-semibold">Caption Customization</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <ColorInput label="Primary Color" value={primaryColor} onChange={setPrimaryColor}/>
                    </div>

                    <div className="space-y-2">
                        <ColorInput label="Outline Color" value={primaryColor} onChange={setPrimaryColor}/>
                    </div>

                    <div className="space-y-2">
                        <ColorInput label="Background Color" value={primaryColor} onChange={setPrimaryColor}/>
                    </div>

                    <div className="space-y-2">
                        <Select
                            label="Font size"
                            placeholder="Pick value"
                            value={fontSize}
                            onChange={setFontSize}
                            data={['16pt', '18pt', '24pt', '32pt']}
                        />
                    </div>

                </div>

                <button
                    className="w-full rounded-lg bg-black text-white h-12 text-center"
                    onClick={transcode}
                >
                    Apply Captions
                </button>
            </div>
        </>
    )
}