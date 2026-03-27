import LoadingSpinner from '../../../components/common/loading'
import { useGetAboutQuery } from '../../../queries/about'
import { useGetCurriculumQuery } from '../../../queries/curriculum'
import { useGetExperienceQuery } from '../../../queries/experience'
import { useGetEducationQuery } from '@app/queries/education'
import { HiAcademicCap, HiUser } from 'react-icons/hi2'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { HiCode } from 'react-icons/hi'
import { Profile } from './components/profile'
import { Education } from './components/education'
import { Experience } from './components/experience'
import { motion } from 'framer-motion'

export default function About() {
	const { data: about } = useGetAboutQuery()
	const { data: curriculum } = useGetCurriculumQuery()
	const { data: experiences } = useGetExperienceQuery()
	const { data: education } = useGetEducationQuery()

	if (!about || !curriculum) return <LoadingSpinner />

	return (
		<div className="
			min-h-screen-header-footer bg-gradient-to-r 
			from-slate-900 via-indigo-950 to-blue-950 
			animate-gradient-move py-8 px-3 sm:px-4 md:px-8 lg:px-16
			">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Tabs defaultValue="profile" className="w-full mt-12 sm:mt-16 md:mt-20">
						<TabsList className="grid grid-cols-3 w-full max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8 bg-slate-900/70 rounded-lg border border-default/60">
							<TabsTrigger value="profile" className="
							  flex items-center justify-center font-semibold pt-2 pb-2 rounded-l-lg 
								text-xs sm:text-sm data-[state=active]:text-sm
								bg-slate-900/40 text-gray-200 border-r border-default/60
								data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950
							">
								<HiUser className="mr-2" /> Perfil
							</TabsTrigger>
							<TabsTrigger value="education" className="
								flex items-center justify-center font-semibold pt-2 pb-2
								text-xs sm:text-sm data-[state=active]:text-sm
								bg-slate-900/40 text-gray-200 border-x border-default/60
								data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 
							">
								<HiAcademicCap className="mr-2" /> Formação
							</TabsTrigger>
							<TabsTrigger value="experience" className="
								flex items-center justify-center font-semibold pt-2 pb-2 
								rounded-r-lg text-xs sm:text-sm data-[state=active]:text-sm
								bg-slate-900/40 text-gray-200 border-l border-default/60
								data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 
							">
								<HiCode className="mr-2" /> Experiências
							</TabsTrigger>
						</TabsList>

						<TabsContent value="profile" className="mt-0">
							<Profile about={about} curriculum={curriculum} />
						</TabsContent>

						<TabsContent value="education" className="mt-0">
							<Education education={education || []} />
						</TabsContent>

						<TabsContent value="experience" className="mt-0">
							<Experience experiences={experiences || []} />
						</TabsContent>
					</Tabs>
				</motion.div>
			</div>
		</div>
	)
}
