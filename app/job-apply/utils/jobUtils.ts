import type { UserProfile } from "../../types/user"
import type { JobPost } from "../../types/job"

export const getUserProfile = async (): Promise<UserProfile> => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    personalInfo: { name: "John Doe", email: "john@example.com", phone: "123-456-7890", location: "New York, NY" },
    skills: ["React", "TypeScript", "Node.js", "Python", "SQL"],
    experience: [
      {
        title: "Software Engineer",
        company: "Tech Co",
        duration: "2020-Present",
        description: "Full-stack development",
      },
      { title: "Junior Developer", company: "Startup Inc", duration: "2018-2020", description: "Frontend development" },
    ],
    education: [{ degree: "B.S. Computer Science", institution: "University of Technology", year: "2018" }],
  }
}

export const searchJobs = async (skills: string[]): Promise<JobPost[]> => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Web Solutions Inc.",
      location: "Remote",
      description: "Looking for a React expert with 5+ years of experience",
      applicationUrl: "https://example.com/apply/1",
      salary: "$120,000 - $150,000",
      postDate: "2023-05-15",
    },
    {
      id: "2",
      title: "Full-stack Engineer",
      company: "Tech Innovators",
      location: "New York, NY",
      description: "Node.js and React experience required, Python is a plus",
      applicationUrl: "https://example.com/apply/2",
      salary: "$100,000 - $130,000",
      postDate: "2023-05-14",
    },
    {
      id: "3",
      title: "JavaScript Developer",
      company: "App Creators",
      location: "San Francisco, CA",
      description: "Building modern web applications with React and TypeScript",
      applicationUrl: "https://example.com/apply/3",
      salary: "$110,000 - $140,000",
      postDate: "2023-05-13",
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "Data Systems",
      location: "Chicago, IL",
      description: "Developing scalable backend services with Node.js and SQL",
      applicationUrl: "https://example.com/apply/4",
      salary: "$95,000 - $125,000",
      postDate: "2023-05-12",
    },
    {
      id: "5",
      title: "React Native Developer",
      company: "Mobile Innovations",
      location: "Austin, TX",
      description: "Creating cross-platform mobile apps with React Native",
      applicationUrl: "https://example.com/apply/5",
      salary: "$105,000 - $135,000",
      postDate: "2023-05-11",
    },
  ]
}

