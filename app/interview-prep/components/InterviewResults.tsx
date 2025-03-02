import { Button } from "@/components/ui/button"

const mockFeedback = [
  {
    question: "Tell me about yourself.",
    performance: "best",
    feedback: "Excellent self-introduction. You highlighted your key strengths and experiences effectively.",
  },
  {
    question: "What is your greatest strength?",
    performance: "good",
    feedback: "Good answer, but could be more specific with examples.",
  },
  {
    question: "What is your greatest weakness?",
    performance: "bad",
    feedback: "Try to frame your weakness more positively and explain how you're working to improve it.",
  },
  {
    question: "Why do you want to work for our company?",
    performance: "good",
    feedback: "Showed good knowledge of the company, but could demonstrate more enthusiasm.",
  },
  {
    question: "Where do you see yourself in 5 years?",
    performance: "best",
    feedback: "Excellent answer showing ambition and alignment with potential career paths in the company.",
  },
]

const topicsToStudy = [
  "STAR method for behavioural questions",
  "Company research techniques",
  "Industry trends and news",
  "Salary negotiation strategies",
  "Common technical interview questions for your field",
]

export default function InterviewResults({ results }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Interview Results</h2>
        <p className="text-lg mb-4">
          Overall Score: <span className="font-bold text-green-600">85%</span>
        </p>
        <div className="space-y-4">
          {mockFeedback.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                item.performance === "best"
                  ? "bg-green-100"
                  : item.performance === "good"
                    ? "bg-yellow-100"
                    : "bg-red-100"
              }`}
            >
              <h3 className="font-bold mb-2">{item.question}</h3>
              <p>{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Topics to Prepare</h2>
        <ul className="list-disc pl-6 space-y-2">
          {topicsToStudy.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>

      <Button asChild>
        <a href="/dashboard">Return to Dashboard</a>
      </Button>
    </div>
  )
}

