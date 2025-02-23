'use client'
import { Trash2, Upload } from "lucide-react"
import {ColorInput, Select} from "@mantine/core";

export default function AboutPage(){

    const captions = ([
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
        { startTime: "00:00:01", endTime: "00:00:03", content: "Welcome to our video" },
        { startTime: "00:00:04", endTime: "00:00:06", content: "Today we'll discuss" },
    ])

    return(
        <>
            <div className="container my-28 px-6 md:px-16 lg:px-16 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Caption Editor</h2>
                        </div>

                        <div className="border rounded-lg">
                            <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-4 p-4 bg-muted font-medium">
                                <div>Start Time</div>
                                <div>End Time</div>
                                <div>Content</div>
                                <div></div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {captions.map((caption, index) => (
                                    <div key={index}
                                         className="grid grid-cols-[1fr_1fr_2fr_auto] gap-4 p-4 border-t items-center">
                                        <div>{caption.startTime}</div>
                                        <div>{caption.endTime}</div>
                                        <div>{caption.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Video Previews with 9:16 aspect ratio */}
                            <div
                                className="relative bg-slate-900 rounded-lg aspect-[9/16] flex items-center justify-center">
                                <span className="text-white">Original Video</span>
                            </div>
                            <div
                                className="relative bg-slate-900 rounded-lg aspect-[9/16] flex items-center justify-center">
                                <span className="text-white">Caption Preview</span>
                            </div>
                        </div>

                        <div className="space-y-6 border-gray-600 border-2 p-4 rounded-lg ">
                            <h3 className="text-xl font-semibold">Caption Customization</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <ColorInput label="Primary Color" value={"#000"} />
                                </div>

                                <div className="space-y-2">
                                    <Select
                                        label="Font size"
                                        placeholder="Pick value"
                                        value={"12px"}
                                        // onChange={setFontSize}
                                        data={['12px', '14px', '16px', '18px','24px','32px','48px']}
                                    />
                                </div>

                            </div>

                            <button className="w-full rounded-lg bg-black text-white h-12 text-center">
                                {/*<Upload className="w-4 h-4 mr-2"/>*/}
                                Generate Captions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}