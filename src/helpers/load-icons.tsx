import { ReactElement } from 'react'
import { IconType } from 'react-icons'

type IconModule = Record<string, IconType>

const iconLoaders: Record<string, () => Promise<IconModule>> = {
	Fa: () => import('react-icons/fa').then((m) => m as unknown as IconModule),
	Io: () => import('react-icons/io5').then((m) => m as unknown as IconModule),
	Si: () => import('react-icons/si').then((m) => m as unknown as IconModule),
	Di: () => import('react-icons/di').then((m) => m as unknown as IconModule),
	Bs: () => import('react-icons/bs').then((m) => m as unknown as IconModule),
	Ri: () => import('react-icons/ri').then((m) => m as unknown as IconModule),
	Md: () => import('react-icons/md').then((m) => m as unknown as IconModule),
	Ai: () => import('react-icons/ai').then((m) => m as unknown as IconModule),
	Bi: () => import('react-icons/bi').then((m) => m as unknown as IconModule),
	Ci: () => import('react-icons/ci').then((m) => m as unknown as IconModule),
	Cg: () => import('react-icons/cg').then((m) => m as unknown as IconModule),
	Fi: () => import('react-icons/fi').then((m) => m as unknown as IconModule),
	Fc: () => import('react-icons/fc').then((m) => m as unknown as IconModule),
	Gi: () => import('react-icons/gi').then((m) => m as unknown as IconModule),
	Go: () => import('react-icons/go').then((m) => m as unknown as IconModule),
	Gr: () => import('react-icons/gr').then((m) => m as unknown as IconModule),
	Hi: () => import('react-icons/hi').then((m) => m as unknown as IconModule),
	Im: () => import('react-icons/im').then((m) => m as unknown as IconModule),
	Lu: () => import('react-icons/lu').then((m) => m as unknown as IconModule),
	Pi: () => import('react-icons/pi').then((m) => m as unknown as IconModule),
	Rx: () => import('react-icons/rx').then((m) => m as unknown as IconModule),
	Sl: () => import('react-icons/sl').then((m) => m as unknown as IconModule),
	Tb: () => import('react-icons/tb').then((m) => m as unknown as IconModule),
	Ti: () => import('react-icons/ti').then((m) => m as unknown as IconModule),
	Vsc: () => import('react-icons/vsc').then((m) => m as unknown as IconModule),
	Wi: () => import('react-icons/wi').then((m) => m as unknown as IconModule),
	Lia: () => import('react-icons/lia').then((m) => m as unknown as IconModule),
	Tfi: () => import('react-icons/tfi').then((m) => m as unknown as IconModule),
	Hi2: () => import('react-icons/hi2').then((m) => m as unknown as IconModule),
	Fa6: () => import('react-icons/fa6').then((m) => m as unknown as IconModule),
}

function getIconPrefix(iconName: string): string {
	// Handle 3-character prefixes first
	const threeCharPrefixes = ['Lia', 'Tfi', 'Hi2', 'Fa6', 'Vsc']
	for (const prefix of threeCharPrefixes) {
		if (iconName.startsWith(prefix)) {
			return prefix
		}
	}
	// Then 2-character prefixes
	return iconName.slice(0, 2)
}

const iconCache = new Map<string, IconType>()

export async function loadIcons(iconName: string, color: string): Promise<ReactElement> {
	// Check cache first
	let Icon = iconCache.get(iconName)

	if (!Icon) {
		const prefix = getIconPrefix(iconName)
		const loader = iconLoaders[prefix]

		if (!loader) {
			throw new Error(`Icon prefix ${prefix} not found for icon ${iconName}`)
		}

		const module = await loader()
		Icon = module[iconName]

		if (!Icon) {
			throw new Error(`Icon ${iconName} not found`)
		}

		iconCache.set(iconName, Icon)
	}

	return <Icon size={60} style={{ color }} />
}

// Synchronous version for when you already have the icon loaded
export function renderIcon(Icon: IconType, color: string, size = 60): ReactElement {
	return <Icon size={size} style={{ color }} />
}
