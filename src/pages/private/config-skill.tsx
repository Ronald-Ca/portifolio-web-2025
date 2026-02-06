import FormSkill from '@app/components/form/form-skill'
import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateSkillMutation, useGetSkillsQuery, useUpdateSkillMutation } from '@app/queries/skill'
import { SkillType } from '@app/services/skill-service'
import React, { useState } from 'react'
import { FaCode, FaEdit, FaTrash } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@app/components/ui/button'
import { Badge } from '@app/components/ui/badge'
import DeleteDialog from '@app/components/common/dialogs/delete-dialog/delete-dialog'
import PageHeader from '@app/components/common/page-header/page-header'
import { SegmentedProgress } from '@app/components/ui/segmented-progress'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { IoClose } from 'react-icons/io5'
import { ConfigSkillSkeleton } from '@app/components/common/skeleton/config-skill-skeleton'

interface Skill {
	name: string
	level: number
	icon: string
	experience: number
	color: string
	type: 'skill' | 'competence'
}

export default function ConfigSkill() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const { data: skills, isLoading } = useGetSkillsQuery()

	const createSkill = useCreateSkillMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-skill"])
			setAlert({ title: "Sucesso!", message: "Habilidade criada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao criar a habilidade!", type: "error" })
		},
	})

	const updateSkill = useUpdateSkillMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-skill"])
			setAlert({ title: "Sucesso!", message: "Habilidade atualizada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao atualizar a habilidade!", type: "error" })
		},
	})

	const handleEditClick = (skill: SkillType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedSkill(skill)
		setIsOpen(true)
	}

	const handleDeleteClick = (skill: SkillType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedSkill(skill)
		setIsDeleteDialogOpen(true)
	}

	const handleCardClick = (skill: SkillType) => {
		setSelectedSkill(skill)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedSkill(null)
		setIsOpen(true)
	}

	const handleSave = (newSkill: Skill) => {
		const experience = Number(newSkill.experience)
		const level = Number(newSkill.level)

		if (selectedSkill) {
			const id = selectedSkill.id
			updateSkill.mutate({ ...newSkill, experience, level, id })
		} else {
			createSkill.mutate({ ...newSkill, experience, level })
		}
	}

	const isMutationLoading = createSkill.isLoading || updateSkill.isLoading

	if (isLoading) return <ConfigSkillSkeleton />

	return (
		<div className="flex flex-col h-full min-h-0">
			<div className="flex-shrink-0">
				<PageHeader
					title="Habilidades e Competências"
					titleIcon={<FaCode size={24} className="text-cyan-400" />}
					buttonText="Criar habilidade"
					buttonIcon={<IoIosAdd size={20} />}
					onButtonClick={handleAddClick}
				/>
			</div>
			<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-auto-rows-[minmax(220px,auto)] pb-4">
				{skills &&
					skills.map((skill: SkillType) => (
						<Card
							key={skill.id}
							onClick={() => handleCardClick(skill)}
							className="
								bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 
								transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 
								cursor-pointer group overflow-hidden relative h-full min-h-[220px] flex flex-col"
						>
							<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

							<CardHeader className="pb-2 text-center">
								<CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
									{skill.name}
								</CardTitle>
							</CardHeader>

							<CardContent className="pb-2 px-3">
								<div className="space-y-3">
									<div className="space-y-1">
										<div className="flex justify-between text-xs">
											<span className="text-gray-400">Nível:</span>
											<span className="text-cyan-400">{skill.level}/5</span>
										</div>

										<SegmentedProgress value={skill.level} max={5} className="my-1" />
									</div>

									<div className="flex justify-between items-center text-xs">
										<span className="text-gray-400">Experiência:</span>
										<Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
											{skill.experience} {skill.experience === 1 ? "ano" : "anos"}
										</Badge>
									</div>

									<div className="flex justify-between items-center text-xs">
										<span className="text-gray-400">Tipo:</span>
										<Badge
											variant="outline"
											className={`${skill.type === "skill"
												? "bg-blue-500/10 text-blue-400 border-blue-500/30"
												: "bg-purple-500/10 text-purple-400 border-purple-500/30"
												} text-xs`}
										>
											{skill.type === "skill" ? "Habilidade" : "Competência"}
										</Badge>
									</div>
								</div>
							</CardContent>

							<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
								<Button
									size="sm"
									variant="ghost"
									className="h-6 w-6 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
									onClick={(e) => handleEditClick(skill, e)}
								>
									<FaEdit size={12} />
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
									onClick={(e) => handleDeleteClick(skill, e)}
								>
									<FaTrash size={12} />
								</Button>
							</div>
						</Card>
					))}
				<Card
					onClick={handleAddClick}
					className="bg-[#070b14] border border-dashed border-[#1e2a4a] hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] h-full cursor-pointer group"
				>
					<div className="flex flex-col items-center justify-center gap-3 text-gray-500 group-hover:text-cyan-400 transition-colors">
						<div className="w-12 h-12 rounded-full bg-[#0c1220] flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
							<IoIosAdd size={30} className="transition-transform group-hover:scale-110 duration-300" />
						</div>
						<p className="font-medium text-sm">Criar habilidade</p>
					</div>
				</Card>
				</div>
			</div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent
					className="
					fixed top-1/2 left-1/2 
					p-4 rounded-lg
					transform -translate-x-1/2 -translate-y-1/2 
					bg-[#0c1220] border border-[#1e2a4a] 
					text-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto
					scrollbar-thin
					scrollbar-track-transparent scrollbar-track-rounded-lg
					scrollbar-thumb-cyan-400 scrollbar-thumb-rounded-lg
					hover:scrollbar-thumb-cyan-400
					"
				>
					<div className="mb-4">
						<DialogTitle className="text-xl font-semibold text-cyan-400 flex items-center justify-between gap-2">
							<div className="flex gap-2 items-center">
								<FaCode size={18} />
								{selectedSkill ? 'Editar Habilidade' : 'Criar habilidade'}
							</div>
							<IoClose className="cursor-pointer" onClick={() => setIsOpen(false)} />
						</DialogTitle>
					</div>
					<FormSkill selectedSkill={selectedSkill} handleSave={handleSave} isSubmitting={isMutationLoading} />
				</DialogContent>
			</Dialog>

			<DeleteDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title="Confirmar exclusão"
				description={
					<>
						Tem certeza que deseja excluir a habilidade{' '}
						<span className="font-semibold text-gray-300">
							{selectedSkill?.name}
						</span>
						?<br />
						Esta ação não pode ser desfeita.
					</>
				}
				cancelText="Cancelar"
				confirmText="Excluir"
				isLoading={false}
				onConfirm={() => { }}
			/>
		</div>
	)
}
