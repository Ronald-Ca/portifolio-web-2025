import { Button } from '@app/components/ui/button'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateCurriculumMutation, useGetCurriculumQuery } from '@app/queries/curriculum'
import { useState, useRef, useEffect } from 'react'
import { FaFilePdf, FaSave, FaSpinner, FaUpload } from 'react-icons/fa'
import { useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { ConfigCurriculumSkeleton } from '@app/components/common/skeleton/config-curriculum-skeleton'

export default function ConfigCurriculum() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [file, setFile] = useState<File | null>(null)
	const [fileName, setFileName] = useState<string | null>(null)
	const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setFile(file)
			setFileName(file.name)
			const previewUrl = URL.createObjectURL(file)
			setLocalPreviewUrl(previewUrl)
		}
	}

	const handleUploadClick = () => {
		fileInputRef.current?.click()
	}

	const { data: curriculum, isLoading } = useGetCurriculumQuery()

	const createCurriculum = useCreateCurriculumMutation({
		onSuccess: () => {
			queryClient.invalidateQueries(['get-curriculum'])
			setAlert({ title: 'Sucesso!', message: 'Currículo criado com sucesso!', type: 'success' })
			if (localPreviewUrl) {
				URL.revokeObjectURL(localPreviewUrl)
				setLocalPreviewUrl(null)
			}
		},
		onError: () => {
			setAlert({ title: 'Erro ao criar currículo!', message: 'Erro ao criar o currículo!', type: 'error' })
		},
	})

	const updateCurriculum = useCreateCurriculumMutation({
		onSuccess: () => {
			queryClient.invalidateQueries(['get-curriculum'])
			setAlert({ title: 'Sucesso!', message: 'Currículo atualizado com sucesso!', type: 'success' })
			if (localPreviewUrl) {
				URL.revokeObjectURL(localPreviewUrl)
				setLocalPreviewUrl(null)
			}
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar currículo!', message: 'Erro ao atualizar o currículo!', type: 'error' })
		},
	})

	const handleSave = () => {
		if (curriculum?.curriculum) {
			updateCurriculum.mutate({ curriculum: file as File, fileName: fileName as string, id: curriculum.id })
		} else {
			createCurriculum.mutate({ curriculum: file as File, fileName: fileName as string })
		}
	}

	useEffect(() => {
		if (curriculum?.curriculum) {
			setFileName(curriculum.fileName as string)
			if (typeof curriculum.curriculum === 'string') {
				setLocalPreviewUrl(curriculum.curriculum)
			}
		}
	}, [curriculum])

	const isMutating = createCurriculum.isLoading || updateCurriculum.isLoading

	if (isLoading) return <ConfigCurriculumSkeleton />

	return (
		<div className="flex flex-col h-full min-h-0">
		<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
		<div className="min-h-full flex flex-col items-center justify-center py-8 px-2">
			<Card className="bg-[#0c1220] border border-[#1e2a4a] shadow-lg w-full max-w-2xl">
				<CardHeader className="pb-2 flex flex-col items-center">
					<CardTitle className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
						<span className="bg-cyan-500/10 p-2 rounded-md">
							<FaFilePdf className="text-cyan-400" size={24} />
						</span>
						Currículo em PDF
					</CardTitle>
					<p className="text-gray-400 text-sm mt-2 text-center max-w-lg">
						Faça upload do seu currículo em PDF. Ele ficará disponível para download no seu portfólio.
					</p>
				</CardHeader>
				<CardContent className="flex flex-col items-center gap-6">
					<div className="flex flex-col items-center gap-2 w-full">
						<div className="flex gap-3 w-full justify-center">
							<Button
								type="button"
								className="
								flex items-center gap-2 bg-gradient-to-r from-cyan-500 
								to-blue-600 hover:from-cyan-600 hover:to-blue-700 
								text-white font-medium px-6 py-2 rounded-md shadow"
								onClick={handleUploadClick}
							>
								<FaUpload />
								<span>Selecionar PDF</span>
							</Button>
							<Button
								type="button"
								onClick={handleSave}
								disabled={!file || isMutating}
								className="
								flex items-center gap-2 bg-gradient-to-r from-cyan-500
								to-blue-600 hover:from-cyan-600 hover:to-blue-700 
								text-white font-medium px-6 py-2 rounded-md shadow"
							>
								{isMutating ? <FaSpinner className="animate-spin" /> : <FaSave />}
								<span>{isMutating ? 'Salvando...' : 'Salvar'}</span>
							</Button>
							<input
								ref={fileInputRef}
								type="file"
								accept=".pdf"
								className="hidden"
								onChange={handleFileChange}
							/>
						</div>
						{fileName && (
							<span className="text-cyan-400 text-sm mt-1 flex items-center gap-2">
								<FaFilePdf className="text-cyan-400" />
								{fileName}
							</span>
						)}
					</div>
					{localPreviewUrl && (
						<div className="
							w-full h-[32rem] max-w-2xl mt-4 rounded-xl overflow-hidden 
							border border-cyan-900 bg-[#070b14] shadow-inner"
						>
							<iframe
								src={localPreviewUrl || undefined}
								className="w-full h-full border-none rounded-xl"
								title="Pré-visualização do Currículo"
							></iframe>
						</div>
					)}
				</CardContent>
			</Card>
			</div>
		</div>
		</div>
	)
}
