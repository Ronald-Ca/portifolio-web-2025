import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaClock, FaCode, FaPalette, FaRulerHorizontal, FaSave, FaSpinner } from 'react-icons/fa'
import { IoMdColorPalette } from 'react-icons/io'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { Separator } from '@radix-ui/react-separator'
import { TbCategory } from 'react-icons/tb'
import { useEffect } from 'react'
import { Slider } from '@radix-ui/react-slider'
import { IconPicker } from '../common/icon-picker/IconPicker'
import { SegmentedProgress } from '../ui/segmented-progress'
import { SkillType } from '@app/services/skill-service'

interface SkillFormProps {
	selectedSkill: SkillType | null
	handleSave: (skill: SkillType) => void
	isSubmitting?: boolean
}

// Paleta de cores predefinidas
const colorPalette = [
	"#0ea5e9", // cyan
	"#3b82f6", // blue
	"#8b5cf6", // violet
	"#d946ef", // fuchsia
	"#ec4899", // pink
	"#f43f5e", // rose
	"#ef4444", // red
	"#f97316", // orange
	"#f59e0b", // amber
	"#84cc16", // lime
	"#10b981", // emerald
	"#14b8a6", // teal
]

export default function FormSkill({ selectedSkill, handleSave, isSubmitting = false }: SkillFormProps) {

	const form = useForm<Skill>({
		defaultValues: {
			name: "",
			level: 1,
			experience: 1,
			icon: "💻",
			color: "#0ea5e9",
			type: "skill",
		},
	})

	const { setValue } = form


	useEffect(() => {
		if (selectedSkill) {
			form.reset({
				name: selectedSkill.name || "",
				level: selectedSkill.level || 1,
				experience: selectedSkill.experience || 1,
				icon: selectedSkill.icon || "💻",
				color: selectedSkill.color || "#0ea5e9",
				type: selectedSkill.type || "skill",
			})
		} else {
			form.reset({
				name: "",
				level: 5,
				experience: 1,
				icon: "💻",
				color: "#0ea5e9",
				type: "skill",
			})
		}
	}, [selectedSkill, form])

	const onSubmit = (data: Skill) => {
		handleSave(data)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaCode className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Informações Básicas</h3>
					</div>

					<FormField
						control={form.control}
						name="name"
						rules={{ required: "O nome da habilidade é obrigatório" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Nome da Habilidade</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Ex: React, JavaScript, Liderança"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center gap-2">
									<TbCategory className="text-cyan-500/70" size={14} />
									Tipo
								</FormLabel>
								<div className="flex gap-4 mt-1">
									<Button
										type="button"
										variant={field.value === "skill" ? "default" : "outline"}
										className={`flex-1 ${field.value === "skill"
											? "bg-gradient-to-r from-cyan-500 to-blue-600"
											: "bg-[#070b14] border border-[#1e2a4a] text-gray-400"
											}`}
										onClick={() => setValue("type", "skill")}
									>
										Habilidade Técnica
									</Button>
									<Button
										type="button"
										variant={field.value === "competence" ? "default" : "outline"}
										className={`flex-1 ${field.value === "competence"
											? "bg-gradient-to-r from-purple-500 to-pink-600"
											: "bg-[#070b14] border border-[#1e2a4a] text-gray-400"
											}`}
										onClick={() => setValue("type", "competence")}
									>
										Competência
									</Button>
								</div>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>
				</div>

				<Separator className="bg-[#1e2a4a]" />

				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaRulerHorizontal className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Nível e Experiência</h3>
					</div>

					<FormField
						control={form.control}
						name="level"
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<div className="flex justify-between items-center">
									<FormLabel className="text-gray-300">Nível de Proficiência</FormLabel>
									<span className="text-cyan-400 font-medium">{value}/5</span>
								</div>
								<FormControl>
									<SegmentedProgress value={value} max={5} onChange={onChange} className="my-2" />
								</FormControl>
								<div className="flex justify-between text-xs text-gray-500 px-1">
									<span>Iniciante</span>
									<span>Intermediário</span>
									<span>Avançado</span>
								</div>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="experience"
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<div className="flex justify-between items-center">
									<FormLabel className="text-gray-300 flex items-center gap-2">
										<FaClock className="text-cyan-500/70" size={14} />
										Tempo de Experiência (anos)
									</FormLabel>
									<Input
										type="number"
										min={1}
										max={20}
										value={value}
										onChange={e => onChange(Number(e.target.value))}
										className="w-16 bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md text-center"
									/>
								</div>
								<FormControl>
									<Slider
										min={1}
										max={20}
										step={1}
										value={[value]}
										onValueChange={(vals) => onChange(vals[0])}
										className="py-4"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>
				</div>

				<Separator className="bg-[#1e2a4a]" />

				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FaPalette className="text-cyan-500" size={16} />
						<h3 className="text-gray-300 font-medium">Aparência</h3>
					</div>

					<FormField
						control={form.control}
						name="icon"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center gap-2">
									<MdOutlineEmojiEmotions className="text-cyan-500/70" size={16} />
									Ícone (emoji)
								</FormLabel>
								<FormControl>
									<div>
										<IconPicker
											onSelect={(iconName) => field.onChange(iconName)}
											size={28}
											color={form.watch('color') || '#0ea5e9'}
										/>
									</div>
								</FormControl>
								{field.value && (
									<div className="mt-2 text-xs text-cyan-400">Ícone selecionado: <span className="font-mono">{field.value}</span></div>
								)}
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="color"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center gap-2">
									<IoMdColorPalette className="text-cyan-500/70" size={16} />
									Cor
								</FormLabel>
								<div className="flex items-center gap-3">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div className="relative">
													<div
														className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner overflow-hidden"
														style={{ backgroundColor: field.value }}
													/>
													<FormControl>
														<Input
															{...field}
															type="color"
															className="absolute inset-0 opacity-0 cursor-pointer w-10 h-10"
														/>
													</FormControl>
													<div className="absolute -right-1 -bottom-1 bg-[#070b14] rounded-full p-1 border border-[#1e2a4a]">
														<FaPalette size={10} className="text-cyan-400" />
													</div>
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>Selecione uma cor personalizada</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
									{/* Substituir a div de valor da cor por um input manual */}
									<Input
										value={field.value}
										onChange={e => field.onChange(e.target.value)}
										placeholder="#0ea5e9"
										className="w-28 bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md text-sm uppercase"
										maxLength={7}
									/>
								</div>
								<div className="flex flex-wrap gap-2 mt-2">
									{colorPalette.map((color) => (
										<Button
											key={color}
											type="button"
											variant="outline"
											size="sm"
											className="h-8 w-8 p-0 border hover:border-white"
											style={{ backgroundColor: color }}
											onClick={() => setValue("color", color)}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
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
