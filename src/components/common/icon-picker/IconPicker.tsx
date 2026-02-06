import React, { Component, useState, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { toIconifyName } from '@app/helpers/icon-utils'

const FALLBACK_ICON = 'mdi:code-tags'

class IconCellErrorBoundary extends Component<
	{ children: React.ReactNode; fallback: React.ReactNode },
	{ hasError: boolean }
> {
	state = { hasError: false }
	static getDerivedStateFromError() {
		return { hasError: true }
	}
	render() {
		if (this.state.hasError) return this.props.fallback
		return this.props.children
	}
}

// Icones mais usados para portfolio (curados)
const popularIcons = [
	// Linguagens
	{ name: 'SiTypescript', iconify: 'simple-icons:typescript' },
	{ name: 'SiJavascript', iconify: 'simple-icons:javascript' },
	{ name: 'SiPython', iconify: 'simple-icons:python' },
	{ name: 'FaJava', iconify: 'fa-brands:java' },
	{ name: 'SiCplusplus', iconify: 'simple-icons:cplusplus' },
	{ name: 'SiRust', iconify: 'simple-icons:rust' },
	{ name: 'SiGo', iconify: 'simple-icons:go' },
	{ name: 'SiPhp', iconify: 'simple-icons:php' },
	{ name: 'SiRuby', iconify: 'simple-icons:ruby' },
	{ name: 'SiSwift', iconify: 'simple-icons:swift' },
	{ name: 'SiKotlin', iconify: 'simple-icons:kotlin' },
	{ name: 'SiDart', iconify: 'simple-icons:dart' },
	{ name: 'SiCsharp', iconify: 'simple-icons:csharp' },

	// Frontend
	{ name: 'FaReact', iconify: 'simple-icons:react' },
	{ name: 'FaVuejs', iconify: 'simple-icons:vuedotjs' },
	{ name: 'FaAngular', iconify: 'simple-icons:angular' },
	{ name: 'SiNextdotjs', iconify: 'simple-icons:nextdotjs' },
	{ name: 'SiSvelte', iconify: 'simple-icons:svelte' },
	{ name: 'SiTailwindcss', iconify: 'simple-icons:tailwindcss' },
	{ name: 'FaHtml5', iconify: 'simple-icons:html5' },
	{ name: 'FaCss3Alt', iconify: 'simple-icons:css3' },
	{ name: 'SiSass', iconify: 'simple-icons:sass' },
	{ name: 'SiBootstrap', iconify: 'simple-icons:bootstrap' },
	{ name: 'SiMui', iconify: 'simple-icons:mui' },
	{ name: 'SiRadixui', iconify: 'simple-icons:radixui' },
	{ name: 'SiStyledcomponents', iconify: 'simple-icons:styledcomponents' },
	{ name: 'SiFlutter', iconify: 'simple-icons:flutter' },
	{ name: 'SiReactnative', iconify: 'simple-icons:react' },

	// Backend
	{ name: 'FaNodeJs', iconify: 'simple-icons:nodedotjs' },
	{ name: 'SiExpress', iconify: 'simple-icons:express' },
	{ name: 'SiNestjs', iconify: 'simple-icons:nestjs' },
	{ name: 'SiDjango', iconify: 'simple-icons:django' },
	{ name: 'SiSpringboot', iconify: 'simple-icons:springboot' },
	{ name: 'SiFastapi', iconify: 'simple-icons:fastapi' },
	{ name: 'SiFlask', iconify: 'simple-icons:flask' },
	{ name: 'SiDotnet', iconify: 'simple-icons:dotnet' },
	{ name: 'SiLaravel', iconify: 'simple-icons:laravel' },
	{ name: 'SiRubyonrails', iconify: 'simple-icons:rubyonrails' },

	// Banco de dados
	{ name: 'SiPostgresql', iconify: 'simple-icons:postgresql' },
	{ name: 'SiMysql', iconify: 'simple-icons:mysql' },
	{ name: 'TbBrandMysql', iconify: 'tabler:brand-mysql' },
	{ name: 'SiMongodb', iconify: 'simple-icons:mongodb' },
	{ name: 'TbBrandMongodb', iconify: 'tabler:brand-mongodb' },
	{ name: 'SiRedis', iconify: 'simple-icons:redis' },
	{ name: 'SiSqlite', iconify: 'simple-icons:sqlite' },
	{ name: 'SiOracle', iconify: 'simple-icons:oracle' },
	{ name: 'SiMicrosoftsqlserver', iconify: 'simple-icons:microsoftsqlserver' },
	{ name: 'SiElasticsearch', iconify: 'simple-icons:elasticsearch' },
	{ name: 'SiCassandra', iconify: 'simple-icons:apachecassandra' },

	// DevOps/Cloud
	{ name: 'FaDocker', iconify: 'simple-icons:docker' },
	{ name: 'SiKubernetes', iconify: 'simple-icons:kubernetes' },
	{ name: 'FaAws', iconify: 'simple-icons:amazonaws' },
	{ name: 'SiGooglecloud', iconify: 'simple-icons:googlecloud' },
	{ name: 'SiMicrosoftazure', iconify: 'simple-icons:microsoftazure' },
	{ name: 'SiVercel', iconify: 'simple-icons:vercel' },
	{ name: 'SiNetlify', iconify: 'simple-icons:netlify' },
	{ name: 'SiHeroku', iconify: 'simple-icons:heroku' },
	{ name: 'SiDigitalocean', iconify: 'simple-icons:digitalocean' },
	{ name: 'SiJenkins', iconify: 'simple-icons:jenkins' },
	{ name: 'SiGithubactions', iconify: 'simple-icons:githubactions' },
	{ name: 'SiCircleci', iconify: 'simple-icons:circleci' },
	{ name: 'SiTerraform', iconify: 'simple-icons:terraform' },
	{ name: 'SiAnsible', iconify: 'simple-icons:ansible' },
	{ name: 'SiNginx', iconify: 'simple-icons:nginx' },
	{ name: 'SiApache', iconify: 'simple-icons:apache' },

	// Ferramentas
	{ name: 'FaGithub', iconify: 'simple-icons:github' },
	{ name: 'FaGitAlt', iconify: 'simple-icons:git' },
	{ name: 'SiGitlab', iconify: 'simple-icons:gitlab' },
	{ name: 'SiBitbucket', iconify: 'simple-icons:bitbucket' },
	{ name: 'SiVscode', iconify: 'simple-icons:visualstudiocode' },
	{ name: 'TbBrandVscode', iconify: 'tabler:brand-vscode' },
	{ name: 'SiWebstorm', iconify: 'simple-icons:webstorm' },
	{ name: 'SiIntellijidea', iconify: 'simple-icons:intellijidea' },
	{ name: 'FaLinux', iconify: 'fa:linux' },
	{ name: 'SiFigma', iconify: 'simple-icons:figma' },
	{ name: 'SiPostman', iconify: 'simple-icons:postman' },
	{ name: 'SiInsomnia', iconify: 'simple-icons:insomnia' },
	{ name: 'SiJira', iconify: 'simple-icons:jira' },
	{ name: 'SiNotion', iconify: 'simple-icons:notion' },
	{ name: 'SiSlack', iconify: 'simple-icons:slack' },
	{ name: 'SiTrello', iconify: 'simple-icons:trello' },

	// Outros
	{ name: 'SiGraphql', iconify: 'simple-icons:graphql' },
	{ name: 'SiPrisma', iconify: 'simple-icons:prisma' },
	{ name: 'SiDrizzle', iconify: 'simple-icons:drizzle' },
	{ name: 'SiFirebase', iconify: 'simple-icons:firebase' },
	{ name: 'SiSupabase', iconify: 'simple-icons:supabase' },
	{ name: 'SiStripe', iconify: 'simple-icons:stripe' },
	{ name: 'SiAuth0', iconify: 'simple-icons:auth0' },
	{ name: 'SiJsonwebtokens', iconify: 'simple-icons:jsonwebtokens' },
	{ name: 'SiWebpack', iconify: 'simple-icons:webpack' },
	{ name: 'SiVite', iconify: 'simple-icons:vite' },
	{ name: 'SiEslint', iconify: 'simple-icons:eslint' },
	{ name: 'SiBiome', iconify: 'simple-icons:biome' },
	{ name: 'SiPrettier', iconify: 'simple-icons:prettier' },
	{ name: 'SiJest', iconify: 'simple-icons:jest' },
	{ name: 'SiVitest', iconify: 'simple-icons:vitest' },
	{ name: 'SiCypress', iconify: 'simple-icons:cypress' },
	{ name: 'SiTestinglibrary', iconify: 'simple-icons:testinglibrary' },
	{ name: 'SiStorybook', iconify: 'simple-icons:storybook' },
	{ name: 'SiNpm', iconify: 'simple-icons:npm' },
	{ name: 'SiYarn', iconify: 'simple-icons:yarn' },
	{ name: 'SiPnpm', iconify: 'simple-icons:pnpm' },
	{ name: 'TbBrandTypescript', iconify: 'tabler:brand-typescript' },
	{ name: 'RiJavascriptLine', iconify: 'ri:javascript-line' },
]

const competenceIcons = [
	{ name: 'MdAccountGroup', iconify: 'mdi:account-group' },
	{ name: 'MdMessage', iconify: 'mdi:message-text' },
	{ name: 'MdLeaderboard', iconify: 'mdi:podium' },
	{ name: 'MdLightbulb', iconify: 'mdi:lightbulb-on' },
	{ name: 'MdPsychology', iconify: 'mdi:psychology' },
	{ name: 'MdSchedule', iconify: 'mdi:calendar-clock' },
	{ name: 'MdTrendingUp', iconify: 'mdi:trending-up' },
	{ name: 'MdHandshake', iconify: 'mdi:handshake' },
	{ name: 'MdAutoAwesome', iconify: 'mdi:auto-fix' },
	{ name: 'MdGroups', iconify: 'mdi:account-group-outline' },
	{ name: 'MdPublic', iconify: 'mdi:earth' },
	{ name: 'MdSchool', iconify: 'mdi:school' },
	{ name: 'MdWork', iconify: 'mdi:briefcase' },
	{ name: 'MdEmojiObjects', iconify: 'mdi:lightbulb-outline' },
	{ name: 'MdStar', iconify: 'mdi:star' },
	{ name: 'MdThumbUp', iconify: 'mdi:thumb-up-outline' },
	{ name: 'MdBalance', iconify: 'mdi:scale-balance' },
	{ name: 'MdFeedback', iconify: 'mdi:comment-text-outline' },
	{ name: 'MdManageHistory', iconify: 'mdi:calendar-check' },
	{ name: 'MdRocketLaunch', iconify: 'mdi:rocket-launch' },
	{ name: 'MdDiversity', iconify: 'mdi:diversify' },
	{ name: 'MdPrecisionManufacturing', iconify: 'mdi:target' },
	{ name: 'MdInsights', iconify: 'mdi:chart-line' },
	{ name: 'MdVolunteerActivism', iconify: 'mdi:heart-plus-outline' },
	{ name: 'MdSupport', iconify: 'mdi:headset' },
	{ name: 'MdEngineering', iconify: 'mdi:cog' },
	{ name: 'MdGroupWork', iconify: 'mdi:account-multiple' },
	{ name: 'MdTipsAndUpdates', iconify: 'mdi:lightbulb-outline' },
	{ name: 'MdTimeline', iconify: 'mdi:timeline' },
]

interface IconPickerProps {
	onSelect: (iconName: string) => void
	selectedIcon?: string
	iconType?: 'skill' | 'competence'
	size?: number
	color?: string
}

export const IconPicker: React.FC<IconPickerProps> = ({ onSelect, selectedIcon = '', iconType = 'skill', size = 24, color = '#0ea5e9' }) => {
	const [search, setSearch] = useState('')
	const [customIcon, setCustomIcon] = useState('')
	const [previewIcon, setPreviewIcon] = useState<string | null>(null)

	const normalizedSelected = selectedIcon?.trim().toLowerCase() ?? ''

	const iconSource = iconType === 'competence' ? competenceIcons : popularIcons
	const filteredIcons = useMemo(
		() => iconSource.filter((icon) => icon.name.toLowerCase().includes(search.toLowerCase())),
		[search, iconType]
	)

	const handleCustomIconPreview = () => {
		if (customIcon.trim()) {
			const iconifyName = toIconifyName(customIcon.trim())
			setPreviewIcon(iconifyName)
		}
	}

	const handleCustomIconSelect = () => {
		if (customIcon.trim()) {
			onSelect(customIcon.trim())
			setCustomIcon('')
			setPreviewIcon(null)
		}
	}

	return (
		<div className='w-full'>
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Pesquisar icone...'
				className='mb-2 w-full px-2 py-1 rounded border border-slate-700 bg-slate-900 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm'
			/>

			<div className='grid grid-cols-8 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent scrollbar-thumb-rounded-lg p-1 bg-slate-900 rounded'>
				{filteredIcons.length === 0 && (
					<div className='col-span-8 text-center text-xs text-gray-400 py-4'>Nenhum icone encontrado.</div>
				)}
				{filteredIcons.map((icon) => {
					const isSelected = normalizedSelected === icon.name.toLowerCase()
					return (
						<IconCellErrorBoundary
							key={icon.name}
							fallback={
								<button
									className={`flex items-center justify-center p-1 rounded transition-colors ${
										isSelected
											? 'bg-cyan-500/30 ring-2 ring-cyan-400 ring-inset'
											: 'hover:bg-cyan-500/20 focus:bg-cyan-500/30'
									}`}
									title={icon.name}
									type='button'
									onClick={() => onSelect(icon.name)}
								>
									<Icon icon={FALLBACK_ICON} width={size} height={size} color={color} />
								</button>
							}
						>
							<button
								className={`flex items-center justify-center p-1 rounded transition-colors ${
									isSelected
										? 'bg-cyan-500/30 ring-2 ring-cyan-400 ring-inset'
										: 'hover:bg-cyan-500/20 focus:bg-cyan-500/30'
								}`}
								title={icon.name}
								type='button'
								onClick={() => onSelect(icon.name)}
							>
								<Icon icon={icon.iconify} width={size} height={size} color={color} />
							</button>
						</IconCellErrorBoundary>
					)
				})}
			</div>

			{/* Campo para icone customizado */}
			<div className='mt-3 p-2 bg-slate-800 rounded border border-slate-700'>
				<p className='text-xs text-gray-400 mb-2'>Icone personalizado (formato react-icons):</p>
				<div className='flex gap-2'>
					<input
						type='text'
						value={customIcon}
						onChange={(e) => {
							setCustomIcon(e.target.value)
							setPreviewIcon(null)
						}}
						placeholder='Ex: TbBrandMysql, FaReact, SiDocker'
						className='flex-1 px-2 py-1 rounded border border-slate-700 bg-slate-900 text-cyan-400 text-sm'
					/>
					<button
						type='button'
						onClick={handleCustomIconPreview}
						className='px-2 py-1 bg-slate-700 text-gray-300 rounded text-sm hover:bg-slate-600'
					>
						Preview
					</button>
					<button
						type='button'
						onClick={handleCustomIconSelect}
						disabled={!customIcon.trim()}
						className='px-3 py-1 bg-cyan-500 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed'
					>
						Usar
					</button>
				</div>
				{previewIcon && (
					<div className='mt-2 flex items-center gap-2'>
						<span className='text-xs text-gray-400'>Preview:</span>
						<Icon icon={previewIcon} width={32} height={32} color={color} />
						<span className='text-xs text-gray-500'>({previewIcon})</span>
					</div>
				)}
			</div>
		</div>
	)
}
