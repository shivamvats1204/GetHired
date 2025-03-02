import type { JobPost } from "../../types/job"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Building2, MapPin, CheckCircle2, AlertCircle, DollarSign, Calendar } from "lucide-react"

interface JobSummaryProps {
  appliedJobs: JobPost[]
  manualApplyJobs: JobPost[]
}

export default function JobSummary({ appliedJobs, manualApplyJobs }: JobSummaryProps) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Application Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">
                <CheckCircle2 className="inline-block mr-2 h-6 w-6" />
                Automatically Applied
              </CardTitle>
              <CardDescription className="text-green-700 text-lg">
                {appliedJobs.length} job{appliedJobs.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-800">
                <AlertCircle className="inline-block mr-2 h-6 w-6" />
                Manual Application Required
              </CardTitle>
              <CardDescription className="text-yellow-700 text-lg">
                {manualApplyJobs.length} job{manualApplyJobs.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Automatically Applied Jobs ({appliedJobs.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appliedJobs.map((job) => (
            <Card key={job.id} className="bg-white">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{job.postDate}</span>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                <p className="text-green-600 font-semibold flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Application submitted successfully
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Jobs to Apply Manually ({manualApplyJobs.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manualApplyJobs.map((job) => (
            <Card key={job.id} className="bg-white">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{job.postDate}</span>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                <Button className="w-full" variant="outline" asChild>
                  <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply Manually <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

