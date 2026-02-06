import FormSocialMedia from '@app/components/form/form-social-media'
import { Card, CardHeader, CardTitle } from '@app/components/ui/card'
import { Button } from '@app/components/ui/button'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateSocialMediaMutation, useGetSocialMediaQuery, useUpdateSocialMediaMutation } from '@app/queries/social-media'
import { SocialMediaType } from '@app/services/social-media-service'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { ConfigSocialMediaSkeleton } from '@app/components/common/skeleton/config-social-media-skeleton'

export default function ConfigSocialMedia() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMedia, setSelectedMedia] = useState<SocialMediaType | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const handleEditClick = (media: SocialMediaType) => {
		setSelectedMedia(media)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedMedia(null)
		setIsOpen(true)
	}

	const { data: socialMedia, isLoading } = useGetSocialMediaQuery()

	const createSocialMedia = useCreateSocialMediaMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-social-media'])
			setAlert({ title: 'Sucesso!', message: 'Rede social cadastrada com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro', message: 'Erro ao cadastrar rede social!', type: 'error' })
		},
	})

	const updateSocialMedia = useUpdateSocialMediaMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-social-media'])
			setAlert({ title: 'Sucesso!', message: 'Rede social atualizada com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro', message: 'Erro ao atualizar rede social!', type: 'error' })
		},
	})

	const handleSave = (newMedia: SocialMediaType) => {
		if (selectedMedia) {
			updateSocialMedia.mutate(newMedia)
		} else {
			createSocialMedia.mutate(newMedia)
		}
	}

	const isMutating = createSocialMedia.isLoading || updateSocialMedia.isLoading

	if (isLoading) return <ConfigSocialMediaSkeleton />

	return (
		<div className="flex flex-col h-full min-h-0">
			<div className="flex-shrink-0 mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
					<span className="bg-cyan-500/10 p-2 rounded-md">
						<FaEdit className="text-cyan-400" size={24} />
					</span>
					Redes Sociais
				</h2>
				<Button
					onClick={handleAddClick}
					className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
				>
					<IoIosAdd size={20} className="mr-1" /> Adicionar Rede Social
				</Button>
			</div>
			<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-auto-rows-[minmax(220px,auto)] pb-4">
				{socialMedia && socialMedia.map((media: SocialMediaType, index: number) => (
					<Card
						key={index}
						onClick={() => handleEditClick(media)}
						className="bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group overflow-hidden relative h-full min-h-[220px] flex flex-col"
					>
						<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
							<Button
								size="sm"
								variant="ghost"
								className="h-7 w-7 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
								onClick={e => { e.stopPropagation(); handleEditClick(media); }}
							>
								<FaEdit size={14} />
							</Button>
							<Button
								size="sm"
								variant="ghost"
								className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
								onClick={e => { e.stopPropagation(); setSelectedMedia(media); setIsDeleteDialogOpen(true); }}
							>
								<FaTrash size={14} />
							</Button>
						</div>
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
						<CardHeader className="pb-2 text-center mt-8 flex-1 flex items-center justify-center">
							<CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
								{media.name}
							</CardTitle>
						</CardHeader>
					</Card>
				))}
				<Card
					onClick={handleAddClick}
					className="bg-[#070b14] border border-dashed border-[#1e2a4a] hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] h-full cursor-pointer group"
				>
					<div className="flex flex-col items-center justify-center gap-3 text-gray-500 group-hover:text-cyan-400 transition-colors">
						<div className="w-16 h-16 rounded-full bg-[#0c1220] flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
							<IoIosAdd size={40} className="transition-transform group-hover:scale-110 duration-300" />
						</div>
						<p className="font-medium">Adicionar Rede Social</p>
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
								<FaEdit size={18} />
								{selectedMedia ? 'Editar Rede Social' : 'Adicionar Rede Social'}
							</div>
							<IoMdClose className="cursor-pointer" onClick={() => setIsOpen(false)} />
						</DialogTitle>
					</div>
					<FormSocialMedia selectedMedia={selectedMedia} handleSave={handleSave} isSubmitting={isMutating} />
				</DialogContent>
			</Dialog>
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent
					className="
					fixed top-1/2 left-1/2 
					p-4 rounded-lg
					transform -translate-x-1/2 -translate-y-1/2 
					bg-[#0c1220] border border-[#1e2a4a] 
					text-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto
					"
				>
					<div className="mb-4">
						<DialogTitle className="text-xl font-semibold text-red-400 flex items-center justify-between gap-2">
							<div className="flex gap-2 items-center">
								<FaTrash size={18} />
								Confirmar exclusão
							</div>
							<IoMdClose className="cursor-pointer" onClick={() => setIsDeleteDialogOpen(false)} />
						</DialogTitle>
					</div>
					<div className="text-gray-400 mb-4">
						Tem certeza que deseja excluir a rede social{' '}
						<span className="font-semibold text-gray-300">{selectedMedia?.name}</span>?
						<br />Esta ação não pode ser desfeita.
					</div>
					<div className="flex justify-end gap-2">
						<Button
							variant="ghost"
							className="pt-1 pb-1 pl-2 pr-2 rounded-sm bg-[#070b14] text-gray-300 hover:bg-[#111827] hover:text-gray-100"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancelar
						</Button>
						<Button
							variant="destructive"
							className="pt-1 pb-1 pl-2 pr-2 rounded-sm bg-red-600 hover:bg-red-700 text-white"
							disabled
						>
							Excluir
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
