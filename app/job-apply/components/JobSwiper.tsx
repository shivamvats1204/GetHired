import { useState } from "react"
import { motion, type PanInfo, useAnimation } from "framer-motion"
import type { JobPost } from "../../types/job"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Building2, MapPin, DollarSign, Calendar } from "lucide-react"

interface JobSwiperProps {
  jobs: JobPost[]
  onSwipe: (job: JobPost, apply: boolean) => void
  onFinish: () => void
}

export default function JobSwiper({ jobs, onSwipe, onFinish }: JobSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      handleSwipe(true)
    } else if (info.offset.x < -threshold) {
      handleSwipe(false)
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
    }
  }

  const handleSwipe = (apply: boolean) => {
    onSwipe(jobs[currentIndex], apply)
    if (currentIndex === jobs.length - 1) {
      onFinish()
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (currentIndex >= jobs.length) {
    return null
  }

  const currentJob = jobs[currentIndex]

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="w-full touch-none"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">{currentJob.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              {currentJob.company}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{currentJob.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>{currentJob.salary}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{currentJob.postDate}</span>
            </div>
            <p className="text-gray-700">{currentJob.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleSwipe(false)}>
              <ThumbsDown className="mr-2 h-4 w-4" />
              Skip
            </Button>
            <Button onClick={() => handleSwipe(true)}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      <p className="mt-6 text-sm text-gray-500 text-center">
        Swipe right to apply, left to skip. Or use the buttons below.
      </p>
      <p className="mt-2 text-sm font-semibold text-gray-700">
        Job {currentIndex + 1} of {jobs.length}
      </p>
    </div>
  )
}

