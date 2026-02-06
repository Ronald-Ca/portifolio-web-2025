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

const reactIconToIconify: Record<string, string> = {
	FaHtml5: 'simple-icons:html5',
	FaCss3Alt: 'simple-icons:css3',
	FaReact: 'skill-icons:react',
	React: 'skill-icons:react',
	react: 'skill-icons:react',
	SiReact: 'skill-icons:react',
	SiReactnative: 'skill-icons:react',
	FaNodeJs: 'simple-icons:nodedotjs',
	FaGitAlt: 'simple-icons:git',
	FaGithub: 'simple-icons:github',
	FaDocker: 'simple-icons:docker',
	FaVuejs: 'simple-icons:vuedotjs',
	FaJava: 'fa-brands:java',
	FaAws: 'simple-icons:amazonaws',
	FaAngular: 'simple-icons:angular',
	FaLinux: 'simple-icons:linux',
	SiTypescript: 'simple-icons:typescript',
	SiJavascript: 'simple-icons:javascript',
	SiMongodb: 'simple-icons:mongodb',
	SiMysql: 'simple-icons:mysql',
	SiPostgresql: 'simple-icons:postgresql',
	SiDocker: 'simple-icons:docker',
	SiGit: 'simple-icons:git',
	SiNodedotjs: 'simple-icons:nodedotjs',
	SiDrizzle: 'simple-icons:drizzle',
	SiRadixui: 'simple-icons:radixui',
	SiVitest: 'simple-icons:vitest',
	SiBiome: 'simple-icons:biome',
	TbBrandMysql: 'tabler:brand-mysql',
	TbBrandMongodb: 'tabler:brand-mongodb',
	TbBrandSocketIo: 'mdi:lan-connect',
	IoLogoJavascript: 'simple-icons:javascript',
	DiMongodb: 'simple-icons:mongodb',
	BsFiletypeSql: 'bi:filetype-sql',
	MdGroups2: 'mdi:account-group',
	RiFocus3Fill: 'ri:focus-3-fill',
	RiSpeakLine: 'ri:speak-line',
	SiPersistent: 'mdi:infinity',
	MdAccountGroup: 'mdi:account-group',
	MdMessage: 'mdi:message-text',
	MdLeaderboard: 'mdi:podium',
	MdLightbulb: 'mdi:lightbulb-on',
	MdPsychology: 'mdi:psychology',
	MdSchedule: 'mdi:calendar-clock',
	MdTrendingUp: 'mdi:trending-up',
	MdHandshake: 'mdi:handshake',
	MdAutoAwesome: 'mdi:auto-fix',
	MdGroups: 'mdi:account-group-outline',
	MdPublic: 'mdi:earth',
	MdSchool: 'mdi:school',
	MdWork: 'mdi:briefcase',
	MdEmojiObjects: 'mdi:lightbulb-outline',
	MdStar: 'mdi:star',
	MdThumbUp: 'mdi:thumb-up-outline',
	MdBalance: 'mdi:scale-balance',
	MdFeedback: 'mdi:comment-text-outline',
	MdManageHistory: 'mdi:calendar-check',
	MdRocketLaunch: 'mdi:rocket-launch',
	MdDiversity: 'mdi:diversify',
	MdPrecisionManufacturing: 'mdi:target',
	MdInsights: 'mdi:chart-line',
	MdVolunteerActivism: 'mdi:heart-plus-outline',
	MdSupport: 'mdi:headset',
	MdEngineering: 'mdi:cog',
	MdGroupWork: 'mdi:account-multiple',
	MdTipsAndUpdates: 'mdi:lightbulb-outline',
	MdTimeline: 'mdi:timeline',
}

export function toIconifyName(reactIconName: string): string {
	const trimmed = reactIconName.trim()
	if (!trimmed) return 'mdi:code-tags'
	const fromMap = reactIconToIconify[trimmed]
	if (fromMap) return fromMap
	const { prefix, name } = getPrefix(trimmed)
	const iconifyPrefix = prefixMap[prefix]
	if (!iconifyPrefix) {
		return 'mdi:code-tags'
	}
	return `${iconifyPrefix}:${toKebabCase(name)}`
}
