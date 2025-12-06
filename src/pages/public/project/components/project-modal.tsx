import { ProjectType } from "@app/services/project-service"
import { X, ExternalLink, Code2 } from "lucide-react"
import { Button } from "@app/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@app/components/ui/badge"
import { Separator } from "@radix-ui/react-select"

interface ProjectModalProps {
    project: ProjectType
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog.Root open onOpenChange={onClose}>
                    <Dialog.Portal >
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="
                                    fixed inset-0 
                                    max-w-3xl max-h-[85vh] 
                                    m-auto mt-28 
                                    bg-gradient-to-r 
                                    from-slate-900  to-blue-950 
                                    animate-gradient-move
                                    rounded-2xl
                                    overflow-y-auto
                                    shadow-2xl border border-cyan-700/40
                                    scrollbar-thin
                                    scrollbar-track-transparent scrollbar-track-rounded-lg
                                    scrollbar-thumb-default scrollbar-thumb-rounded-lg
                                    hover:scrollbar-thumb-default
                                "
                            >
                                <div className="relative">
                                    <Dialog.Close asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={onClose}
                                            className="
                                            absolute top-4 right-4 z-50 bg-slate-800/80 text-slate-400 
                                            hover:text-white hover:bg-slate-700/80 shadow-md"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </Dialog.Close>
                                    <div className="aspect-video w-full overflow-hidden bg-black group">
                                        {project.video ? (
                                            <video
                                                className="w-full h-full object-contain rounded-t-2xl"
                                                src={project.video as string}
                                                poster={project.image as string}
                                                controls
                                                autoPlay
                                            />
                                        ) : (
                                            <img
                                                src={(project.image as string) || "/placeholder.svg"}
                                                alt={project.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover rounded-t-2xl" />
                                        )}
                                        <div className="
                                            absolute inset-0 bg-gradient-to-t from-slate-900/80 
                                            via-transparent to-transparent pointer-events-none
                                        "/>
                                    </div>
                                </div>
                                <div className="p-8 space-y-7 flex flex-col">
                                    <h2 className="text-3xl font-extrabold text-cyan-400 text-center drop-shadow-lg tracking-tight">
                                        {project.name}
                                    </h2>
                                    <Separator className="bg-cyan-700/40 h-[2px] rounded-full mx-auto w-1/2" />
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                                                <Code2 className="h-5 w-5 text-cyan-400" />
                                                Tecnologias
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.projectSkills?.map((stack) => (
                                                    <Badge
                                                        key={stack.skill?.id}
                                                        className="
                                                            bg-gradient-to-r from-cyan-500/20 to-blue-600/30 
                                                            text-cyan-200 border-cyan-700/30 font-semibold 
                                                            shadow-sm px-3 py-1
                                                        ">
                                                        {stack.skill?.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        {project.link && (
                                            <div className="flex flex-col items-end">
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                                                    <ExternalLink className="h-5 w-5 text-cyan-400" />
                                                    Link do Projeto
                                                </h3>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                                        inline-flex items-center gap-2 bg-slate-800/60 
                                                        rounded-lg px-4 py-2 border border-cyan-700/30 
                                                        text-cyan-300 hover:text-cyan-200 hover:bg-slate-800/80 
                                                        transition-colors shadow-md w-fit max-w-xs overflow-hidden text-ellipsis
                                                    ">
                                                    <span className="truncate">{project.link}</span>
                                                    <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    {project.description && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Descrição</h3>
                                            <div className="
                                                bg-slate-800/70 rounded-xl p-5 border border-cyan-700/20 
                                                text-slate-200 shadow-inner text-base leading-relaxed
                                            ">
                                                {project.description}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </AnimatePresence>
    )
}
