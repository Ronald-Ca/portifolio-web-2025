import { FormHome } from '@app/components/form/form-home'
import FormSkill from '@app/components/form/form-skill'
import { Input } from '@app/components/ui/input'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateHomeMutation, useGetHomeQuery, useUpdateHomeMutation } from '@app/queries/home'
import { useCreateSkillMutation } from '@app/queries/skill'
import { HomeType } from '@app/services/home-service'
import { SkillType } from '@app/services/skill-service'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@app/queries/query-keys'
import { FaCamera, FaCode } from 'react-icons/fa'
import { IoMdColorPalette } from 'react-icons/io'
import { Card, CardContent } from '@app/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@app/components/ui/dialog'
import { ConfigHomeSkeleton } from '@app/components/common/skeleton/config-home-skeleton'
import { SkillsMultiSelect } from '@app/components/common/skills-multi-select'

export default function ConfigHome() {
	const [imagePreview, setImagePreview] = useState("")
	const [bgImagePreview, setBgImagePreview] = useState("")
	const { setAlert } = useAlert()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const bgFileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)
	const [, setSelectedBgFile] = useState<File | null>(null)
	const [isCreateSkillOpen, setIsCreateSkillOpen] = useState(false)

	const queryClient = useQueryClient()
	const { data: home, isSuccess, isLoading } = useGetHomeQuery()

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

	const formMethods = useForm<HomeType>({
		defaultValues: {
			image: null,
			title: "",
			role: "",
			description: "",
			colorBackground: "#0f172a",
			imageBackground: null,
			mainSkills: [],
		},
	})

	const mainSkills = formMethods.watch('mainSkills') ?? []

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const imageURL = URL.createObjectURL(file)
			setImagePreview(imageURL)
			setSelectedFile(file)
			formMethods.setValue("image", file)
		}
	}

	const handleCameraClick = () => {
		fileInputRef.current?.click()
	}

	const handleBgImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const imageURL = URL.createObjectURL(file)
			setBgImagePreview(imageURL)
			setSelectedBgFile(file)
			formMethods.setValue("imageBackground", file)
		}
	}

	const handleBgImageClick = () => {
		bgFileInputRef.current?.click()
	}

	const createHome = useCreateHomeMutation({
		onSuccess: () => {
			setAlert({ title: "Sucesso!", message: "Dados da Home Page criados com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro ao criar Home!", message: "Erro ao criar os dados da Home Page!", type: "error" })
		},
	})

	const updateHome = useUpdateHomeMutation({
		onSuccess: () => {
			setAlert({ title: "Sucesso!", message: "Dados da Home Page atualizados com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro ao atualizar Home!", message: "Erro ao atualizar os dados da Home Page!", type: "error" })
		},
	})

	const onSubmit = (data: HomeType) => {
		if (home) {
			const newData = { ...data, id: home.id }
			updateHome.mutate(newData)
		} else {
			createHome.mutate(data)
		}
	}

	const handleSaveSkill = (data: SkillType) => {
		const experience = Number(data.experience)
		const level = Number(data.level)
		createSkill.mutate({ ...data, experience, level })
	}

	useEffect(() => {
		if (isSuccess && home) {
			if (home.image && typeof home.image === "string") {
				setImagePreview(home.image)
			}
			if (home.imageBackground && typeof home.imageBackground === "string") {
				setBgImagePreview(home.imageBackground)
			}
			const mainSkillIds = Array.isArray(home.mainSkills)
				? home.mainSkills.map((s: { id?: string } | string) => (typeof s === 'string' ? s : s.id)).filter(Boolean) as string[]
				: []
			formMethods.reset({
				image: null,
				title: home.title,
				role: home.role,
				description: home.description ?? "",
				colorBackground: home.colorBackground || "#0f172a",
				imageBackground: null,
				mainSkills: mainSkillIds,
			})
		}
	}, [isSuccess, home, formMethods])

	const isMutating = createHome.isLoading || updateHome.isLoading

	if (isLoading) return <ConfigHomeSkeleton />

	return (
		<FormProvider {...formMethods}>
			<div className="flex flex-col h-full min-h-0 overflow-hidden">
			<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
			<div className="min-h-full flex flex-col items-center py-4">
				<div className="w-full max-w-3xl">
					<h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
						<span className="bg-cyan-500/10 p-2 rounded-md">
							<IoMdColorPalette className="text-cyan-400" size={24} />
						</span>
						Configuração da Página Inicial
					</h2>

					<Card className="bg-[#070b14] border border-[#1e2a4a] shadow-lg overflow-hidden">
						<CardContent className="p-6">
							<div className="flex flex-col gap-8">
								<div className="flex flex-col items-center">
									<div className="relative group">
										{imagePreview ? (
											<div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg shadow-cyan-500/20">
												<img
													src={imagePreview || "/placeholder.svg"}
													alt="Preview"
													className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											</div>
										) : (
											<div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-[#111827] to-[#0c1a2c] rounded-full border-4 border-dashed border-[#1e2a4a]">
												<span className="text-gray-400 text-sm">Sem imagem de perfil</span>
											</div>
										)}
										<button
											onClick={handleCameraClick}
											className="absolute bottom-2 right-2 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b14]"
										>
											<FaCamera size={18} />
										</button>
										<Input
											type="file"
											className="hidden"
											onChange={handleImageChange}
											ref={fileInputRef}
											accept="image/*"
										/>
									</div>
									<p className="mt-3 text-gray-400 text-sm">
										Clique no ícone da câmera para alterar sua foto de perfil
									</p>
								</div>

								<div className="w-full">
									<h3 className="text-gray-300 font-medium mb-2 flex items-center gap-2">
										<span className="h-1 w-1 rounded-full bg-cyan-400"></span>
										Imagem de Fundo
									</h3>
									<div
										className="relative w-full h-56 rounded-lg overflow-hidden cursor-pointer group border border-[#1e2a4a] shadow-md"
										onClick={handleBgImageClick}
									>
										{bgImagePreview ? (
											<div className="relative w-full h-full">
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
												<img
													src={bgImagePreview || "/placeholder.svg"}
													alt="Background Preview"
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											</div>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#111827] to-[#0c1a2c]">
												<span className="text-gray-400 text-sm">Clique para adicionar uma imagem de fundo</span>
											</div>
										)}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
											<div className="bg-cyan-500 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
												<FaCamera size={20} />
											</div>
										</div>
										<Input
											type="file"
											className="hidden"
											onChange={handleBgImageChange}
											ref={bgFileInputRef}
											accept="image/*"
										/>
									</div>
									<p className="mt-2 text-gray-400 text-sm">
										Recomendação: use uma imagem com boa resolução (1920x1080 ou maior)
									</p>
								</div>

								<div className="w-full">
									<SkillsMultiSelect
										label="Principais stacks"
										placeholder="Selecionar principais stacks"
										dropdownLabel="Principais stacks"
										value={Array.isArray(mainSkills) ? mainSkills.map((s): string => (typeof s === 'string' ? s : s.id)) : []}
										onChange={(v) => formMethods.setValue('mainSkills', v)}
										showCreateButton
										onCreateClick={() => setIsCreateSkillOpen(true)}
									/>
								</div>

								<div className="w-full">
									<h3 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
										<span className="h-1 w-1 rounded-full bg-cyan-400"></span>
										Informações Pessoais
									</h3>
									<div className="bg-[#0c1220] rounded-lg p-5 border border-[#1e2a4a]">
										<FormHome onSubmit={onSubmit} isSubmitting={isMutating} />
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			</div>
			</div>

			<Dialog open={isCreateSkillOpen} onOpenChange={setIsCreateSkillOpen}>
				<DialogContent
					className="
						bg-[#0c1220] border border-[#1e2a4a] text-gray-100
						max-w-2xl max-h-[90vh] overflow-y-auto
						scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400
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
		</FormProvider>
	)
}