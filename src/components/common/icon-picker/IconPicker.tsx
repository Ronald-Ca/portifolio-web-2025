import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'
import { FaSpinner } from 'react-icons/fa'

type IconModule = Record<string, IconType>

const iconLibConfigs = [
	{ key: 'fa', label: 'FontAwesome', loader: () => import('react-icons/fa').then((m) => m as unknown as IconModule) },
	{ key: 'io', label: 'IonIcons', loader: () => import('react-icons/io5').then((m) => m as unknown as IconModule) },
	{ key: 'si', label: 'SimpleIcons', loader: () => import('react-icons/si').then((m) => m as unknown as IconModule) },
	{ key: 'di', label: 'DevIcons', loader: () => import('react-icons/di').then((m) => m as unknown as IconModule) },
	{ key: 'bs', label: 'Bootstrap', loader: () => import('react-icons/bs').then((m) => m as unknown as IconModule) },
	{ key: 'ri', label: 'RemixIcon', loader: () => import('react-icons/ri').then((m) => m as unknown as IconModule) },
	{ key: 'md', label: 'Material', loader: () => import('react-icons/md').then((m) => m as unknown as IconModule) },
	{ key: 'ai', label: 'AntDesign', loader: () => import('react-icons/ai').then((m) => m as unknown as IconModule) },
	{ key: 'bi', label: 'BoxIcons', loader: () => import('react-icons/bi').then((m) => m as unknown as IconModule) },
	{ key: 'ci', label: 'Circum', loader: () => import('react-icons/ci').then((m) => m as unknown as IconModule) },
	{ key: 'cg', label: 'CSSGG', loader: () => import('react-icons/cg').then((m) => m as unknown as IconModule) },
	{ key: 'fi', label: 'Feather', loader: () => import('react-icons/fi').then((m) => m as unknown as IconModule) },
	{ key: 'fc', label: 'FlatColor', loader: () => import('react-icons/fc').then((m) => m as unknown as IconModule) },
	{ key: 'fa6', label: 'FontAwesome6', loader: () => import('react-icons/fa6').then((m) => m as unknown as IconModule) },
	{ key: 'gi', label: 'GameIcons', loader: () => import('react-icons/gi').then((m) => m as unknown as IconModule) },
	{ key: 'go', label: 'GithubOcticons', loader: () => import('react-icons/go').then((m) => m as unknown as IconModule) },
	{ key: 'gr', label: 'Grommet', loader: () => import('react-icons/gr').then((m) => m as unknown as IconModule) },
	{ key: 'hi', label: 'HeroIcons', loader: () => import('react-icons/hi').then((m) => m as unknown as IconModule) },
	{ key: 'hi2', label: 'HeroIcons2', loader: () => import('react-icons/hi2').then((m) => m as unknown as IconModule) },
	{ key: 'im', label: 'IcoMoon', loader: () => import('react-icons/im').then((m) => m as unknown as IconModule) },
	{ key: 'lia', label: 'LineAwesome', loader: () => import('react-icons/lia').then((m) => m as unknown as IconModule) },
	{ key: 'lu', label: 'Lucide', loader: () => import('react-icons/lu').then((m) => m as unknown as IconModule) },
	{ key: 'pi', label: 'Phosphor', loader: () => import('react-icons/pi').then((m) => m as unknown as IconModule) },
	{ key: 'rx', label: 'Radix', loader: () => import('react-icons/rx').then((m) => m as unknown as IconModule) },
	{ key: 'sl', label: 'SimpleLine', loader: () => import('react-icons/sl').then((m) => m as unknown as IconModule) },
	{ key: 'tb', label: 'Tabler', loader: () => import('react-icons/tb').then((m) => m as unknown as IconModule) },
	{ key: 'tfi', label: 'Themify', loader: () => import('react-icons/tfi').then((m) => m as unknown as IconModule) },
	{ key: 'ti', label: 'TypIcons', loader: () => import('react-icons/ti').then((m) => m as unknown as IconModule) },
	{ key: 'vsc', label: 'VSCode', loader: () => import('react-icons/vsc').then((m) => m as unknown as IconModule) },
	{ key: 'wi', label: 'Weather', loader: () => import('react-icons/wi').then((m) => m as unknown as IconModule) },
]

// Cache for loaded icon libraries
const iconLibCache = new Map<string, IconModule>()

interface IconPickerProps {
	onSelect: (iconName: string) => void
	size?: number
	color?: string
	libsToShow?: string[]
}

export const IconPicker: React.FC<IconPickerProps> = ({ onSelect, size = 24, color = '#0ea5e9', libsToShow }) => {
	const libs = libsToShow ? iconLibConfigs.filter((lib) => libsToShow.includes(lib.key)) : iconLibConfigs
	const [activeLib, setActiveLib] = useState(libs[0].key)
	const [search, setSearch] = useState('')
	const [icons, setIcons] = useState<IconModule>({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadLibrary = async () => {
			// Check cache first
			if (iconLibCache.has(activeLib)) {
				setIcons(iconLibCache.get(activeLib)!)
				setLoading(false)
				return
			}

			setLoading(true)
			const libConfig = libs.find((lib) => lib.key === activeLib)
			if (libConfig) {
				try {
					const module = await libConfig.loader()
					iconLibCache.set(activeLib, module)
					setIcons(module)
				} catch (error) {
					console.error(`Failed to load icon library: ${activeLib}`, error)
					setIcons({})
				}
			}
			setLoading(false)
		}

		loadLibrary()
	}, [activeLib, libs])

	// Filter icons by search term (exclude 'default' export)
	const filteredIcons = Object.entries(icons).filter(
		([iconName]) => iconName !== 'default' && iconName.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className='w-full'>
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Pesquisar ícone...'
				className='mb-2 w-full px-2 py-1 rounded border border-slate-700 bg-slate-900 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm'
			/>
			<div className='flex gap-2 mb-2 flex-wrap'>
				{libs.map((lib) => (
					<button
						key={lib.key}
						className={`px-2 py-1 rounded text-xs font-medium border ${activeLib === lib.key ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-slate-800 text-cyan-400 border-slate-700'} transition`}
						onClick={() => setActiveLib(lib.key)}
						type='button'
					>
						{lib.label}
					</button>
				))}
			</div>
			<div className='grid grid-cols-8 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent scrollbar-thumb-rounded-lg p-1 bg-slate-900 rounded'>
				{loading && (
					<div className='col-span-8 flex justify-center items-center py-8'>
						<FaSpinner className='animate-spin text-cyan-500' size={24} />
					</div>
				)}
				{!loading && filteredIcons.length === 0 && (
					<div className='col-span-8 text-center text-xs text-gray-400 py-4'>Nenhum ícone encontrado.</div>
				)}
				{!loading &&
					filteredIcons.map(([iconName, IconRaw]) => {
						const Icon = IconRaw as React.ComponentType<{ size: number; color: string }>
						return (
							<button
								key={iconName}
								className='flex items-center justify-center p-1 rounded hover:bg-cyan-500/20 focus:bg-cyan-500/30'
								title={iconName}
								type='button'
								onClick={() => onSelect(iconName)}
							>
								<Icon size={size} color={color} />
							</button>
						)
					})}
			</div>
		</div>
	)
}
