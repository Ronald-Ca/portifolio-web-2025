import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@app/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@app/components/ui/dialog"
import { useAlert } from "@app/contexts/alert-context"
import {
	useCreateExperienceMutation,
	useGetExperienceQuery,
	useUpdateExperienceMutation,
} from "@app/queries/experience"
import type { ExperienceType } from "@app/services/experience-service"
import { getModalityLabel } from "@app/utils/modality"
import { useState } from "react"
import { FaEdit, FaBriefcase } from "react-icons/fa"
import { IoIosAdd } from "react-icons/io"
import { useQueryClient } from "@tanstack/react-query"
import { FormExperience } from "@app/components/form/form-experience"
import { FaTrash } from "react-icons/fa6"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@radix-ui/react-alert-dialog"
import { Button } from "@app/components/ui/button"
import { TruncatedName } from "@app/components/common/truncate-tooltip/truncate-name"
import { Badge } from "@app/components/ui/badge"
import { AlertDialogFooter, AlertDialogHeader } from "@app/components/ui/alert-dialog"
import { useCreateSkillMutation, useGetSkillsQuery } from "@app/queries/skill"
import { queryKeys } from "@app/queries/query-keys"
import { SkillType } from "@app/services/skill-service"
import FormSkill from "@app/components/form/form-skill"
import { FaCode } from "react-icons/fa"
import { ConfigExperienceSkeleton } from "@app/components/common/skeleton/config-experience-skeleton"

export default function ConfigExperience() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedExperience, setSelectedExperience] = useState<ExperienceType | undefined>(undefined)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isCreateSkillOpen, setIsCreateSkillOpen] = useState(false)

	const { data: experiences, isLoading } = useGetExperienceQuery()
	const { data: skills, isLoading: isLoadingSkills } = useGetSkillsQuery()

	const createSkill = useCreateSkillMutation({
		onSuccess: () => {
			setIsCreateSkillOpen(false)
			queryClient.invalidateQueries({ queryKey: queryKeys.skill.all })
			setAlert({ title: "Sucesso!", message: "Habilidade criada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao criar a habilidade!", type: "error" })
		},
	})

	const createExperience = useCreateExperienceMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-experience"])
			setAlert({ title: "Sucesso!", message: "Experiência criada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao criar a experiência!", type: "error" })
		},
	})

	const updateExperience = useUpdateExperienceMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-experience"])
			setAlert({ title: "Sucesso!", message: "Experiência atualizada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao atualizar a experiência!", type: "error" })
		},
	})

	const handleSave = (newExperience: ExperienceType) => {
		if (selectedExperience?.id) {
			updateExperience.mutate({ ...newExperience, id: selectedExperience.id })
		} else {
			createExperience.mutate(newExperience)
		}
	}

	const handleEditClick = (experience: ExperienceType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedExperience(experience)
		setIsOpen(true)
	}

	const handleDeleteClick = (experience: ExperienceType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedExperience(experience)
		setIsDeleteDialogOpen(true)
	}

	const handleCardClick = (experience: ExperienceType) => {
		setSelectedExperience(experience)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedExperience(undefined)
		setIsOpen(true)
	}

	const handleSaveSkill = (data: SkillType) => {
		const experience = Number(data.experience)
		const level = Number(data.level)
		createSkill.mutate({ ...data, experience, level })
	}

	const formatPeriod = (mothInitial: string, yearInitial: number, mothFinal?: string, yearFinal?: number) => {
		const start = `${mothInitial}/${yearInitial}`
		const end = mothFinal === "Present" ? "Atual" : mothFinal && yearFinal ? `${mothFinal}/${yearFinal}` : "Atual"
		return `${start} - ${end}`
	}

	const isMutating = createExperience.isLoading || updateExperience.isLoading

	if (isLoading || isLoadingSkills) return <ConfigExperienceSkeleton />

	return (
		<div className="flex flex-col h-full min-h-0">
			<div className="flex-shrink-0 mb-6 flex items-center justify-between flex-wrap gap-2">
				<h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
					<span className="bg-cyan-500/10 p-2 rounded-md">
						<FaBriefcase className="text-cyan-400" size={24} />
					</span>
					Experiência Profissional
				</h2>
				<Button
					onClick={handleAddClick}
					className="
						bg-gradient-to-r from-cyan-500 to-blue-600 
						hover:from-cyan-600 hover:to-blue-700 text-white"
				>
					<IoIosAdd size={20} className="mr-1" />
					Adicionar Experiência
				</Button>
			</div>
			<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch pb-4">
				{experiences &&
					experiences.map((experience: ExperienceType) => (
						<Card
							key={experience.id}
							onClick={() => handleCardClick(experience)}
							className="
							bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 
							transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 
							cursor-pointer group overflow-hidden min-h-[240px] flex flex-col"
						>
							<div className="
									absolute top-0 left-0 w-full h-1 
									bg-gradient-to-r from-cyan-500 to-blue-600 
									transform origin-left scale-x-0 
									group-hover:scale-x-100 transition-transform duration-300"></div>

							<CardHeader className="pb-1 pt-3 px-3">
								<CardTitle className="
										text-lg font-semibold text-gray-100 
										group-hover:text-cyan-400 transition-colors"
								>
									<TruncatedName name={experience.company} maxLength={25} tooltipSide="top" />
								</CardTitle>
								<p className="text-cyan-500/70 text-xs font-medium">{experience.role}</p>
							</CardHeader>

							<CardContent className="flex-1 px-3 py-2">
								<div className="space-y-2 text-gray-400 text-sm">
									<p className="flex items-center gap-2">
										<span className="text-cyan-500/70">Período:</span>{" "}
										{formatPeriod(
											experience.mothInitial,
											experience.yearInitial,
											experience.mothFinal ?? undefined,
											experience.yearFinal ?? undefined,
										)}
									</p>
									{experience.modality && (
										<p className="flex items-center gap-2">
											<span className="text-cyan-500/70">Modalidade:</span>{" "}
											{getModalityLabel(experience.modality)}
										</p>
									)}

									{experience.activities && experience.activities.length > 0 && (
										<div>
											<p className="text-cyan-500/70 mb-0.5 text-xs">Atividades:</p>
											<ul className="list-disc list-inside text-xs space-y-0.5 pl-1">
												{experience.activities.slice(0, 1).map((activity, idx) => (
													<li key={idx} className="text-gray-300">
														<TruncatedName name={activity} maxLength={45} tooltipSide="right" showIcon={false} />
													</li>
												))}
												{experience.activities.length > 1 && (
													<li className="text-gray-400 italic text-xs">
														+ {experience.activities.length - 1} atividades...
													</li>
												)}
											</ul>
										</div>
									)}

									{experience.experienceSkill && experience.experienceSkill.length > 0 && (
										<div className="flex flex-wrap gap-1 pt-0.5">
											{experience.experienceSkill.slice(0, 3).map((skill, idx) => {
												const matchedSkill = skills?.find((s) => s.id === skill.skillId);
												return (
													<Badge
														key={idx}
														variant="outline"
														className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs"
													>
														{matchedSkill ? matchedSkill.name : "Desconhecido"}
													</Badge>
												);
											})}
											{experience.experienceSkill.length > 3 && (
												<Badge
													variant="outline"
													className="bg-gray-500/10 text-gray-400 border-gray-500/30 text-xs"
												>
													+{experience.experienceSkill.length - 3}
												</Badge>
											)}
										</div>
									)}
								</div>
							</CardContent>

							<CardFooter className="flex justify-end gap-1 py-2 px-3">
								<Button
									size="sm"
									variant="ghost"
									className="h-7 w-7 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
									onClick={(e) => handleEditClick(experience, e)}
								>
									<FaEdit size={14} />
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
									onClick={(e) => handleDeleteClick(experience, e)}
								>
									<FaTrash size={14} />
								</Button>
							</CardFooter>
						</Card>
					))}

				<Card
					onClick={handleAddClick}
					className="
						bg-[#070b14] border border-dashed border-[#1e2a4a] hover:border-cyan-500/50 
						transition-all duration-300 flex items-center justify-center 
						min-h-[240px] cursor-pointer group"
				>
					<div className="
							flex flex-col items-center justify-center gap-2 
							text-gray-500 group-hover:text-cyan-400 transition-colors"
					>
						<div className="
								w-12 h-12 rounded-full bg-[#0c1220] flex 
								items-center justify-center group-hover:bg-cyan-500/10 
								transition-colors"
						>
							<IoIosAdd size={28} className="transition-transform group-hover:scale-110 duration-300" />
						</div>
						<p className="font-medium text-sm">Adicionar Experiência</p>
					</div>
				</Card>
				</div>
			</div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent
					overlayClassName="!bg-transparent"
					className="
						bg-[#0c1220] border border-[#1e2a4a] text-gray-100
						w-full max-w-2xl max-h-[90vh] overflow-y-auto
						scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400
					"
				>
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
							<FaBriefcase size={18} />
							{selectedExperience ? "Editar Experiência" : "Adicionar Experiência"}
						</DialogTitle>
					</DialogHeader>
					<FormExperience
						selectedExperience={selectedExperience}
						handleSave={handleSave}
						isSubmitting={isMutating}
						onOpenCreateSkill={() => setIsCreateSkillOpen(true)}
					/>
				</DialogContent>
			</Dialog>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent
					className="
					fixed top-1/2 left-1/2 
					p-4 rounded-lg
					transform -translate-x-1/2 -translate-y-1/2 
					bg-[#0c1220] border border-[#1e2a4a] 
					text-gray-100 sm:max-w-[600px]
					"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-red-400 font-semibold text-xl">Confirmar exclusão</AlertDialogTitle>
						<AlertDialogDescription className="text-gray-400">
							Tem certeza que deseja excluir a experiência{" "}
							<span className="font-semibold text-gray-300">{selectedExperience?.company}</span>?
							<br />
							Esta ação não pode ser desfeita.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="
							pt-1 pb-1 pl-2 pr-2 rounded-sm bg-[#070b14] 
							text-gray-300 hover:bg-[#111827] hover:text-gray-100"
						>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className="
							pt-1 pb-1 pl-2 pr-2 rounded-sm bg-red-600 
							hover:bg-red-700 text-white pointer-events-none"
							disabled={true}
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Dialog open={isCreateSkillOpen} onOpenChange={setIsCreateSkillOpen}>
				<DialogContent
					className="
						bg-[#0c1220] border border-[#1e2a4a] text-gray-100
						max-w-2xl max-h-[90vh] overflow-y-auto
						scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400
						z-[100]
					"
				>
					<div className="mb-4">
						<DialogTitle className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
							<FaCode size={18} />
							Criar habilidade
						</DialogTitle>
					</div>
					<FormSkill
						selectedSkill={null}
						handleSave={handleSaveSkill}
						isSubmitting={createSkill.isLoading}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}
