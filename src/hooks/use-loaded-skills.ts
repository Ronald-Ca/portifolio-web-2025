import { SkillType } from "@app/services/skill-service"
import { type ReactElement, useMemo } from "react"
import { loadIconSync } from "@app/helpers/load-icons"
import { useGetSkillsQuery } from "@app/queries/skill"

type LoadedSkill = Omit<SkillType, "icon"> & {
  stars: number
  icon: ReactElement
}

export function useLoadedSkills() {
  const { data: rawSkills, isLoading, isError } = useGetSkillsQuery()

  const loadedSkills = useMemo((): LoadedSkill[] => {
    if (!rawSkills?.length) return []
    return rawSkills.map(s => {
      const iconElement = loadIconSync(s.icon?.trim() ?? "", s.color ?? "#00BFFF", 40)
      const { icon: _iconString, ...rest } = s
      return {
        ...rest,
        stars: s.level,
        icon: iconElement,
      }
    })
  }, [rawSkills])

  return { loadedSkills, isLoading, isError }
}
