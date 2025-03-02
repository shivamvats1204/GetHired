import { useState, useEffect } from "react"
import type { UserProfile } from "../../types/user"
import { Progress } from "@/components/ui/progress"

interface InternshipMatcherProps {
  userProfile: UserProfile
  onMatchingComplete: () => void
}

export default function InternshipMatcher({ userProfile, onMatchingComplete }: InternshipMatcherProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          onMatchingComplete()
          return 100
        }
        return prev + 10
      })
    }, 500)

    return () => clearInterval(timer)
  }, [onMatchingComplete])

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Matching Internships</h2>
      <p className="mb-4">Analyzing your profile and searching for relevant internship postings...</p>
      <Progress value={progress} className="w-full" />
    </div>
  )
}

