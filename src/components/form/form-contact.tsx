import { useForm, FormProvider } from "react-hook-form"
import { motion } from "framer-motion"
import { FiFileText, FiMessageSquare, FiPhone } from "react-icons/fi"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { IoPersonOutline } from "react-icons/io5"
import { MdAlternateEmail } from "react-icons/md"
import { AiOutlineSend } from "react-icons/ai"
import { useState } from 'react';
import { ContactRequest, sendContact } from "@app/services/contact-service"
import { useAlert } from "@app/contexts/alert-context"

export default function FormContact() {
    const form = useForm({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
        },
    })
    const [loading, setLoading] = useState(false);
    const { setAlert } = useAlert();

    const onSubmit = async (data: ContactRequest) => {
        setLoading(true);
        try {
            await sendContact({
                name: data.name,
                email: data.email,
                message: data.message,
                phone: data.phone,
                subject: data.subject,
            });
            setAlert({
                title: "Sucesso!",
                message: "Mensagem enviada com sucesso!",
                type: "success"
            });
            form.reset();
        } catch (err) {
            const axiosError = err as { response?: { status?: number } }
            if (axiosError.response?.status === 429) {
                setAlert({
                    title: "Limite atingido",
                    message: "Você atingiu o limite de mensagens. Tente novamente mais tarde.",
                    type: "error"
                });
            } else {
                setAlert({
                    title: "Erro",
                    message: "Erro ao enviar mensagem. Tente novamente.",
                    type: "error"
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormProvider {...form}>
            <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-medium flex items-center gap-2">
                                <IoPersonOutline className="h-4 w-4 text-cyan-400" />
                                Nome
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Seu nome completo"
                                    className="
                                    bg-slate-800/50 border-slate-700 focus:border-cyan-500 
                                    focus:ring-cyan-500/20 text-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white font-medium flex items-center gap-2">
                                    <FiPhone className="h-4 w-4 text-cyan-400" />
                                    Telefone
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="(00) 00000-0000"
                                        maxLength={15}
                                        className="
                                        bg-slate-800/50 border-slate-700 focus:border-cyan-500 
                                        focus:ring-cyan-500/20 text-white
                                        "
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white font-medium flex items-center gap-2">
                                    <MdAlternateEmail className="h-4 w-4 text-cyan-400" />
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="seu.email@exemplo.com"
                                        className="
                                        bg-slate-800/50 border-slate-700 focus:border-cyan-500 
                                        focus:ring-cyan-500/20 text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-medium flex items-center gap-2">
                                <FiFileText className="h-4 w-4 text-cyan-400" />
                                Assunto
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Assunto da mensagem"
                                    className="
                                    bg-slate-800/50 border-slate-700 focus:border-cyan-500 
                                    focus:ring-cyan-500/20 text-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-medium flex items-center gap-2">
                                <FiMessageSquare className="h-4 w-4 text-cyan-400" />
                                Mensagem
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Escreva sua mensagem aqui..."
                                    className="
                                    bg-slate-800/50 border-slate-700 focus:border-cyan-500 
                                    focus:ring-cyan-500/20 text-white min-h-[120px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="
                    w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 
                    hover:to-blue-700 text-white font-medium py-6"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                    <AiOutlineSend className="ml-2 h-4 w-4" />
                </Button>
            </motion.form>
        </FormProvider>
    )
}
