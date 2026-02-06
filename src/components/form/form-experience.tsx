import { useForm, FormProvider } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { moths, years } from '../../utils/moths-and-years'
import { ExperienceType } from '../../services/experience-service'
import { useEffect } from 'react'
import { SkillsMultiSelect } from '@app/components/common/skills-multi-select'
import { FaBriefcase, FaCalendarAlt, FaCode, FaSave, FaSpinner, FaTasks } from 'react-icons/fa'
import { Separator } from '@radix-ui/react-separator'
import { Checkbox } from '../ui/checkbox'
import { modality } from '@app/utils/modality'

interface ExperienceFormProps {
	selectedExperience?: ExperienceType
	handleSave: (experience: ExperienceType) => void
	isSubmitting?: boolean
	onOpenCreateSkill?: () => void
}

export function FormExperience({ selectedExperience, handleSave, isSubmitting = false, onOpenCreateSkill }: ExperienceFormProps) {
	const form = useForm({
		defaultValues: {
			company: "",
			role: "",
			yearInitial: "",
			mothInitial: "",
			yearFinal: "",
			mothFinal: "",
			currentJob: false,
			modality: undefined as string | undefined,
			description: "",
			activities: "",
			experienceSkill: [] as string[],
		},
	})

	const { reset, handleSubmit } = form

	useEffect(() => {
		const defaultValues = {
			company: selectedExperience?.company || "",
			role: selectedExperience?.role || "",
			yearInitial: selectedExperience?.yearInitial?.toString() || "",
			mothInitial: selectedExperience?.mothInitial || "",
			yearFinal: selectedExperience?.yearFinal?.toString() ?? "",
			mothFinal: selectedExperience?.mothFinal ?? "",
			currentJob: selectedExperience?.currentJob ?? false,
			modality: selectedExperience?.modality ?? undefined,
			description: selectedExperience?.description ?? "",
			activities: selectedExperience?.activities ? selectedExperience.activities.join(";\n") : "",
			experienceSkill:
				selectedExperience?.experienceSkill?.map((item) => (typeof item === "string" ? item : item.skillId)) || [],
			id: selectedExperience?.id || "",
		}

		reset(defaultValues)
	}, [selectedExperience, reset])

	const currentJob = form.watch('currentJob')
	const onSubmit = (data: Record<string, unknown>) => {
		const experienceSkillIds = Array.isArray(data.experienceSkill) ? data.experienceSkill as string[] : []
		const newExperience = {
			company: String(data.company),
			role: String(data.role),
			yearInitial: Number.parseInt(String(data.yearInitial)),
			mothInitial: String(data.mothInitial),
			yearFinal: data.currentJob ? undefined : (data.yearFinal && String(data.yearFinal).trim() !== "" ? Number.parseInt(String(data.yearFinal)) : undefined),
			mothFinal: data.currentJob ? "Present" : String(data.mothFinal || ""),
			currentJob: Boolean(data.currentJob),
			modality: data.modality ? (data.modality as 'on-site' | 'hybrid' | 'remote') : undefined,
			description: data.description ? String(data.description).trim() || undefined : undefined,
			activities: String(data.activities)
				.split(";")
				.map((item: string) => item.trim())
				.filter((item: string) => item),
			experienceSkill: experienceSkillIds as any,
			...(selectedExperience?.id ? { id: selectedExperience.id } : {})
		} as ExperienceType
		handleSave(newExperience)
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

					<FormField
						control={form.control}
						name="currentJob"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center gap-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel className="text-gray-300 font-normal cursor-pointer">
									Trabalho atual (ainda atuo neste local)
								</FormLabel>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="modality"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Modalidade</FormLabel>
								<FormControl>
									<Select value={field.value ?? ''} onValueChange={field.onChange}>
										<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
											<SelectValue placeholder="Selecione a modalidade" />
										</SelectTrigger>
										<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100">
											{modality.map((item) => (
												<SelectItem key={item.id} value={item.id} className="focus:bg-cyan-500/20 focus:text-cyan-50">
													{item.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

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
											<Select value={field.value} onValueChange={field.onChange} disabled={currentJob}>
												<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
													<SelectValue placeholder={currentJob ? "Atual" : "Selecione o Ano"} />
												</SelectTrigger>
												<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
													<SelectItem key="Present" value="Present" className="focus:bg-cyan-500/20 focus:text-cyan-50">
														Atual
													</SelectItem>
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
											<Select value={field.value} onValueChange={field.onChange} disabled={currentJob}>
												<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
													<SelectValue placeholder={currentJob ? "Atual" : "Selecione o Mês"} />
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
						<h3 className="text-gray-300 font-medium">Descrição e Atividades</h3>
					</div>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Descrição (o que está desenvolvendo)</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Resumo do que você faz ou desenvolve neste cargo..."
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md min-h-[80px] resize-y"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

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
					<div className="flex items-center justify-between gap-2 mb-2">
						<div className="flex items-center gap-2">
							<FaCode className="text-cyan-500" size={16} />
							<h3 className="text-gray-300 font-medium">Tecnologias Utilizadas</h3>
						</div>
						{onOpenCreateSkill && (
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="bg-[#070b14] border-[#1e2a4a] text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
								onClick={onOpenCreateSkill}
							>
								Criar habilidade
							</Button>
						)}
					</div>

					<FormField
						control={form.control}
						name="experienceSkill"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormControl>
									<SkillsMultiSelect
										label="Stacks"
										value={field.value ?? []}
										onChange={(v) => field.onChange(v)}
									/>
								</FormControl>
							</FormItem>
						)}
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
