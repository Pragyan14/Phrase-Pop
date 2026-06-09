"use client"

import { CloudUpload} from "lucide-react"
import {useCallback, useState} from "react"
import {useDropzone} from "react-dropzone"

export function Dropzone({
    onFileSelect,
    maxSize = 10 * 1024 * 1024,
    acceptedTypes = {"video/mp4": [".mp4"]},
    maxSizeLabel = "10MB",
    supportedFormatsLabel = "MP4",
}) {
    const [error, setError] = useState(null)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            const firstRejection = rejectedFiles[0]
            if (firstRejection.errors[0].code === "file-too-large") {
                setError(`File too large. Max size is ${maxSizeLabel}`)
            } else if (firstRejection.errors[0].code === "file-invalid-type") {
                setError(`Invalid type. Supported: ${supportedFormatsLabel}`)
            } else {
                setError(firstRejection.errors[0].message)
            }
            return
        }
        if (acceptedFiles && acceptedFiles.length > 0) {
            setError(null)
            onFileSelect(acceptedFiles[0])
        }
    }, [maxSizeLabel, supportedFormatsLabel, onFileSelect])

    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        onDrop,
        maxSize,
        accept: acceptedTypes,
        multiple: false,
        noClick: true,
        noKeyboard: true,
    })

    return (
        <div
            {...getRootProps()}
            className={`rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200
                ${isDragActive
                    ? "border-indigo-400 bg-indigo-50/60"
                    : "border-gray-200/80"
                }`}
            style={{
                background: isDragActive ? undefined : 'rgba(255,255,255,0.15)',
            }}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-3">
                <CloudUpload className={`h-10 w-10 transition-colors ${isDragActive ? "text-grey-300" : "text-indigo-400"}`} />

                <p className="text-base font-semibold text-gray-700">
                    Drag and drop your video here
                </p>
                <p className="text-sm text-gray-400">or</p>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        open()
                    }}
                    className="rounded-lg px-5 py-1.5 text-sm font-medium text-indigo-600
                               ring-1 ring-indigo-200 transition-all duration-200
                               hover:ring-indigo-400 hover:bg-indigo-50/60"
                    style={{ background: 'rgba(255,255,255,0.7)' }}
                >
                    Browse Files
                </button>

                <p className="text-xs text-gray-400 mt-1">
                    Supported formats: {supportedFormatsLabel} (Max size: {maxSizeLabel})
                </p>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        </div>
    )
}