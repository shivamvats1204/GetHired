"use client"

import { useState } from "react"
import { Download, Upload, Briefcase, GraduationCap, FileSearch, Video } from "lucide-react"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserProfile } from "../types/user"
import EditProfileDialog from "./EditProfileDialog"

// Mock data - In a real app, this would come from your backend
const mockUserProfile: UserProfile = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2018-2022",
      gpa: "3.8",
    },
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      duration: "2022-Present",
      description: "Developed and maintained web applications using React and Node.js",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "SQL"],
}

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            title="Job Apply"
            description="Search and apply for full-time positions"
            icon={<Briefcase className="h-6 w-6" />}
            href="/job-apply"
          />
          <FeatureCard
            title="Internship Apply"
            description="Find and apply for internship opportunities"
            icon={<GraduationCap className="h-6 w-6" />}
            href="/internship-apply"
          />
          <FeatureCard
            title="ATS Score Analyzer"
            description="Check how well your resume performs against ATS"
            icon={<FileSearch className="h-6 w-6" />}
            href="/ats-analyzer"
          />
          <FeatureCard
            title="Interview Prep"
            description="Practice with AI-powered mock interviews"
            icon={<Video className="h-6 w-6" />}
            href="/interview-prep"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Profile</h2>
                <EditProfileDialog profile={userProfile} onUpdate={setUserProfile} />
              </div>

              <div className="space-y-6">
                <ProfileSection title="Personal Information">
                  <p className="font-medium">{userProfile.personalInfo.name}</p>
                  <p>{userProfile.personalInfo.email}</p>
                  <p>{userProfile.personalInfo.phone}</p>
                  <p>{userProfile.personalInfo.location}</p>
                </ProfileSection>

                <ProfileSection title="Skills">
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill) => (
                      <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </ProfileSection>

                <ProfileSection title="Education">
                  {userProfile.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500">{edu.year}</p>
                      {edu.gpa && <p className="text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </ProfileSection>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Preview & Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Resume</h2>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Update Resume
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Tabs defaultValue="preview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="ats">ATS View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="min-h-[600px]">
                    {/* This would be your resume preview component */}
                    <div className="border rounded-lg p-8">
                      <h1 className="text-2xl font-bold mb-4">{userProfile.personalInfo.name}</h1>
                      <div className="space-y-6">
                        <ResumeSection title="Experience">
                          {userProfile.experience.map((exp, index) => (
                            <div key={index} className="mb-4">
                              <h3 className="font-medium">{exp.title}</h3>
                              <p className="text-gray-600">{exp.company}</p>
                              <p className="text-gray-500">{exp.duration}</p>
                              <p className="mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </ResumeSection>

                        <ResumeSection title="Education">
                          {userProfile.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                              <h3 className="font-medium">{edu.degree}</h3>
                              <p className="text-gray-600">{edu.institution}</p>
                              <p className="text-gray-500">{edu.year}</p>
                            </div>
                          ))}
                        </ResumeSection>

                        <ResumeSection title="Skills">
                          <p>{userProfile.skills.join(", ")}</p>
                        </ResumeSection>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="ats" className="min-h-[600px]">
                    <div className="border rounded-lg p-8">
                      <p className="text-gray-600">
                        This view shows how your resume appears to Applicant Tracking Systems.
                      </p>
                      {/* Add ATS view content here */}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
  href,
}: { title: string; description: string; icon: React.ReactNode; href: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Button className="w-full mt-4" asChild>
          <a href={href}>Get Started</a>
        </Button>
      </CardContent>
    </Card>
  )
}

