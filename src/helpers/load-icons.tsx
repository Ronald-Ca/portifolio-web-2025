import { ReactElement } from 'react'
import { Icon } from '@iconify/react'
import { toIconifyName } from './icon-utils'

// Versao sincrona - retorna componente Iconify
export function loadIconSync(iconName: string, color: string, size = 60): ReactElement {
	const iconifyName = toIconifyName(iconName)
	return <Icon icon={iconifyName} width={size} height={size} style={{ color }} />
}

// Versao async para compatibilidade com codigo existente
export async function loadIcons(iconName: string, color: string, size = 60): Promise<ReactElement> {
	return loadIconSync(iconName, color, size)
}
