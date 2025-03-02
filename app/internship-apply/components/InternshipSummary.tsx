import type { InternshipPost } from "../../types/internship"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface InternshipSummaryProps {
  appliedInternships: InternshipPost[]
  manualApplyInternships: InternshipPost[]
}

export default function InternshipSummary({ appliedInternships, manualApplyInternships }: InternshipSummaryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Applied Internships</h2>
        {appliedInternships.map((internship) => (
          <Card key={internship.id} className="mb-4">
            <CardHeader>
              <CardTitle>{internship.title}</CardTitle>
              <CardDescription>{internship.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Location:</strong> {internship.location}
              </p>
              <p className="mt-2">{internship.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Internships to Apply Manually</h2>
        {manualApplyInternships.map((internship) => (
          <Card key={internship.id} className="mb-4">
            <CardHeader>
              <CardTitle>{internship.title}</CardTitle>
              <CardDescription>{internship.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Location:</strong> {internship.location}
              </p>
              <p className="mt-2">{internship.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

