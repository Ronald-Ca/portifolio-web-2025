
import { useGetSkillsQuery } from '../../queries/skill'
import { ProjectType } from '../../services/project-service'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { FaSpinner } from 'react-icons/fa'

interface ProjectFormProps {
	selectedProject?: ProjectType
	handleSave: (project: ProjectType) => void
	isSubmitting?: boolean
}

export function FormProject({ selectedProject, handleSave, isSubmitting }: ProjectFormProps) {
	const form = useForm({
		defaultValues: {
			name: selectedProject?.name || '',
			image: selectedProject?.image || '',
			video: selectedProject?.video || '',
			description: selectedProject?.description || '',
			link: selectedProject?.link || '',
			skillsId: selectedProject?.projectSkills?.map((skill) => skill.skillId) || [],
		},
	})

	const [imagePreview, setImagePreview] = useState<string | null>(typeof selectedProject?.image === 'string' ? selectedProject.image : null)
	const [videoPreview, setVideoPreview] = useState<string | null>(typeof selectedProject?.video === 'string' ? selectedProject.video : null)
	const [skillsId, setSkillsId] = useState<string[]>(Array.isArray(selectedProject?.projectSkills) ? selectedProject.projectSkills.map((skill) => skill.id).filter((id): id is string => !!id) : [])
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const videoInputRef = useRef<HTMLInputElement | null>(null)

	const { data: skills } = useGetSkillsQuery()

	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setPreview: React.Dispatch<React.SetStateAction<string | null>>,
		formKey: 'image' | 'video',
	) => {
		const file = event.target.files?.[0]
		if (file) {
			const fileURL = URL.createObjectURL(file)
			setPreview(fileURL)
			form.setValue(formKey, file)
		}
	}

	const handleCameraClick = (inputRef: React.RefObject<HTMLInputElement | null>) => {
		inputRef?.current?.click()
	}

	const onSubmit = (data: { name: string; image: string | File; video: string | File; description: string; link: string; skillsId: (string | undefined)[] }) => {
		const newProject: ProjectType = {
			id: selectedProject?.id,
			name: data.name,
			image: data.image,
			video: data.video,
			description: data.description,
			link: data.link,
			projectSkills: skillsId.map((id) => ({ id })),
		}
		handleSave(newProject)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Nome</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Nome do projeto'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Descrição</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Descrição do projeto'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='link'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Link</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Link do projeto'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='skillsId'
					render={({ field }) => {
						const [isOpen, setIsOpen] = useState(false)
						const selectedSkills: string[] = (field.value || []).filter((id): id is string => !!id)
						const handleToggle = () => setIsOpen((prev) => !prev)
						const handleClose = () => setIsOpen(false)
						const handleSkillChange = (skillId: string, checked: boolean) => {
							const newValue = checked
								? [...selectedSkills, skillId]
								: selectedSkills.filter((id) => id !== skillId)
							field.onChange(newValue)
							setSkillsId(newValue.filter((id): id is string => !!id))
							form.setValue('skillsId', newValue)
						}
						const getSkillName = (skillId: string) => {
							const skill = skills?.find((s) => s.id === skillId)
							return skill?.name || skillId
						}
						return (
							<FormItem className="flex flex-col">
								<FormLabel className='text-gray-300'>Skills</FormLabel>
								<div className="flex flex-col gap-3">
									<FormControl>
										<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
											<DropdownMenuTrigger asChild>
												<Button
													variant='outline'
													className='w-full bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md justify-between'
													onClick={(e) => {
														e.preventDefault()
														handleToggle()
													}}
												>
													<span>
														{selectedSkills.length > 0
															? `${selectedSkills.length} skill${selectedSkills.length > 1 ? "s" : ""} selecionada${selectedSkills.length > 1 ? "s" : ""}`
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
													{!skills ? (
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
																		handleSkillChange(skill.id as string, checked)
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
											{selectedSkills.map((skillId) => {
												if (!skillId) return null;
												return (
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
																const newValue = selectedSkills.filter((id) => id !== skillId)
																field.onChange(newValue)
																setSkillsId(newValue.filter((id): id is string => !!id))
																form.setValue('skillsId', newValue)
															}}
														>
															×
														</Button>
													</Badge>
												)
											})}
										</div>
									)}
								</div>
							</FormItem>
						)
					}}
				/>
				<FormItem>
					<FormLabel className='text-gray-300'>Imagem</FormLabel>
					<FormControl>
						<div
							onClick={() => handleCameraClick(fileInputRef)}
							className='h-2h cursor-pointer flex items-center justify-center border-2 border-dashed p-2 rounded-xl'
						>
							{imagePreview ? (
								<img src={imagePreview} alt='Preview' className='w-full h-full object-cover rounded-xl' />
							) : (
								<p className='text-gray-50'>Adicione uma imagem para pré-visualização</p>
							)}
							<Input
								type='file'
								className='hidden'
								onChange={(e) => handleFileChange(e, setImagePreview, 'image')}
								ref={fileInputRef}
							/>
						</div>
					</FormControl>
				</FormItem>
				{/* Vídeo */}
				<FormItem>
					<FormLabel className='text-gray-300'>Vídeo</FormLabel>
					<FormControl>
						<div
							onClick={() => handleCameraClick(videoInputRef)}
							className='h-2h cursor-pointer flex items-center justify-center border-2 border-dashed p-2 rounded-xl'
						>
							{videoPreview ? (
								<video src={videoPreview} className='w-full h-full object-cover rounded-xl' controls />
							) : (
								<p className='text-gray-50'>Adicione um vídeo para pré-visualização</p>
							)}
							<Input
								type='file'
								className='hidden'
								onChange={(e) => handleFileChange(e, setVideoPreview, 'video')}
								ref={videoInputRef}
							/>
						</div>
					</FormControl>
				</FormItem>

				{/* Botão de Salvar */}
				<div className="flex justify-center mt-4">
					<Button
						type='submit'
						disabled={isSubmitting}
						className={`flex items-center justify-center gap-2 bg-default text-slate-950 border border-slate-950 py-2 px-4 rounded transition-colors ${!isSubmitting && 'hover:text-default hover:bg-slate-950 hover:border-default'
							}`}
					>
						{isSubmitting ? (
							<>
								<FaSpinner className='animate-spin' />
							</>
						) : (
							'Salvar'
						)}
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}
