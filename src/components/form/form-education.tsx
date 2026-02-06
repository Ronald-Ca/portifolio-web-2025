import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { states } from '@app/utils/states'
import { useEffect } from 'react'
import { useCitiesByState } from '@app/hooks/use-cities-by-state'
import { EducationType } from '@app/services/education-service'
import { FaCalendarAlt, FaMapMarkerAlt, FaSave, FaSpinner } from 'react-icons/fa'
import { years } from '@app/utils/moths-and-years'
import { modality } from '@app/utils/modality'
import { MdSchool } from 'react-icons/md'
import { Separator } from '@radix-ui/react-separator'

interface FormEducationProps {
    selectedEducation?: EducationType
    handleSave: (data: EducationType) => void
    isSubmitting?: boolean
}

export default function FormEducation({ selectedEducation, handleSave, isSubmitting = false }: FormEducationProps) {
    const form = useForm<EducationType>({
        defaultValues: {
            course: "",
            institution: "",
            yearInit: "",
            yearFinal: "",
            city: "",
            state: "",
            modality: undefined,
            id: "",
        },
    })

    const { reset, handleSubmit, watch, setValue } = form
    const stateValue = watch('state')
    const { cities, isLoading: citiesLoading } = useCitiesByState(stateValue ?? '')

    useEffect(() => {
        const defaultFormValues: EducationType = {
            course: selectedEducation?.course || "",
            institution: selectedEducation?.institution || "",
            yearInit: selectedEducation?.yearInit || "",
            yearFinal: selectedEducation?.yearFinal || "",
            city: selectedEducation?.city || "",
            state: selectedEducation?.state || "",
            modality: selectedEducation?.modality || undefined,
            id: selectedEducation?.id,
        }

        reset(defaultFormValues)
    }, [selectedEducation, reset])

    useEffect(() => {
        if (!citiesLoading && selectedEducation?.city && stateValue === selectedEducation?.state) {
            setValue('city', selectedEducation.city)
        }
    }, [citiesLoading, selectedEducation?.city, selectedEducation?.state, stateValue, setValue])

    const onSubmit = (data: EducationType) => {
        handleSave(data)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <MdSchool className="text-cyan-500" size={18} />
                        <h3 className="text-gray-300 font-medium">Informações do Curso</h3>
                    </div>

                    <FormField
                        control={form.control}
                        name="course"
                        rules={{ required: "O nome do curso é obrigatório" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300">
                                    Nome do Curso
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Ex: Engenharia da Computação"
                                        className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="institution"
                        rules={{ required: "A instituição é obrigatória" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300">
                                    Instituição
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Ex: Universidade Federal de São Paulo"
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
                        <FaCalendarAlt className="text-cyan-500" size={16} />
                        <h3 className="text-gray-300 font-medium">Período</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="yearInit"
                            rules={{ required: "O ano de início é obrigatório" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Ano de Início</FormLabel>
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
                            name="yearFinal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Ano de Conclusão</FormLabel>
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
                    </div>

                    <FormField
                        control={form.control}
                        name="modality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300">Modalidade</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
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
                </div>

                <Separator className="bg-[#1e2a4a]" />

                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaMapMarkerAlt className="text-cyan-500" size={16} />
                        <h3 className="text-gray-300 font-medium">Localização</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <FormField
                            control={form.control}
                            name="state"
                            rules={{ required: "O estado é obrigatório" }}
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel className="text-gray-300">Estado</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={(v) => {
                                                field.onChange(v)
                                                form.setValue('city', '')
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
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            rules={{ required: "A cidade é obrigatória" }}
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel className="text-gray-300">Cidade</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={!stateValue || citiesLoading}
                                        >
                                            <SelectTrigger className="w-full bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md data-[disabled]:bg-[#070b14] data-[disabled]:opacity-100 data-[disabled]:cursor-not-allowed">
                                                <SelectValue placeholder={!stateValue ? "Selecione o estado primeiro" : citiesLoading ? "Carregando..." : "Selecione a cidade"} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
                                                {cities.map((c) => (
                                                    <SelectItem key={c.id} value={c.name} className="focus:bg-cyan-500/20 focus:text-cyan-50">
                                                        {c.name}
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

