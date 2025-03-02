"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import InternshipMatcher from "./components/InternshipMatcher"
import InternshipSwiper from "./components/InternshipSwiper"
import InternshipSummary from "./components/InternshipSummary"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "../types/user"
import type { InternshipPost } from "../types/internship"

// Mock function to simulate getting user profile
const getUserProfile = (): UserProfile => ({
  personalInfo: { name: "John Doe", email: "john@example.com", phone: "123-456-7890", location: "New York, NY" },
  skills: ["React", "TypeScript", "Node.js"],
  experience: [
    {
      title: "Software Engineer Intern",
      company: "Tech Co",
      duration: "Summer 2022",
      description: "Assisted in full-stack development",
    },
  ],
  education: [{ degree: "B.S. Computer Science", institution: "University of Technology", year: "2024 (Expected)" }],
})

// Mock function to simulate internship search
const searchInternships = (skills: string[]): InternshipPost[] => [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Web Solutions Inc.",
    location: "Remote",
    description: "Looking for a React enthusiast",
  },
  {
    id: "2",
    title: "Full-stack Engineer Intern",
    company: "Tech Innovators",
    location: "New York, NY",
    description: "Node.js and React experience preferred",
  },
  {
    id: "3",
    title: "JavaScript Developer Intern",
    company: "App Creators",
    location: "San Francisco, CA",
    description: "Building modern web applications",
  },
]

export default function InternshipApply() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [internshipsToReview, setInternshipsToReview] = useState<InternshipPost[]>([])
  const [appliedInternships, setAppliedInternships] = useState<InternshipPost[]>([])
  const [manualApplyInternships, setManualApplyInternships] = useState<InternshipPost[]>([])
  const [currentStage, setCurrentStage] = useState<"matching" | "swiping" | "summary">("matching")

  useEffect(() => {
    // Simulate fetching user profile
    const profile = getUserProfile()
    setUserProfile(profile)

    // Simulate internship search based on user skills
    const internships = searchInternships(profile.skills)
    setInternshipsToReview(internships)
  }, [])

  const handleInternshipDecision = (internship: InternshipPost, apply: boolean) => {
    if (apply) {
      setAppliedInternships((prev) => [...prev, internship])
    } else {
      setManualApplyInternships((prev) => [...prev, internship])
    }
    setInternshipsToReview((prev) => prev.filter((i) => i.id !== internship.id))
  }

  const handleFinishSwiping = () => {
    setCurrentStage("summary")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Internship Apply</h1>
        {currentStage === "matching" && userProfile && (
          <InternshipMatcher userProfile={userProfile} onMatchingComplete={() => setCurrentStage("swiping")} />
        )}
        {currentStage === "swiping" && (
          <InternshipSwiper
            internships={internshipsToReview}
            onSwipe={handleInternshipDecision}
            onFinish={handleFinishSwiping}
          />
        )}
        {currentStage === "summary" && (
          <InternshipSummary appliedInternships={appliedInternships} manualApplyInternships={manualApplyInternships} />
        )}
        {currentStage === "summary" && (
          <Button asChild className="mt-4">
            <a href="/dashboard">Return to Dashboard</a>
          </Button>
        )}
      </main>
    </div>
  )
}

