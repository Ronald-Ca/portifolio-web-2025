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
                    <Dialog.Portal>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={onClose}
                                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-default"
                            />
                        </Dialog.Overlay>

                        <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
                            <Dialog.Content asChild>
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="
                                        pointer-events-auto
                                        w-full max-w-3xl max-h-[min(92dvh,100svh)]
                                        sm:max-h-[min(85vh,calc(100vh-3rem))]
                                        min-h-0 flex flex-col
                                        bg-gradient-to-r 
                                        from-slate-900 to-blue-950 
                                        animate-gradient-move
                                        rounded-none sm:rounded-2xl
                                        overflow-hidden
                                        shadow-2xl border-0 sm:border border-cyan-700/40
                                        scrollbar-thin
                                        scrollbar-track-transparent scrollbar-track-rounded-lg
                                        scrollbar-thumb-default scrollbar-thumb-rounded-lg
                                        hover:scrollbar-thumb-default
                                    "
                                >
                                <div className="relative shrink-0">
                                    <Dialog.Close asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={onClose}
                                            className="
                                            absolute top-2 right-2 sm:top-4 sm:right-4 z-50 h-9 w-9 sm:h-10 sm:w-10
                                            bg-slate-900/90 text-slate-300 border border-cyan-700/30
                                            hover:text-white hover:bg-slate-800 shadow-md rounded-lg"
                                        >
                                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </Button>
                                    </Dialog.Close>
                                    <div className="relative aspect-video w-full max-h-[38vh] sm:max-h-none overflow-hidden bg-black group">
                                        {project.video ? (
                                            <video
                                                className="w-full h-full object-contain sm:rounded-t-2xl rounded-none"
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
                                                className="w-full h-full object-cover sm:rounded-t-2xl rounded-none" />
                                        )}
                                        <div className="
                                            absolute inset-0 bg-gradient-to-t from-slate-900/80 
                                            via-transparent to-transparent pointer-events-none
                                        "/>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-8 space-y-4 sm:space-y-7 flex flex-col min-h-0 flex-1 overflow-y-auto overscroll-contain">
                                    <h2 className="text-xl sm:text-3xl font-extrabold text-cyan-400 text-center drop-shadow-lg tracking-tight leading-snug px-1">
                                        {project.name}
                                    </h2>
                                    <Separator className="bg-cyan-700/40 h-[2px] rounded-full mx-auto w-2/3 sm:w-1/2 shrink-0" />
                                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-4">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2 mb-2">
                                                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 shrink-0" />
                                                Tecnologias
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.projectSkills?.map((stack) => (
                                                    <Badge
                                                        key={stack.skill?.id}
                                                        className="
                                                            bg-gradient-to-r from-cyan-500/20 to-blue-600/30 
                                                            text-cyan-200 border-cyan-700/30 font-semibold 
                                                            shadow-sm px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm
                                                        ">
                                                        {stack.skill?.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        {project.link && (
                                            <div className="flex flex-col w-full md:w-auto md:max-w-[min(100%,20rem)] md:items-end">
                                                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2 mb-2 w-full md:justify-end">
                                                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 shrink-0" />
                                                    Link do Projeto
                                                </h3>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                                        inline-flex items-center gap-2 bg-slate-800/60 
                                                        rounded-lg px-3 py-2 sm:px-4 border border-cyan-700/30 
                                                        text-cyan-300 hover:text-cyan-200 hover:bg-slate-800/80 
                                                        transition-colors shadow-md w-full min-w-0
                                                    ">
                                                    <span className="truncate text-sm sm:text-base">{project.link}</span>
                                                    <ExternalLink className="h-4 w-4 shrink-0" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    {project.description && (
                                        <div className="pb-6 sm:pb-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Descrição</h3>
                                            <div className="
                                                bg-slate-800/70 rounded-xl p-4 sm:p-5 border border-cyan-700/20 
                                                text-slate-200 shadow-inner text-sm sm:text-base leading-relaxed
                                            ">
                                                {project.description}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                </motion.div>
                            </Dialog.Content>
                        </div>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </AnimatePresence>
    )
}
