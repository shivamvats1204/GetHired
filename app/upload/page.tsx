"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      // Here you would typically upload the file to your server
      console.log("Uploading file:", file.name)
      // For now, we'll just redirect to the dashboard
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">Upload Your Resume</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Choose a file
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
            />
          </div>
          <Button type="submit" disabled={!file}>
            Upload and Analyze
          </Button>
        </form>
      </main>
    </div>
  )
}

