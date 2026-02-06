import { Card, CardHeader, CardContent } from '@app/components/ui/card'
import { HiBuildingOffice } from 'react-icons/hi2'
import { Separator } from '@radix-ui/react-select'
import { Badge } from '@app/components/ui/badge'
import React from 'react'
import { ExperienceType } from '@app/services/experience-service'
import { getModalityLabel } from '@app/utils/modality'

interface ExperienceProps {
  experiences: ExperienceType[];
}

const sortByMostRecentFirst = (list: ExperienceType[]) =>
  [...list].sort((a, b) => {
    const yearA = a.currentJob ? 1e9 : (a.yearFinal ?? a.yearInitial ?? 0)
    const yearB = b.currentJob ? 1e9 : (b.yearFinal ?? b.yearInitial ?? 0)
    return yearB - yearA
  })

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const sorted = experiences?.length ? sortByMostRecentFirst(experiences) : []
  return (
  <Card className="bg-slate-900/50 border-cyan-500/50 text-white">
    <CardHeader>
      <h2 className="text-3xl font-bold text-center text-cyan-400">Experiências Profissionais</h2>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-8">
        {sorted.map((experience, index) => (
          <div key={index} className="bg-slate-800/50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <HiBuildingOffice className="mr-2 text-cyan-400" />
                {experience.company}
              </h3>
              <div className="text-cyan-400 font-medium mt-2 md:mt-0">
                {experience.mothInitial}/{experience.yearInitial} - {experience.mothFinal === "Present" || !experience.yearFinal ? "Atual" : `${experience.mothFinal}/${experience.yearFinal}`}
              </div>
            </div>
            <div className="mb-4 text-xl font-semibold text-gray-300">{experience.role}</div>
            {experience.modality && (
              <div className="mb-2">
                <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                  {getModalityLabel(experience.modality)}
                </Badge>
              </div>
            )}
            {experience.description && (
              <p className="mb-4 text-gray-300">{experience.description}</p>
            )}
            <Separator className="my-4 bg-slate-700" />
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">Atividades:</h4>
              <ul className="space-y-2">
                {experience.activities.map((activity: string, idx: number) => (
                  <li key={idx} className="text-gray-300 flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">Stacks:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.experienceSkill?.map((skill, idx) => (
                  <Badge key={idx} className="bg-slate-950 hover:bg-slate-900 text-white border-cyan-500/50">
                    {skill.skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}
