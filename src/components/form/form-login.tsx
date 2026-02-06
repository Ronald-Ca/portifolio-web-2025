import { useAlert } from "@app/contexts/alert-context";
import { useAuthenticateMutation } from "@app/queries/user";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@app/lib/utils";
import { UserLoginType } from "@app/services/user-service";

export default function FormLogin() {
    const form = useForm<UserLoginType>({
        defaultValues: { email: "", password: "" },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const loginMutation = useAuthenticateMutation({
        onSuccess: (data) => {
            setIsLoading(false);
            setAlert({
                title: "Sucesso!",
                message: "Login realizado com sucesso!",
                type: "success",
            });
            localStorage.setItem(
                "auth",
                JSON.stringify({ token: data.data.token })
            );
            navigate("/config/home");
        },
        onError: () => {
            setIsLoading(false);
            setAlert({
                title: "Erro ao logar!",
                message: "Usuário ou senha incorreta!",
                type: "error",
            });
        },
    });

    const onSubmit: SubmitHandler<UserLoginType> = async (data) => {
        setIsLoading(true);
        loginMutation.mutate(data);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-medium flex items-center gap-2">
                                <User className="h-4 w-4 text-cyan-400" />
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Seu email"
                                    className="bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-medium flex items-center gap-2">
                                <Lock className="h-4 w-4 text-cyan-400" />
                                Senha
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Sua senha"
                                        className="bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20 text-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                        "w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-6",
                        isLoading && "opacity-70 cursor-not-allowed"
                    )}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Entrando...
                        </>
                    ) : (
                        <>
                            Entrar <LogIn className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </FormProvider>
    );
}