"use client"

import { useState } from "react"
import { Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { UserProfile } from "../types/user"

interface EditProfileDialogProps {
  profile: UserProfile
  onUpdate: (profile: UserProfile) => void
}

export default function EditProfileDialog({ profile, onUpdate }: EditProfileDialogProps) {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedProfile)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedProfile.personalInfo.name}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      personalInfo: { ...editedProfile.personalInfo, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.personalInfo.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      personalInfo: { ...editedProfile.personalInfo, email: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedProfile.personalInfo.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      personalInfo: { ...editedProfile.personalInfo, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedProfile.personalInfo.location}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      personalInfo: { ...editedProfile.personalInfo, location: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Skills</h3>
            <div>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={editedProfile.skills.join(", ")}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    skills: e.target.value.split(",").map((skill) => skill.trim()),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Experience</h3>
            {editedProfile.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => {
                    const newExperience = [...editedProfile.experience]
                    newExperience[index] = { ...exp, title: e.target.value }
                    setEditedProfile({ ...editedProfile, experience: newExperience })
                  }}
                />
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...editedProfile.experience]
                    newExperience[index] = { ...exp, company: e.target.value }
                    setEditedProfile({ ...editedProfile, experience: newExperience })
                  }}
                />
                <Input
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperience = [...editedProfile.experience]
                    newExperience[index] = { ...exp, duration: e.target.value }
                    setEditedProfile({ ...editedProfile, experience: newExperience })
                  }}
                />
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...editedProfile.experience]
                    newExperience[index] = { ...exp, description: e.target.value }
                    setEditedProfile({ ...editedProfile, experience: newExperience })
                  }}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

