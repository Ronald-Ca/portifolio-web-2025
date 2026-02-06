import { motion } from "framer-motion"
import { useGetProjectsQuery } from "../../../queries/project"
import ProjectCard from "./components/project-card"

export default function Projects() {
	const { data: projects } = useGetProjectsQuery()
	const hasProjects = projects && projects.length > 0

	return (
		<div className="
			min-h-screen-header-footer py-24 px-4 sm:px-6 lg:px-8 
			flex justify-center items-start bg-gradient-to-r 
			from-slate-900 via-indigo-950 to-blue-950 
			animate-gradient-move
		">
			<div className="w-full max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="w-full"
				>
					{hasProjects ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{projects.map((project, index) => (
								<ProjectCard key={project.id || index} project={project} index={index} />
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-24 px-4 text-center">
							<div className="rounded-full bg-slate-800/60 p-6 mb-4">
								<svg className="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-slate-300 mb-2">Nenhum projeto por aqui</h3>
							<p className="text-slate-500 max-w-sm">
								Ainda não há projetos publicados. Quando houver, eles aparecerão nesta galeria.
							</p>
						</div>
					)}
				</motion.div>
			</div>
		</div>
	)
}
