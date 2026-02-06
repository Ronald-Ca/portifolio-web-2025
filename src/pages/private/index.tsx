import { Suspense } from "react"
import { Outlet, NavLink, useLocation } from "react-router-dom"
import { FaHouseUser, FaAddressCard, FaGraduationCap, FaGamepad, FaEdit } from "react-icons/fa"
import { SiLevelsdotfyi } from "react-icons/si"
import { PiProjectorScreenChartFill } from "react-icons/pi"
import { IoShareSocial, IoDocumentAttach } from "react-icons/io5"
import { Button } from "@app/components/ui/button"
import { ImExit } from "react-icons/im"
import { cn } from "@app/lib/utils"
import { SidebarMenu, SidebarMenuItem } from "@app/components/ui/sidebar"

const configTabs = [
	{ key: "home", path: "home", label: "Início", icon: FaHouseUser },
	{ key: "about", path: "about", label: "Sobre", icon: FaAddressCard },
	{ key: "education", path: "education", label: "Formação", icon: FaGraduationCap },
	{ key: "experience", path: "experience", label: "Experiência", icon: SiLevelsdotfyi },
	{ key: "skills", path: "skills", label: "Skills", icon: FaGamepad },
	{ key: "projects", path: "projects", label: "Projetos", icon: PiProjectorScreenChartFill },
	{ key: "social-media", path: "social-media", label: "Redes", icon: IoShareSocial },
	{ key: "curriculum", path: "curriculum", label: "Currículo", icon: IoDocumentAttach },
] as const

export default function Config() {
	const location = useLocation()
	const currentPath = location.pathname.replace(/^\/config\/?/, "") || "home"

	return (
		<div className="flex flex-col h-screen overflow-hidden bg-[#0a0e17]">
			<header className="flex items-center justify-between p-4 bg-[#070b14] border-b border-[#1e2a4a] shadow-md">
				<h1 className="text-cyan-400 text-2xl font-bold flex items-center gap-3">
					<FaEdit className="text-cyan-500" />
					<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Modo Editor</span>
				</h1>
				<Button
					variant="outline"
					className="border-cyan-700 hover:bg-cyan-950 hover:text-cyan-300 transition-all duration-300"
				>
					<a href="/" className="flex items-center gap-2">
						<ImExit /> Sair
					</a>
				</Button>
			</header>

			<main className="flex flex-1 min-h-0">
				<aside className="w-64 bg-[#070b14] border-r border-[#1e2a4a] shadow-lg">
					<div className="px-3 py-2">
						<SidebarMenu>
							{configTabs.map(({ key, path, label, icon: Icon }) => {
								const isActive = currentPath === path
								return (
									<SidebarMenuItem key={key}>
										<NavLink
											to={`/config/${path}`}
											className={cn(
												"w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
												"hover:bg-[#111827] group relative overflow-hidden",
												isActive
													? "bg-gradient-to-r from-[#0c1a2c] to-[#111827] text-cyan-400 font-medium border-l-2 border-cyan-500"
													: "text-gray-400",
											)}
										>
											{isActive && <div className="absolute inset-0 bg-cyan-500/5 rounded-lg" />}
											<span
												className={cn(
													"text-lg transition-all duration-200",
													isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300",
												)}
											>
												<Icon />
											</span>
											<span className="relative z-10">{label}</span>
											{isActive && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>}
										</NavLink>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</div>
				</aside>

				<section className="flex-1 min-h-0 flex flex-col p-6 bg-gradient-to-b from-[#0a0e17] to-[#0c1220]">
					<div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#070b14] rounded-xl border border-[#1e2a4a] shadow-xl p-6">
						<div className="flex-1 min-h-0 flex flex-col overflow-hidden">
							<Suspense
								fallback={
									<div className="flex items-center justify-center h-full">
										<div className="animate-pulse flex flex-col items-center">
											<div className="h-2 w-20 bg-gray-700 rounded mb-3"></div>
											<div className="h-2 w-28 bg-gray-800 rounded"></div>
										</div>
									</div>
								}
							>
								<div className="h-full min-h-0 flex flex-col overflow-hidden" key={location.pathname}>
									<Outlet />
								</div>
							</Suspense>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
