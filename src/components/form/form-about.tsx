import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { states } from '@app/utils/states'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FaMapMarkerAlt, FaSave, FaSpinner } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { useCitiesByState } from '@app/hooks/use-cities-by-state'

interface About {
	image: File | null
	name: string
	birthDate: string
	city: string
	state: string
}

interface FormAboutProps {
	onSubmit: (data: About) => void
	isSubmitting?: boolean
	initialCity?: string
}

export function FormAbout({ onSubmit, isSubmitting = false, initialCity = '' }: FormAboutProps) {
	const form = useFormContext<About>()
	const stateValue = form.watch('state')
	const cityValue = form.watch('city')
	const { cities, isLoading: citiesLoading } = useCitiesByState(stateValue ?? '')

	useEffect(() => {
		if (!citiesLoading && stateValue) {
			const currentCity = form.getValues('city') || initialCity
			if (currentCity) {
				form.setValue('city', currentCity, { shouldDirty: false })
			}
		}
	}, [citiesLoading, stateValue, initialCity])

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
			<div className="space-y-5">
				<div className="flex items-center gap-1 mb-2">
					<div className="h-1 w-1 rounded-full bg-cyan-400"></div>
					<h3 className="text-gray-300 font-medium">Dados Pessoais</h3>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-[1fr_10rem] gap-4 items-end">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="min-w-0">
								<FormLabel className="text-gray-300">
									Nome Completo
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Seu nome completo"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="birthDate"
						render={({ field }) => (
							<FormItem className="min-w-0">
								<FormLabel className="text-gray-300">Data de nascimento</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="date"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center gap-1 mb-2 mt-6">
					<div className="h-1 w-1 rounded-full bg-cyan-400"></div>
					<h3 className="text-gray-300 font-medium flex items-center gap-2">
						<FaMapMarkerAlt className="text-cyan-500/70" size={14} />
						Localização
					</h3>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem className="min-w-0">
								<FormLabel className="text-gray-300">Estado</FormLabel>
								<FormControl>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Select
													value={field.value || undefined}
													onValueChange={(v) => {
														const prevState = form.getValues('state')
														field.onChange(v)
														if (prevState !== v) {
															form.setValue('city', '')
														}
													}}
												>
													<SelectTrigger className="w-full bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
														<SelectValue placeholder="UF" />
													</SelectTrigger>
													<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
														{states.map((estado) => (
															<SelectItem
																key={estado.id}
																value={estado.sigla}
																className="focus:bg-cyan-500/20 focus:text-cyan-50"
															>
																{estado.sigla} - {estado.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TooltipTrigger>
											<TooltipContent side="right">
												<p>Selecione seu estado</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="min-w-0">
								<FormLabel className="text-gray-300">Cidade</FormLabel>
								<FormControl>
									<Select
										value={field.value || undefined}
										onValueChange={(v) => {
											field.onChange(v)
										}}
										disabled={!stateValue || citiesLoading}
									>
										<SelectTrigger className="w-full bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md data-[disabled]:bg-[#070b14] data-[disabled]:opacity-100 data-[disabled]:cursor-not-allowed">
											<SelectValue placeholder={!stateValue ? "Selecione o estado primeiro" : citiesLoading ? "Carregando..." : "Selecione a cidade"} />
										</SelectTrigger>
										<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
											{(() => {
												const cityOptions = [...cities]
												const currentCity = cityValue || initialCity
												if (currentCity && !cityOptions.some((c) => c.name === currentCity)) {
													cityOptions.push({ id: -1, name: currentCity })
												}
												return cityOptions.map((c) => (
													<SelectItem key={c.id >= 0 ? c.id : `city-${c.name}`} value={c.name} className="focus:bg-cyan-500/20 focus:text-cyan-50">
														{c.name}
													</SelectItem>
												))
											})()}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<div className="pt-6">
				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
				>
					{isSubmitting ? (
						<>
							<FaSpinner className="animate-spin" />
							<span>Salvando...</span>
						</>
					) : (
						<>
							<FaSave />
							<span>Salvar Informações</span>
						</>
					)}
				</Button>
			</div>
		</form>
	)
}