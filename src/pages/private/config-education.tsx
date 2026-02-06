import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { DialogHeader } from '@app/components/ui/dialog'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateEducationMutation, useGetEducationQuery, useUpdateEducationMutation } from '@app/queries/education'
import { EducationType } from '@app/services/education-service'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit, FaGraduationCap } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'
import FormEducation from '@app/components/form/form-education'
import { Button } from '@app/components/ui/button'
import { Badge } from '@app/components/ui/badge'
import { FaTrash } from 'react-icons/fa6'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import { AlertDialogFooter, AlertDialogHeader } from '@app/components/ui/alert-dialog'
import { IoClose } from 'react-icons/io5'
import { TruncatedName } from '@app/components/common/truncate-tooltip/truncate-name'
import { ConfigEducationSkeleton } from '@app/components/common/skeleton/config-education-skeleton'
import { getModalityLabel } from '@app/utils/modality'

export default function ConfigEducation() {
    const { setAlert } = useAlert()
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedEducation, setSelectedEducation] = useState<EducationType | undefined>(undefined)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const { data: educations, isLoading } = useGetEducationQuery()

    const createEducation = useCreateEducationMutation({
        onSuccess: () => {
            setIsOpen(false)
            queryClient.invalidateQueries(["get-education"])
            setAlert({ title: "Sucesso!", message: "Formação criada com sucesso!", type: "success" })
        },
        onError: () => {
            setAlert({ title: "Erro!", message: "Erro ao criar a formação!", type: "error" })
        },
    })

    const updateEducation = useUpdateEducationMutation({
        onSuccess: () => {
            setIsOpen(false)
            queryClient.invalidateQueries(["get-education"])
            setAlert({ title: "Sucesso!", message: "Formação atualizada com sucesso!", type: "success" })
        },
        onError: () => {
            setAlert({ title: "Erro!", message: "Erro ao atualizar a formação!", type: "error" })
        },
    })

    const handleSave = (newEducation: EducationType) => {
        if (selectedEducation?.id) {
            updateEducation.mutate({ ...newEducation, id: selectedEducation.id })
        } else {
            createEducation.mutate(newEducation)
        }
    }

    const handleEditClick = (education: EducationType, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedEducation(education)
        setIsOpen(true)
    }

    const handleDeleteClick = (education: EducationType, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedEducation(education)
        setIsDeleteDialogOpen(true)
    }

    const handleCardClick = (education: EducationType) => {
        setSelectedEducation(education)
        setIsOpen(true)
    }

    const handleAddClick = () => {
        setSelectedEducation(undefined)
        setIsOpen(true)
    }

    const isMutating = createEducation.isLoading || updateEducation.isLoading

    if (isLoading) return <ConfigEducationSkeleton />

    return (
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <div className="flex-shrink-0 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                    <span className="bg-cyan-500/10 p-2 rounded-md">
                        <FaGraduationCap className="text-cyan-400" size={24} />
                    </span>
                    Formação Acadêmica
                </h2>
                <Button
                    onClick={handleAddClick}
                    className="
                    bg-gradient-to-r from-cyan-500 to-blue-600 
                    hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                    <IoIosAdd size={20} className="mr-1" /> Adicionar Formação
                </Button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50 scrollbar-thumb-rounded-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                {educations &&
                    educations.map((education: EducationType) => (
                        <Card
                            key={education.id}
                            onClick={() => handleCardClick(education)}
                            className="
                            bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 
                            transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 
                            cursor-pointer group overflow-hidden"
                        >
                            <div className="
                                    absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                                    from-cyan-500 to-blue-600 transform origin-left 
                                    scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            >

                            </div>

                            <CardHeader className="pb-2">
                                <CardTitle className="
                                        text-xl font-semibold text-gray-100 
                                        group-hover:text-cyan-400 transition-colors"
                                >
                                    {education.course}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-2 text-gray-400">
                                    <p className="flex items-center gap-2">
                                        <span className="text-cyan-500/70">Instituição:</span>
                                        <TruncatedName
                                            name={education.institution}
                                            maxLength={35}
                                            tooltipSide="right"
                                            className="text-gray-300 hover:text-gray-100 transition-colors"
                                        />
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-cyan-500/70">Período:</span> {education.yearInit} -{" "}
                                        {education.yearFinal || "Atual"}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-cyan-500/70">Local:</span> {education.city}, {education.state}
                                    </p>
                                    {education.modality && (
                                        <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                                            {getModalityLabel(education.modality)}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                                    onClick={(e) => handleEditClick(education, e)}
                                >
                                    <FaEdit size={16} />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={(e) => handleDeleteClick(education, e)}
                                >
                                    <FaTrash size={16} />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                <Card
                    onClick={handleAddClick}
                    className="
                        bg-[#070b14] border border-dashed border-[#1e2a4a] 
                        hover:border-cyan-500/50 transition-all duration-300 flex 
                        items-center justify-center h-[250px] cursor-pointer group"
                >
                    <div className="
                            flex flex-col items-center justify-center gap-3 
                            text-gray-500 group-hover:text-cyan-400 transition-colors"
                    >
                        <div className="
                                w-16 h-16 rounded-full bg-[#0c1220] flex 
                                items-center justify-center group-hover:bg-cyan-500/10 
                                transition-colors"
                        >
                            <IoIosAdd size={40} className="transition-transform group-hover:scale-110 duration-300" />
                        </div>
                        <p className="font-medium">Adicionar Formação</p>
                    </div>
                </Card>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="
                fixed top-1/2 left-1/2 
                p-4 rounded-lg
                transform -translate-x-1/2 -translate-y-1/2 
                bg-[#0c1220] border-dashed  border-2 border-[#1e2a4a] 
                text-gray-100 w-5w">
                    <DialogHeader>
                        <DialogTitle className="
                            text-xl font-semibold text-cyan-400 
                            flex items-center justify-between gap-2"
                        >
                            <div className='flex gap-2 items-center'>
                                <FaGraduationCap size={18} />
                                {selectedEducation ? "Editar Formação" : "Adicionar Formação"}
                            </div>
                            <IoClose className='cursor-pointer' onClick={() => setIsOpen(false)} />
                        </DialogTitle>
                    </DialogHeader>

                    <FormEducation selectedEducation={selectedEducation} handleSave={handleSave} isSubmitting={isMutating} />
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="
                fixed top-1/2 left-1/2 
                p-4 rounded-lg
                transform -translate-x-1/2 -translate-y-1/2 
                bg-[#0c1220] border-dashed  border-2 border-[#1e2a4a] 
                text-gray-100 sm:max-w-[600px]
                ">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-400 font-semibold text-xl">Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Tem certeza que deseja excluir a formação{" "}
                            <span className="font-semibold text-gray-300">{selectedEducation?.course}</span>?
                            <br />
                            Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="
                            pt-1 pb-1 pl-2 pr-2 rounded-sm bg-[#070b14] text-gray-300 
                            hover:bg-[#111827] hover:text-gray-100"
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="
                            pt-1 pb-1 pl-2 pr-2 rounded-sm bg-red-600 
                            hover:bg-red-700 text-white pointer-events-none"
                            disabled={true}
                        >
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
