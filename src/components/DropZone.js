"use client"

import {CloudIcon as CloudUp} from "lucide-react"
import {useCallback, useState} from "react"
import {useDropzone} from "react-dropzone"

export function Dropzone({
                             onFileSelect,
                             maxSize = 10 * 1024 * 1024, // 500MB default
                             acceptedTypes = {
                                 "video/mp4": [".mp4"],
                             }, maxSizeLabel = "10MB", supportedFormatsLabel = "MP4",})
{

    const [error, setError] = useState(null)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            const firstRejection = rejectedFiles[0]
            if (firstRejection.errors[0].code === "file-too-large") {
                setError(`File is too large. Maximum size is ${maxSizeLabel}`)
            } else if (firstRejection.errors[0].code === "file-invalid-type") {
                setError(`Invalid file type. Supported formats: ${supportedFormatsLabel}`)
            } else {
                setError(firstRejection.errors[0].message)
            }
            return
        }

        if (acceptedFiles && acceptedFiles.length > 0) {
            setError(null)
            onFileSelect(acceptedFiles[0])
        }
    }, [maxSizeLabel, supportedFormatsLabel, onFileSelect],)

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, maxSize, accept: acceptedTypes, multiple: false,
    })

    return (<div className="w-full max-w-3xl mx-auto">
        <div
            {...getRootProps()}
            className={`relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
                <CloudUp className={`h-12 w-12 ${isDragActive ? "text-blue-500" : "text-gray-400"}`}/>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-medium text-gray-900">Drag and drop your video here</p>
                    <p className="text-sm text-gray-500">or</p>
                    <button
                        type="button"
                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Browse Files
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Supported formats: {supportedFormatsLabel} (Max size: {maxSizeLabel})
                </p>
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        </div>
    </div>)
}

