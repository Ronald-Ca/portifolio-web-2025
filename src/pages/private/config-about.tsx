import { useAlert } from '@app/contexts/alert-context'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCamera, FaUser } from 'react-icons/fa'
import { Input } from '@app/components/ui/input'
import { FormAbout } from '@app/components/form/form-about'
import { useCreateAboutMutation, useGetAboutQuery, useUpdateAboutMutation } from '@app/queries/about'
import { Card, CardContent } from '@app/components/ui/card'
import { ConfigAboutSkeleton } from '@app/components/common/skeleton/config-about-skeleton'

interface About {
	image: File | null
	name: string
	birthDate: string
	city: string
	state: string
}

export default function ConfigAbout() {
	const { setAlert } = useAlert()
	const [imagePreview, setImagePreview] = useState("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)

	const { data: about, isSuccess, isLoading } = useGetAboutQuery()

	const formMethods = useForm<About>({
		defaultValues: {
			image: null,
			name: "",
			birthDate: "",
			city: "",
			state: "",
		},
	})

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

	const createAbout = useCreateAboutMutation({
		onSuccess: () => {
			setAlert({ title: "Sucesso!", message: "Dados da página Sobre criados com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro ao criar!", message: "Erro ao criar os dados da página Sobre!", type: "error" })
		},
	})

	const updateAbout = useUpdateAboutMutation({
		onSuccess: () => {
			setAlert({ title: "Sucesso!", message: "Dados da página Sobre atualizados com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro ao atualizar!", message: "Erro ao atualizar os dados da página Sobre!", type: "error" })
		},
	})

	const onSubmit = (data: About) => {
		if (about) {
			const newData = { ...data, id: about.id }
			updateAbout.mutate(newData)
		} else {
			createAbout.mutate(data)
		}
	}

	useEffect(() => {
		if (isSuccess && about) {
			if (about.image && typeof about.image === "string") {
				setImagePreview(about.image)
			} else {
				setImagePreview("")
			}

			const birthDateStr = about.birthDate
				? String(about.birthDate).split("T")[0]
				: ""

			formMethods.reset({
				image: null,
				name: about.name ?? "",
				birthDate: birthDateStr,
				city: about.city ?? "",
				state: about.state ?? "",
			})
		}
	}, [isSuccess, about?.id, about?.name, about?.birthDate, about?.city, about?.state, about?.image])

	const isMutating = createAbout.isLoading || updateAbout.isLoading

	if (isLoading) return <ConfigAboutSkeleton />

	return (
		<FormProvider {...formMethods}>
			<div className="flex flex-col h-full min-h-0 overflow-hidden">
			<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
			<div className="min-h-full flex flex-col items-center py-4">
				<div className="w-full max-w-2xl">
					<h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
						<span className="bg-cyan-500/10 p-2 rounded-md">
							<FaUser className="text-cyan-400" size={20} />
						</span>
						Informações Pessoais
					</h2>

					<Card className="bg-[#070b14] border border-[#1e2a4a] shadow-lg overflow-hidden">
						<CardContent className="p-6">
							<div className="flex flex-col gap-8">
								<div className="flex flex-col items-center">
									<div className="relative group">
										{imagePreview ? (
											<div className="
												relative w-48 h-48 rounded-full overflow-hidden 
												border-4 border-cyan-500/30 shadow-lg shadow-cyan-500/20
											">
												<img
													src={imagePreview || "/placeholder.svg"}
													alt="Preview"
													className="
													w-full h-full object-cover transition-transform 
													duration-300 group-hover:scale-105
												"/>
											</div>
										) : (
											<div className="
												w-48 h-48 flex items-center justify-center 
												bg-gradient-to-br from-[#111827] to-[#0c1a2c] 
												rounded-full border-4 border-dashed border-[#1e2a4a]
											">
												<span className="text-gray-400 text-sm">Adicione sua foto</span>
											</div>
										)}
										<button
											onClick={handleCameraClick}
											className="
											absolute bottom-2 right-2 bg-cyan-500 hover:bg-cyan-600 
											text-white p-3 rounded-full shadow-lg transform transition-all 
											duration-300 hover:scale-110 focus:outline-none focus:ring-2 
											focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b14]
										">
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
										Esta foto será exibida na seção "Sobre" do seu portfólio
									</p>
								</div>

								<div className="w-full">
									<div className="bg-[#0c1220] rounded-lg p-5 border border-[#1e2a4a]">
										<FormAbout onSubmit={onSubmit} isSubmitting={isMutating} initialCity={about?.city ?? ''} />
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			</div>
			</div>
		</FormProvider>
	)
}

