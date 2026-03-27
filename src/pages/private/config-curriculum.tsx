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
		<div className="min-h-full flex flex-col items-center justify-start sm:justify-center py-4 sm:py-8 px-3 sm:px-4">
			<Card className="bg-[#0c1220] border border-[#1e2a4a] shadow-lg w-full max-w-2xl">
				<CardHeader className="pb-2 flex flex-col items-center px-4 pt-4 sm:pt-6">
					<CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
						<span className="bg-cyan-500/10 p-1.5 sm:p-2 rounded-md inline-flex shrink-0">
							<FaFilePdf className="text-cyan-400 w-6 h-6 sm:w-7 sm:h-7" />
						</span>
						<span className="leading-tight">Currículo em PDF</span>
					</CardTitle>
					<p className="text-gray-400 text-xs sm:text-sm mt-2 text-center max-w-lg px-1">
						Faça upload do seu currículo em PDF. Ele ficará disponível para download no seu portfólio.
					</p>
				</CardHeader>
				<CardContent className="flex flex-col items-stretch sm:items-center gap-4 sm:gap-6 px-4 pb-6 sm:pb-8">
					<div className="flex flex-col items-stretch gap-2 w-full max-w-md mx-auto">
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:justify-center">
							<Button
								type="button"
								className="
								w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 
								to-blue-600 hover:from-cyan-600 hover:to-blue-700 
								text-white font-medium px-4 sm:px-6 py-2.5 rounded-md shadow text-sm sm:text-base"
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
								w-full sm:w-auto flex items-center justify-center gap-2
								bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 
								disabled:opacity-45 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed
								text-white font-medium px-4 sm:px-6 py-2.5 rounded-md shadow text-sm sm:text-base"
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
							<span className="text-cyan-400 text-xs sm:text-sm mt-1 flex items-center justify-center gap-2 min-w-0 px-1">
								<FaFilePdf className="text-cyan-400 shrink-0" />
								<span className="truncate text-center">{fileName}</span>
							</span>
						)}
					</div>
					{localPreviewUrl && (
						<div className="
							w-full max-w-2xl mt-2 sm:mt-4 rounded-lg sm:rounded-xl overflow-hidden 
							border border-cyan-900 bg-[#070b14] shadow-inner
							h-[min(55vh,24rem)] sm:h-[28rem] md:h-[32rem] min-h-[200px]
						">
							<iframe
								src={localPreviewUrl || undefined}
								className="w-full h-full border-none rounded-lg sm:rounded-xl"
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
