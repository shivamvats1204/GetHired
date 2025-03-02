import { useState } from "react"
import { motion, type PanInfo } from "framer-motion"
import type { InternshipPost } from "../../types/internship"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface InternshipSwiperProps {
  internships: InternshipPost[]
  onSwipe: (internship: InternshipPost, apply: boolean) => void
  onFinish: () => void
}

export default function InternshipSwiper({ internships, onSwipe, onFinish }: InternshipSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe(true)
    } else if (info.offset.x < -100) {
      handleSwipe(false)
    }
  }

  const handleSwipe = (apply: boolean) => {
    onSwipe(internships[currentIndex], apply)
    if (currentIndex === internships.length - 1) {
      onFinish()
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (currentIndex >= internships.length) {
    return null
  }

  const currentInternship = internships[currentIndex]

  return (
    <div className="flex flex-col items-center">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>{currentInternship.title}</CardTitle>
            <CardDescription>{currentInternship.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Location:</strong> {currentInternship.location}
            </p>
            <p className="mt-2">{currentInternship.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleSwipe(false)}>
              Skip
            </Button>
            <Button onClick={() => handleSwipe(true)}>Apply</Button>
          </CardFooter>
        </Card>
      </motion.div>
      <p className="mt-4 text-sm text-gray-500">Swipe right to apply, left to skip. Or use the buttons below.</p>
    </div>
  )
}

