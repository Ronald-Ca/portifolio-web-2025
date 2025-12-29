import { SocialMediaType } from '../../services/social-media-service'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaPalette, FaSave, FaSpinner } from 'react-icons/fa'
import { LazyIconPicker } from '../common/icon-picker/LazyIconPicker'
import { IoMdColorPalette } from 'react-icons/io'
import { Separator } from '@radix-ui/react-separator'
import { useState } from 'react'
import React from 'react'
import { loadIcons } from '@app/helpers/load-icons'

interface SocialMediaFormProps {
	selectedMedia: SocialMediaType | null
	handleSave: (media: SocialMediaType) => void
	isSubmitting?: boolean
}

const colorPalette = [
	'#0ea5e9', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#14b8a6',
]

export default function FormSocialMedia({ selectedMedia, handleSave, isSubmitting }: SocialMediaFormProps) {
	const form = useForm<SocialMediaType>({
		defaultValues: {
			name: selectedMedia?.name || '',
			link: selectedMedia?.link || '',
			icon: selectedMedia?.icon || '',
			color: selectedMedia?.color || '#0ea5e9',
		},
	})
	const { setValue } = form
	const icon = useWatch({ control: form.control, name: 'icon' })
	const color = useWatch({ control: form.control, name: 'color' })
	const [iconPreview, setIconPreview] = useState<JSX.Element | null>(null)

	// Atualiza preview do ícone
	async function updateIconPreview(iconName: string, color: string) {
		try {
			const iconEl = await loadIcons(iconName, color)
			setIconPreview(iconEl)
		} catch {
			setIconPreview(null)
		}
	}

	// Atualiza preview ao mudar ícone ou cor
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => { if (icon) updateIconPreview(icon, color) }, [icon, color])

	const onSubmit = (data: SocialMediaType) => {
		handleSave(data)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<span className="text-cyan-500"><FaPalette size={16} /></span>
						<h3 className="text-gray-300 font-medium">Informações da Rede Social</h3>
					</div>
					<FormField
						control={form.control}
						name="name"
						rules={{ required: 'O nome é obrigatório' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Nome</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Nome da rede social"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="link"
						rules={{ required: 'O link é obrigatório' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Link</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Link da rede social"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
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
						<span className="text-cyan-500"><FaPalette size={16} /></span>
						<h3 className="text-gray-300 font-medium">Aparência</h3>
					</div>
					<FormField
						control={form.control}
						name="icon"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center gap-2">Ícone</FormLabel>
								<FormControl>
									<div>
										<LazyIconPicker
											onSelect={(iconName: string) => field.onChange(iconName)}
											size={28}
											color={color || '#0ea5e9'}
										/>
									</div>
								</FormControl>
								{icon && (
									<div className="mt-2 flex items-center gap-2 text-xs text-cyan-400">
										<span>Ícone selecionado:</span>
										<span className="font-mono">{icon}</span>
										{iconPreview && <span className="ml-2">{iconPreview}</span>}
									</div>
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
								<FormLabel className="text-gray-300 flex items-center gap-2"><IoMdColorPalette className="text-cyan-500/70" size={16} />Cor</FormLabel>
								<div className="flex items-center gap-3">
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
									<Input
										value={field.value}
										onChange={e => field.onChange(e.target.value)}
										placeholder="#0ea5e9"
										className="w-28 bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md text-sm uppercase"
										maxLength={7}
									/>
									<div className="flex gap-1">
										{colorPalette.map((color) => (
											<Button
												key={color}
												type="button"
												variant="outline"
												size="sm"
												className="h-8 w-8 p-0 border hover:border-white"
												style={{ backgroundColor: color }}
												onClick={() => setValue('color', color)}
											/>
										))}
									</div>
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
