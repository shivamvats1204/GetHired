export interface UserProfile {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
  }
  education: Array<{
    degree: string
    institution: string
    year: string
    gpa?: string
  }>
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  skills: string[]
  interviewPrep?: {
    lastSessionDate?: string
    totalSessions: number
    averageScore: number
  }
}

