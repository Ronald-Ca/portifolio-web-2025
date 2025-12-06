import { useForm, FormProvider } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { moths, years } from '../../utils/moths-and-years'
import { ExperienceType } from '../../services/experience-service'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useGetSkillsQuery } from '@app/queries/skill'
import { FaBriefcase, FaCalendarAlt, FaCode, FaSave, FaSpinner, FaTasks } from 'react-icons/fa'
import { Separator } from '@radix-ui/react-separator'
import { Badge } from '../ui/badge'
import { ScrollArea } from '@radix-ui/react-scroll-area'

interface ExperienceFormProps {
	selectedExperience?: ExperienceType
	handleSave: (experience: ExperienceType) => void
	isSubmitting?: boolean
}

export function FormExperience({ selectedExperience, handleSave, isSubmitting = false }: ExperienceFormProps) {
	const form = useForm({
		defaultValues: {
			company: "",
			role: "",
			yearInitial: "",
			mothInitial: "",
			yearFinal: "",
			mothFinal: "",
			activities: "",
			experienceSkill: [] as string[],
		},
	})

	const { reset, handleSubmit, watch, setValue } = form
	const { data: skills, isLoading: isLoadingSkills } = useGetSkillsQuery()
	const [selectedSkills, setSelectedSkills] = useState<string[]>([])
	const [isOpen, setIsOpen] = useState(false)

	// Observar mudanças no campo experienceSkill
	const experienceSkillValue = watch("experienceSkill")

	useEffect(() => {
		setSelectedSkills(experienceSkillValue || [])
	}, [experienceSkillValue])

	useEffect(() => {
		const defaultValues = {
			company: selectedExperience?.company || "",
			role: selectedExperience?.role || "",
			yearInitial: selectedExperience?.yearInitial?.toString() || "",
			mothInitial: selectedExperience?.mothInitial || "",
			yearFinal: selectedExperience?.yearFinal?.toString() || "",
			mothFinal: selectedExperience?.mothFinal || "",
			activities: selectedExperience?.activities ? selectedExperience.activities.join(";\n") : "",
			experienceSkill:
				selectedExperience?.experienceSkill?.map((item) => (typeof item === "string" ? item : item.skillId)) || [],
			id: selectedExperience?.id || "",
		}

		reset(defaultValues)
		setSelectedSkills(defaultValues.experienceSkill || [])
	}, [selectedExperience, reset])

	const onSubmit = (data: Record<string, unknown>) => {
		const newExperience: ExperienceType = {
			...data,
			yearInitial: Number.parseInt(data.yearInitial),
			yearFinal: data.yearFinal ? Number.parseInt(data.yearFinal) : undefined,
			activities: data.activities
				.split(";")
				.map((item: string) => item.trim())
				.filter((item: string) => item),
		}
		handleSave(newExperience)
	}

	// Função para obter o nome da skill pelo ID
	const getSkillName = (skillId: string) => {
		const skill = skills?.find((s) => s.id === skillId)
		return skill?.name || skillId
	}

	const handleToggle = () => setIsOpen((prev) => !prev)
	const handleClose = () => setIsOpen(false)

	const handleSkillChange = (skillId: string, checked: boolean, field: { value?: string[] }) => {
		const newValue = checked
			? [...(field.value ?? []), skillId]
			: (field.value ?? []).filter((id: string) => id !== skillId)

		const sanitizedValue = newValue.filter((id: string | undefined): id is string => id !== undefined)

		field.onChange(sanitizedValue)
		setValue("experienceSkill", sanitizedValue)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaBriefcase className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Informações da Empresa</h3>
					</div>

					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="company"
							rules={{ required: "O nome da empresa é obrigatório" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-300">Empresa/Organização</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Ex: Google, Microsoft, Freelancer"
											className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
										/>
									</FormControl>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							rules={{ required: "O cargo é obrigatório" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-300">Cargo/Função</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Ex: Desenvolvedor Full Stack, UX Designer"
											className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
										/>
									</FormControl>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Separator className="bg-[#1e2a4a]" />

				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaCalendarAlt className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Período</h3>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="yearInitial"
								rules={{ required: "O ano inicial é obrigatório" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300">Ano Inicial</FormLabel>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
													<SelectValue placeholder="Selecione o Ano" />
												</SelectTrigger>
												<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
													{years.map((year) => (
														<SelectItem
															key={year.year}
															value={year.year.toString()}
															className="focus:bg-cyan-500/20 focus:text-cyan-50"
														>
															{year.year}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="mothInitial"
								rules={{ required: "O mês inicial é obrigatório" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300">Mês Inicial</FormLabel>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
													<SelectValue placeholder="Selecione o Mês" />
												</SelectTrigger>
												<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
													{moths.map((month) => (
														<SelectItem
															key={month.id}
															value={month.abbreviation}
															className="focus:bg-cyan-500/20 focus:text-cyan-50"
														>
															{month.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-4">
							<FormField
								control={form.control}
								name="yearFinal"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300">Ano Final</FormLabel>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
													<SelectValue placeholder="Selecione o Ano" />
												</SelectTrigger>
												<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
													{years.map((year) => (
														<SelectItem
															key={year.year}
															value={year.year.toString()}
															className="focus:bg-cyan-500/20 focus:text-cyan-50"
														>
															{year.year}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="mothFinal"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300">Mês Final</FormLabel>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
													<SelectValue placeholder="Selecione o Mês" />
												</SelectTrigger>
												<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
													<SelectItem key="Present" value="Present" className="focus:bg-cyan-500/20 focus:text-cyan-50">
														Atual
													</SelectItem>
													{moths.map((month) => (
														<SelectItem
															key={month.id}
															value={month.abbreviation}
															className="focus:bg-cyan-500/20 focus:text-cyan-50"
														>
															{month.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				<Separator className="bg-[#1e2a4a]" />

				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaTasks className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Atividades Desenvolvidas</h3>
					</div>

					<FormField
						control={form.control}
						name="activities"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Atividades</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Descreva suas atividades e responsabilidades (separe cada atividade com ponto e vírgula ';')"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md min-h-[120px] resize-y"
									/>
								</FormControl>
								<p className="text-xs text-gray-500 mt-1">
									Exemplo: Desenvolvimento de APIs RESTful; Implementação de interfaces responsivas; Otimização de
									consultas SQL
								</p>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>
				</div>

				<Separator className="bg-[#1e2a4a]" />

				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaCode className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Tecnologias Utilizadas</h3>
					</div>

					<FormField
						control={form.control}
						name="experienceSkill"
						render={({ field }) => {
							return (
								<FormItem className="flex flex-col">
									<FormLabel className="text-gray-300">Skills</FormLabel>
									<div className="flex flex-col gap-3">
										<FormControl>
											<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
												<DropdownMenuTrigger asChild>
													<Button
														variant="outline"
														className="w-full bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md justify-between"
														onClick={(e) => {
															e.preventDefault()
															handleToggle()
														}}
													>
														<span>
															{selectedSkills?.length > 0
																? `${selectedSkills.length} skill${selectedSkills.length > 1 ? "s" : ""} selecionada${selectedSkills.length > 1 ? "s" : ""
																}`
																: "Selecionar skills"}
														</span>
														<span className="text-gray-400">▼</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													className="w-[300px] bg-[#0c1220] border border-[#1e2a4a] text-gray-100 rounded-md shadow-lg shadow-black/20"
													onClick={(e) => e.stopPropagation()}
													onPointerDownOutside={(e) => {
														e.preventDefault()
														handleClose()
													}}
												>
													<DropdownMenuLabel className="text-cyan-400 font-medium border-b border-[#1e2a4a] pb-2">
														Selecione as Skills
													</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<ScrollArea className="h-[200px]">
														{isLoadingSkills ? (
															<div className="flex justify-center items-center h-20">
																<FaSpinner className="animate-spin text-cyan-500" />
															</div>
														) : (
															skills?.map((skill) => {
																if (!skill.id) return null
																const isChecked = field.value?.includes(skill.id) ?? false

																return (
																	<DropdownMenuCheckboxItem
																		key={skill.id}
																		checked={isChecked}
																		className="focus:bg-cyan-500/20 focus:text-cyan-50 cursor-pointer"
																		onCheckedChange={(checked) => {
																			skill.id && handleSkillChange(skill.id, checked, field)
																		}}
																	>
																		{skill.name}
																	</DropdownMenuCheckboxItem>
																)
															})
														)}
													</ScrollArea>
												</DropdownMenuContent>
											</DropdownMenu>
										</FormControl>

										{selectedSkills.length > 0 && (
											<div className="flex flex-wrap gap-2 mt-2">
												{selectedSkills.map((skillId) => (
													<Badge
														key={skillId}
														variant="outline"
														className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 flex items-center gap-1 pl-2 pr-1 py-1"
													>
														{getSkillName(skillId)}
														<Button
															variant="ghost"
															size="sm"
															className="h-4 w-4 p-0 text-cyan-400 hover:text-cyan-100 hover:bg-transparent"
															onClick={(e) => {
																e.preventDefault()
																const newValue = field.value.filter((id: string) => id !== skillId)
																field.onChange(newValue)
																setValue("experienceSkill", newValue)
															}}
														>
															×
														</Button>
													</Badge>
												))}
											</div>
										)}
									</div>
								</FormItem>
							)
						}}
					/>
				</div>

				<div className="pt-4 flex justify-end">
					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-md transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
					>
						{isSubmitting ? (
							<>
								<FaSpinner className="animate-spin" />
								<span>Salvando...</span>
							</>
						) : (
							<>
								<FaSave />
								<span>Salvar</span>
							</>
						)}
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}
