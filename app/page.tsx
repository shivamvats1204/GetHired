"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { ArrowUpCircle, ScanSearch } from "lucide-react"
import Header from "./components/Header"

export default function Home() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
        // Here you would typically handle the file upload
        // For now, we'll just redirect to dashboard
        router.push("/dashboard")
      }
    },
    [router],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: false,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">DROP YOUR RESUME HERE</h1>
        <p className="text-lg text-center mb-8 max-w-2xl">
          Get Your Job Applied or Resume Customized, Reviewed by our Intelligent Resume Analyzer.
        </p>
        <div className="w-full max-w-xl">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer
                     hover:border-gray-400 transition-colors"
          >
            <input {...getInputProps()} />
            <div className="flex items-center justify-center space-x-4">
              <button
                className="bg-[#333333] text-white px-6 py-3 rounded-full text-lg font-medium
                               hover:bg-gray-700 transition-colors"
              >
                SELECT YOUR RESUME
              </button>
              <ArrowUpCircle className="w-8 h-8 text-gray-500" />
              <ScanSearch className="w-8 h-8 text-gray-500" />
            </div>
            <p className="mt-4 text-gray-500">
              {isDragActive ? "Drop your Resume PDF here" : "or drop your Resume PDF here"}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

