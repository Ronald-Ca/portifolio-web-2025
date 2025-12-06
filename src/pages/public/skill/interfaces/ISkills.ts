import { ReactElement } from "react"
import type { Variants } from "framer-motion"

export interface LoadedSkill {
    name: string
    stars: number
    icon: ReactElement
    type: "skill" | "competence"
}

export interface SkillsListProps {
    skills: LoadedSkill[]
    filter: "skill" | "competence"
    variants: { container: Variants; item: Variants }
}

export interface SkillCardProps {
    skill: {
        name: string
        stars: number
        icon: ReactElement
        type: 'skill' | 'competence'
    }
    variants: { item: Variants }
}