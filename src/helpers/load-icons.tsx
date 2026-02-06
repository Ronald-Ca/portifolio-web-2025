import { Component, ReactElement } from 'react'
import { Icon } from '@iconify/react'
import { toIconifyName } from './icon-utils'

const FALLBACK_ICON = 'mdi:code-tags'

const REACT_ICON_NAMES = ['react', 'fareact', 'sireact', 'sireactnative']

function isReactIcon(iconName: string): boolean {
	const normalized = iconName.trim().toLowerCase()
	return REACT_ICON_NAMES.includes(normalized)
}

function ReactLogoIcon({ color, size }: { color: string; size: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="-11.5 -10.23174 23 20.46348"
			width={size}
			height={size}
			style={{ display: 'block' }}
		>
			<title>React</title>
			<circle cx="0" cy="0" r="2.05" fill={color} />
			<g stroke={color} fill="none" strokeWidth="0.75">
				<ellipse rx="11" ry="4.2" />
				<ellipse rx="11" ry="4.2" transform="rotate(60)" />
				<ellipse rx="11" ry="4.2" transform="rotate(120)" />
			</g>
		</svg>
	)
}

class IconErrorBoundary extends Component<
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

function IconWithFallback({
	iconifyName,
	color,
	size,
}: {
	iconifyName: string
	color: string
	size: number
}) {
	return (
		<IconErrorBoundary
			fallback={<Icon icon={FALLBACK_ICON} width={size} height={size} style={{ color }} />}
		>
			<Icon icon={iconifyName} width={size} height={size} style={{ color }} />
		</IconErrorBoundary>
	)
}

export function loadIconSync(iconName: string, color: string, size = 60): ReactElement {
	if (!iconName?.trim()) {
		return <Icon icon={FALLBACK_ICON} width={size} height={size} style={{ color }} />
	}
	if (isReactIcon(iconName)) {
		return <ReactLogoIcon color={color} size={size} />
	}
	const iconifyName = toIconifyName(iconName)
	return (
		<IconWithFallback iconifyName={iconifyName} color={color} size={size} />
	)
}

export async function loadIcons(iconName: string, color: string, size = 60): Promise<ReactElement> {
	return loadIconSync(iconName, color, size)
}
