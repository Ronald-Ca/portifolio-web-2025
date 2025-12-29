import { useMemo, useCallback, useState, useEffect, type ReactElement } from "react"
import { IoIosArrowDroprightCircle } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarImage } from "../../../components/ui/avatar"
import LoadingSpinner from "../../../components/common/loading"
import { useGetHomeQuery } from "../../../queries/home"
import ErrorComponent from "@app/components/common/error"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { DynamicTechIcon } from "@app/components/common/tooltip"
import { useGetSocialMediaQuery } from "@app/queries/social-media"
import { iconMap } from "@app/constants/social-medias"
import { Skeleton } from "@app/components/ui/skeleton"
import { loadIcons } from "@app/helpers/load-icons"
import type { MainSkill } from "@app/services/home-service"

type LoadedMainSkill = {
	id: string
	name: string
	icon: ReactElement
}

function useLoadedMainSkills(mainSkills?: MainSkill[]) {
	const [loadedSkills, setLoadedSkills] = useState<LoadedMainSkill[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!mainSkills || mainSkills.length === 0) {
			setIsLoading(false)
			return
		}

		setIsLoading(true)
		;(async () => {
			const loaded: LoadedMainSkill[] = await Promise.all(
				mainSkills.map(async skill => {
					const iconElement = await loadIcons(skill.icon.trim(), skill.color ?? "#00BFFF", 30)
					return {
						id: skill.id,
						name: skill.name,
						icon: iconElement
					}
				})
			)
			setLoadedSkills(loaded)
			setIsLoading(false)
		})()
	}, [mainSkills])

	return { loadedSkills, isLoading }
}

export default function Home() {
	const navigate = useNavigate()

	const { data: home, isLoading, isError } = useGetHomeQuery()
	const { data: socialMedia, isLoading: isLoadingSocialMedia } = useGetSocialMediaQuery()
	const { loadedSkills: mainSkills, isLoading: isLoadingMainSkills } = useLoadedMainSkills(home?.mainSkills)

	const handleContactClick = useCallback(() => navigate("/contact"), [navigate])
	const handleProjectsClick = useCallback(() => navigate("/projects"), [navigate])

	const backgroundImageStyle = useMemo(
		() => ({ backgroundImage: `url(${home?.imageBackground})` }),
		[home?.imageBackground]
	)

	if (isLoading) return <LoadingSpinner />
	if (isError || !home) return <ErrorComponent />

	const { title, role, description, image } = home

	return (
		<div
			className="
				relative w-full min-h-screen-header-footer
				bg-cover bg-center flex items-center justify-center
				md:px-4 bg-slate-900
			"
			style={backgroundImageStyle}
		>
			<div className="absolute inset-0 opacity-60 bg-bg_default" />

			<div
				className="
					relative z-10 w-full max-w-7xl mx-auto px-4
					flex flex-col md:flex-row items-center justify-between gap-10
					md:gap-20 py-12
				"
			>
				<div className="flex flex-col justify-center max-w-xl">
					<div className="flex items-center gap-2 mb-2">
						<div className="h-1 w-12 bg-default rounded-full"></div>
						<span className="text-default font-medium">Portfólio</span>
					</div>

					<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-200 mb-2">
						{title}
					</h1>
					<span className="text-default text-lg md:text-xl font-medium mb-4">
						{role}
					</span>
					<p className="text-lg md:text-xl text-gray-300 mb-6">
						{description}
					</p>

					<div className="flex flex-wrap gap-4 mb-8">
						<Button
							onClick={handleContactClick}
							className="
								px-6 h-12 flex items-center justify-center gap-3
								bg-default hover:bg-default/90 text-white border border-default
								hover:text-default hover:bg-white
							"
						>
							Entrar em contato
							<IoIosArrowDroprightCircle size={24} />
						</Button>

						<Button
							onClick={handleProjectsClick}
							className="
								px-6 h-12 flex items-center justify-center gap-3
								border border-gray-600 hover:text-white hover:bg-bg_component
								hover:border-default
							"
							variant="outline"
						>
							Ver projetos
						</Button>
					</div>

					<div className="flex gap-4 items-center">
						{isLoadingSocialMedia
							? Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="w-10 h-10 rounded-full animate-pulse bg-gray-600" />
							))
							: socialMedia?.map((media, idx) => {
								const key = media.name?.toLowerCase();
								const iconData = iconMap[key] || iconMap[media.icon?.toLowerCase() || ''];
								if (!iconData) return null;
								const { Icon, label } = iconData;
								return (
									<a
										key={media.id || idx}
										href={media.link}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="text-gray-400 hover:text-default transition-colors"
									>
										<Icon size={label === "Email" ? 26 : 24} />
									</a>
								);
							})}
					</div>
				</div>

				<div className="flex justify-center items-center">
					<div className="relative">
						<div className="
						absolute inset-0 rounded-full bg-gradient-to-r
						from-cyan-500 to-default opacity-70 blur-md">
						</div>
						<div className="
							p-1.5 rounded-full shadow-lg animate-rotateBorder 
							border-4 border-default border-solid relative
						"
						>
							<Avatar className="w-64 h-64 md:w-80 md:h-80">
								<AvatarImage src={image?.toString() ?? ""} alt="Foto de perfil" className="rounded-full" />
							</Avatar>
						</div>
					</div>
				</div>
			</div>

			<TooltipProvider>
				<div className="absolute bottom-8 left-0 right-0 z-10">
					<div
						className="
							flex justify-center gap-6 flex-wrap
							max-w-3xl mx-auto px-4
							py-4
						"
					>
						{isLoadingMainSkills
							? Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="w-14 h-14 rounded-xl animate-pulse bg-gray-600" />
							))
							: mainSkills.map(skill => (
								<DynamicTechIcon key={skill.id} label={skill.name} icon={skill.icon} />
							))
						}
					</div>
				</div>
			</TooltipProvider>
		</div>
	)
}
