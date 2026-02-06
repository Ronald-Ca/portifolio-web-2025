import { useState, memo, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import type { ProjectType } from "@app/services/project-service"
import { Badge } from "@app/components/ui/badge"
import ProjectModal from "./project-modal"

interface ProjectCardProps {
    project: ProjectType
    index: number
}

const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    const delay = useMemo(() => index * 0.1, [index])
    
    const handleOpen = useCallback(() => setIsOpen(true), [])
    const handleClose = useCallback(() => setIsOpen(false), [])
    
    const displayedSkills = useMemo(
        () => project.projectSkills?.slice(0, 3) ?? [],
        [project.projectSkills]
    )
    
    const remainingSkillsCount = useMemo(
        () => (project.projectSkills?.length ?? 0) - displayedSkills.length,
        [project.projectSkills, displayedSkills.length]
    )

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay }}
                className="group"
            >
                <div
                    onClick={handleOpen}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleOpen()}
                    className="
                        h-full min-h-0 overflow-hidden rounded-xl
                        bg-gradient-to-br from-slate-900/80 via-blue-950/80 to-slate-800/90 border
                        border-cyan-500/30 shadow-lg hover:shadow-cyan-500/20 hover:shadow-xl
                        group-hover:border-cyan-400 group-hover:scale-[1.02]
                        transition-all duration-300 cursor-pointer
                        backdrop-blur-md relative flex flex-col
                    "
                >
                    <div className="relative overflow-hidden rounded-t-xl">
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={(project.image as string) || "/placeholder.svg"}
                                alt={`${project.name} preview`}
                                loading="lazy"
                                className="
                                    w-full h-full object-cover object-center transform 
                                    rounded-t-xl
                                "/>
                            <div className="
                                absolute inset-0 bg-gradient-to-t from-slate-900/80 
                                via-transparent to-transparent opacity-80 pointer-events-none
                            " />
                            <div className="absolute top-3 right-3 z-10">
                                <span className="inline-block bg-cyan-600/80 text-xs text-white px-2 py-1 rounded shadow-md font-semibold tracking-wide">
                                    Projeto
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-1 min-h-0">
                        <h3 className="
                            text-lg font-bold text-cyan-400 
                            group-hover:text-cyan-300 transition-colors drop-shadow-md tracking-tight line-clamp-1"
                        >
                            {project.name}
                        </h3>

                        <p className="text-slate-300 line-clamp-2 text-sm font-medium flex-1 min-h-0">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-auto">
                            {displayedSkills.map((stack) => (
                                <Badge
                                    key={stack.skill?.id}
                                    variant="outline"
                                    className="
                                        bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-300 border-cyan-500/30 font-medium text-xs px-2 py-0.5
                                    "
                                >
                                    {stack.skill?.name}
                                </Badge>
                            ))}
                            {remainingSkillsCount > 0 && (
                                <Badge
                                    variant="outline"
                                    className="
                                        bg-cyan-500/10 border-cyan-500/30 
                                        text-cyan-400 font-medium text-xs px-2 py-0.5
                                    "
                                >
                                    +{remainingSkillsCount}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            <ProjectModal project={project} isOpen={isOpen} onClose={handleClose} />
        </>
    )
})

export default ProjectCard
