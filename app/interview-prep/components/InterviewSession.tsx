"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const mockQuestions = [
  "Tell me about yourself.",
  "What is your greatest strength?",
  "What is your greatest weakness?",
  "Why do you want to work for our company?",
  "Where do you see yourself in 5 years?",
]

export default function InterviewSession({ onComplete }) {
  const [stream, setStream] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState([])
  const videoRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const startMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (err) {
        console.error("Error accessing media devices:", err)
      }
    }

    startMedia()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream]) // Added stream to dependencies

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        console.log(transcript)
      }

      recognitionRef.current = recognition
    } else {
      console.log("Speech recognition not available")
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleNextQuestion = () => {
    stopListening()
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setResponses([...responses, { question: mockQuestions[currentQuestionIndex], answer: "User's response" }])
    } else {
      // Interview complete
      onComplete(responses)
    }
  }

  return (
    <div className="space-y-6">
      <div className="aspect-video">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
        <p className="text-lg mb-4">{mockQuestions[currentQuestionIndex]}</p>
        <div className="space-x-4">
          <Button onClick={isListening ? stopListening : startListening}>
            {isListening ? "Stop Answering" : "Start Answering"}
          </Button>
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < mockQuestions.length - 1 ? "Next Question" : "Finish Interview"}
          </Button>
        </div>
      </div>
    </div>
  )
}

