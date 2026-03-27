import { useMemo, useCallback } from "react"
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
import { loadIconSync } from "@app/helpers/load-icons"

export default function Home() {
	const navigate = useNavigate()

	const { data: home, isLoading, isError } = useGetHomeQuery()
	const { data: socialMedia, isLoading: isLoadingSocialMedia } = useGetSocialMediaQuery()
	const mainSkills = home?.mainSkills ?? []

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
				bg-cover bg-center flex flex-col items-center justify-start md:justify-center
				pt-6 md:pt-12
				px-3 md:px-4 bg-slate-900
			"
			style={backgroundImageStyle}
		>
			<div className="absolute inset-0 opacity-60 bg-bg_default" />

			<div
				className="
					relative z-10 w-full max-w-7xl mx-auto px-1 sm:px-4
					flex flex-col md:flex-row items-center justify-between gap-10
					md:gap-14 lg:gap-20 py-8 md:py-10 lg:py-12
				"
			>
				<div className="flex flex-col justify-center max-w-xl text-center md:text-left items-center md:items-start">
					<div className="flex items-center gap-2 mb-2">
						<div className="h-1 w-12 bg-default rounded-full"></div>
						<span className="text-default font-medium">Portfólio</span>
					</div>

					<h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-200 mb-2">
						{title}
					</h1>
					<span className="text-default text-base sm:text-lg md:text-xl font-medium mb-4">
						{role}
					</span>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6">
						{description}
					</p>

					<div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mb-8">
						<Button
							onClick={handleContactClick}
							className="
								w-full sm:w-auto px-6 h-12 flex items-center justify-center gap-3
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
								w-full sm:w-auto px-6 h-12 flex items-center justify-center gap-3
								border border-gray-600 hover:text-white hover:bg-bg_component
								hover:border-default
							"
							variant="outline"
						>
							Ver projetos
						</Button>
					</div>

					<div className="flex gap-4 items-center justify-center md:justify-start">
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

				<div className="flex flex-col justify-center items-center w-full md:w-auto">
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
							<Avatar className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
								<AvatarImage src={image?.toString() ?? ""} alt="Foto de perfil" className="rounded-full" />
							</Avatar>
						</div>
					</div>
				</div>
			</div>

			<TooltipProvider>
				<div className="relative z-10 w-full flex justify-center mt-8 md:mt-10 lg:mt-12 pb-6 md:pb-0">
					<div
						className="
							flex justify-center gap-2.5 sm:gap-3 md:gap-4 flex-wrap
							max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md mx-auto
							px-2
						"
					>
						{mainSkills.map(skill => {
							const id = typeof skill === 'string' ? skill : skill.id
							const label = typeof skill === 'string' ? skill : skill.name
							const icon =
								typeof skill === 'string'
									? loadIconSync('', '#00BFFF', 30)
									: loadIconSync(skill.icon?.trim() ?? '', skill.color ?? '#00BFFF', 30)
							return (
								<DynamicTechIcon
									key={id}
									label={label}
									icon={icon}
								/>
							)
						})}
					</div>
				</div>
			</TooltipProvider>
		</div>
	)
}
