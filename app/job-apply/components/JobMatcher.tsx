import { useState, useEffect } from "react"
import type { UserProfile } from "../../types/user"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface JobMatcherProps {
  userProfile: UserProfile
  onMatchingComplete: () => void
}

export default function JobMatcher({ userProfile, onMatchingComplete }: JobMatcherProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          onMatchingComplete()
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onMatchingComplete])

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Matching Jobs</h2>
      <p className="mb-6 text-gray-600">Analyzing your profile and searching for relevant job postings...</p>
      <div className="relative pt-1">
        <Progress value={progress} className="w-full h-2" />
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 absolute -top-2 right-0">
          {progress}%
        </span>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-blue-500" />
        <span className="text-gray-700">Processing...</span>
      </div>
    </motion.div>
  )
}

