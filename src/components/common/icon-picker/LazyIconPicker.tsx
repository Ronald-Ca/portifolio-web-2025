import React, { Suspense, lazy } from 'react'
import { FaSpinner } from 'react-icons/fa'

const IconPicker = lazy(() => import('./IconPicker').then(m => ({ default: m.IconPicker })))

interface LazyIconPickerProps {
	onSelect: (iconName: string) => void
	size?: number
	color?: string
	libsToShow?: string[]
}

const LoadingFallback = () => (
	<div className='w-full flex justify-center items-center py-8'>
		<FaSpinner className='animate-spin text-cyan-500' size={24} />
	</div>
)

export const LazyIconPicker: React.FC<LazyIconPickerProps> = (props) => {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<IconPicker {...props} />
		</Suspense>
	)
}

export default LazyIconPicker
