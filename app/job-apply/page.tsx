"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import JobMatcher from "./components/JobMatcher"
import JobSwiper from "./components/JobSwiper"
import JobSummary from "./components/JobSummary"
import { Button } from "@/components/ui/button"
import { getUserProfile, searchJobs } from "./utils/jobUtils"
import type { UserProfile } from "../types/user"
import type { JobPost } from "../types/job"

export default function JobApply() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [jobsToReview, setJobsToReview] = useState<JobPost[]>([])
  const [appliedJobs, setAppliedJobs] = useState<JobPost[]>([])
  const [manualApplyJobs, setManualApplyJobs] = useState<JobPost[]>([])
  const [currentStage, setCurrentStage] = useState<"loading" | "matching" | "swiping" | "summary">("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile()
        setUserProfile(profile)
        const jobs = await searchJobs(profile.skills)
        setJobsToReview(jobs)
        setCurrentStage("matching")
      } catch (err) {
        setError("Failed to load profile or jobs. Please try again.")
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const handleMatchingComplete = () => {
    setCurrentStage("swiping")
  }

  const handleJobDecision = (job: JobPost, apply: boolean) => {
    if (apply) {
      setAppliedJobs((prev) => [...prev, job])
    } else {
      setManualApplyJobs((prev) => [...prev, job])
    }
    setJobsToReview((prev) => prev.filter((j) => j.id !== job.id))
  }

  const handleFinishSwiping = () => {
    setCurrentStage("summary")
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Job Application Assistant</h1>
        <AnimatePresence mode="wait">
          {currentStage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
          )}
          {currentStage === "matching" && userProfile && (
            <motion.div
              key="matching"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <JobMatcher userProfile={userProfile} onMatchingComplete={handleMatchingComplete} />
            </motion.div>
          )}
          {currentStage === "swiping" && (
            <motion.div
              key="swiping"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <JobSwiper jobs={jobsToReview} onSwipe={handleJobDecision} onFinish={handleFinishSwiping} />
            </motion.div>
          )}
          {currentStage === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <JobSummary appliedJobs={appliedJobs} manualApplyJobs={manualApplyJobs} />
              <div className="mt-8 text-center">
                <Button asChild size="lg">
                  <a href="/dashboard">Return to Dashboard</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

