import { Suspense, useState } from "react"
import { Outlet, NavLink, useLocation } from "react-router-dom"
import { FaHouseUser, FaAddressCard, FaGraduationCap, FaGamepad, FaEdit, FaBars } from "react-icons/fa"
import { SiLevelsdotfyi } from "react-icons/si"
import { PiProjectorScreenChartFill } from "react-icons/pi"
import { IoShareSocial, IoDocumentAttach } from "react-icons/io5"
import { ImExit } from "react-icons/im"
import { cn } from "@app/lib/utils"
import { SidebarMenu, SidebarMenuItem } from "@app/components/ui/sidebar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@app/components/ui/sheet"

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
	const [mobileNavOpen, setMobileNavOpen] = useState(false)

	const renderNavLinks = (onNavigate?: () => void) => (
		<SidebarMenu>
			{configTabs.map(({ key, path, label, icon: Icon }) => {
				const isActive = currentPath === path
				return (
					<SidebarMenuItem key={key}>
						<NavLink
							to={`/config/${path}`}
							onClick={() => onNavigate?.()}
							className={cn(
								"w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left transition-all duration-200",
								"hover:bg-[#111827] group relative overflow-hidden",
								isActive
									? "bg-gradient-to-r from-[#0c1a2c] to-[#111827] text-cyan-400 font-medium border-l-2 border-cyan-500"
									: "text-gray-400",
							)}
						>
							{isActive && <div className="absolute inset-0 bg-cyan-500/5 rounded-lg" />}
							<span
								className={cn(
									"text-base sm:text-lg shrink-0 transition-all duration-200",
									isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300",
								)}
							>
								<Icon />
							</span>
							<span className="relative z-10 text-sm sm:text-base">{label}</span>
							{isActive && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-500" />}
						</NavLink>
					</SidebarMenuItem>
				)
			})}
		</SidebarMenu>
	)

	return (
		<div className="flex flex-col h-[100dvh] min-h-0 overflow-hidden bg-[#0a0e17]">
			<header className="px-3 py-3 sm:p-4 bg-[#070b14] border-b border-[#1e2a4a] shadow-md shrink-0">
				<div className="grid w-full grid-cols-3 items-center gap-x-1 sm:gap-x-2 lg:hidden">
					<div className="flex justify-start">
						<button
							type="button"
							aria-label="Abrir menu de navegação"
							onClick={() => setMobileNavOpen(true)}
							className="
								shrink-0 w-10 h-10 flex items-center justify-center rounded-md
								border border-slate-600 text-default bg-transparent
								hover:bg-slate-800/80 transition-colors
							"
						>
							<FaBars size={18} />
						</button>
					</div>
					<h1 className="flex min-w-0 items-center justify-center gap-1.5 text-center sm:gap-2">
						<FaEdit className="text-cyan-500 shrink-0 text-sm sm:text-base" />
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-sm font-bold sm:text-base whitespace-nowrap">
							Modo Editor
						</span>
					</h1>
					<div className="flex justify-end">
						<a
							href="/"
							className="
								shrink-0 inline-flex items-center gap-1.5 rounded-md border border-slate-600
								bg-transparent px-2 sm:px-2.5 py-2 text-xs font-medium text-gray-200
								hover:bg-slate-800/80 hover:text-default transition-colors
							"
						>
							<ImExit className="text-sm text-default sm:text-base" />
							<span>Sair</span>
						</a>
					</div>
				</div>

				<div className="hidden items-center justify-between gap-4 lg:flex">
					<h1 className="text-cyan-400 text-xl md:text-2xl font-bold flex items-center gap-3 min-w-0">
						<FaEdit className="text-cyan-500 shrink-0 text-xl" />
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Modo Editor
						</span>
					</h1>
					<a
						href="/"
						className="
							shrink-0 inline-flex items-center gap-2 rounded-md border border-slate-600
							bg-transparent px-4 py-2 text-sm font-medium text-gray-200
							hover:bg-slate-800/80 hover:text-default transition-colors
						"
					>
						<ImExit className="text-lg text-default" />
						<span>Sair</span>
					</a>
				</div>
			</header>

			<main className="flex flex-1 min-h-0 min-w-0">
				<aside className="hidden lg:block w-64 shrink-0 bg-[#070b14] border-r border-[#1e2a4a] shadow-lg overflow-y-auto">
					<div className="px-3 py-2">{renderNavLinks()}</div>
				</aside>

				<Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
					<SheetContent
						side="left"
						className="w-[min(100vw,20rem)] border-[#1e2a4a] bg-[#070b14] p-0 text-gray-100 [&>button]:text-gray-400 [&>button]:hover:text-white"
					>
						<SheetHeader className="border-b border-[#1e2a4a] px-4 py-4 text-left">
							<SheetTitle className="text-cyan-400">Navegação</SheetTitle>
						</SheetHeader>
						<div className="px-2 py-3 overflow-y-auto max-h-[calc(100dvh-5rem)]">
							{renderNavLinks(() => setMobileNavOpen(false))}
						</div>
					</SheetContent>
				</Sheet>

				<section className="flex-1 min-h-0 min-w-0 flex flex-col p-3 sm:p-4 md:p-6 bg-gradient-to-b from-[#0a0e17] to-[#0c1220]">
					<div className="flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden bg-[#070b14] rounded-lg sm:rounded-xl border border-[#1e2a4a] shadow-xl p-3 sm:p-4 md:p-6">
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
