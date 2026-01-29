// Mapeamento de prefixos react-icons para Iconify
const prefixMap: Record<string, string> = {
	Fa: 'fa',
	Fa6: 'fa6',
	Io: 'ion',
	Si: 'simple-icons',
	Di: 'devicon',
	Bs: 'bi',
	Ri: 'ri',
	Md: 'mdi',
	Ai: 'ant-design',
	Bi: 'bx',
	Fi: 'feather',
	Gi: 'game-icons',
	Go: 'octicon',
	Hi: 'heroicons-outline',
	Hi2: 'heroicons',
	Lu: 'lucide',
	Pi: 'ph',
	Tb: 'tabler',
	Ti: 'typcn',
	Vsc: 'codicon',
	Cg: 'css-gg',
	Fc: 'flat-color-icons',
	Gr: 'grommet-icons',
	Im: 'icomoon-free',
	Rx: 'radix-icons',
	Sl: 'simple-line-icons',
	Tfi: 'tabler',
	Wi: 'wi',
	Ci: 'ci',
	Lia: 'la',
}

// Prefixos de 3 caracteres (verificar primeiro)
const threeCharPrefixes = ['Lia', 'Tfi', 'Hi2', 'Fa6', 'Vsc']

function getPrefix(iconName: string): { prefix: string; name: string } {
	for (const p of threeCharPrefixes) {
		if (iconName.startsWith(p)) {
			return { prefix: p, name: iconName.slice(p.length) }
		}
	}
	return { prefix: iconName.slice(0, 2), name: iconName.slice(2) }
}

// Converte PascalCase para kebab-case
function toKebabCase(str: string): string {
	return str
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
		.toLowerCase()
}

// Converte nome react-icons para formato Iconify
// Ex: "TbBrandMysql" -> "tabler:brand-mysql"
export function toIconifyName(reactIconName: string): string {
	const trimmed = reactIconName.trim()
	const { prefix, name } = getPrefix(trimmed)
	const iconifyPrefix = prefixMap[prefix]

	if (!iconifyPrefix) {
		console.warn(`Prefixo desconhecido: ${prefix} para icone ${trimmed}`)
		return 'mdi:help-circle'
	}

	return `${iconifyPrefix}:${toKebabCase(name)}`
}
