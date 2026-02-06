import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { FaPalette, FaSave, FaSpinner } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

interface HomeData {
  image: File | null
  title: string
  role: string
  description: string
  colorBackground: string
  imageBackground: File | null
  mainSkills: string[]
}

interface FormHomeProps {
  onSubmit: (data: HomeData) => void
  isSubmitting?: boolean
}

export function FormHome({ onSubmit, isSubmitting = false }: FormHomeProps) {
  const form = useFormContext<HomeData>()
  const bgColor = form.watch("colorBackground")

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Título</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Ex: Olá, eu me chamo João Silva!"
                className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Cargo</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Ex: Desenvolvedor Full Stack"
                className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Descrição</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Descreva brevemente quem você é e o que faz..."
                className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md min-h-[120px] resize-y"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="colorBackground"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Cor de Fundo</FormLabel>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner overflow-hidden"
                        style={{ backgroundColor: bgColor }}
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Selecione a cor de fundo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-sm text-gray-400 uppercase">{bgColor}</div>
            </div>
          </FormItem>
        )}
      />

      <div className="pt-4">
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
              <span>Salvar Alterações</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}