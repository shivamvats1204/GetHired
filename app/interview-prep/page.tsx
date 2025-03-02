"use client"

import { useState } from "react"
import Header from "../components/Header"
import InterviewSession from "./components/InterviewSession"
import InterviewResults from "./components/InterviewResults"

export default function InterviewPrep() {
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [results, setResults] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Interview Prep</h1>
        {!interviewComplete ? (
          <InterviewSession
            onComplete={(interviewResults) => {
              setResults(interviewResults)
              setInterviewComplete(true)
            }}
          />
        ) : (
          <InterviewResults results={results} />
        )}
      </main>
    </div>
  )
}

