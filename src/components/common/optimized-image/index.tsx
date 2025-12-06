import { useState, ImgHTMLAttributes } from 'react'
import { cn } from '@app/lib/utils'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string
	alt: string
	loading?: 'lazy' | 'eager'
	className?: string
	fallback?: string
}

export default function OptimizedImage({
	src,
	alt,
	loading = 'lazy',
	className,
	fallback = '/placeholder.svg',
	...props
}: OptimizedImageProps) {
	const [imgSrc, setImgSrc] = useState(src || fallback)
	const [isLoading, setIsLoading] = useState(true)

	const handleError = () => {
		if (imgSrc !== fallback) {
			setImgSrc(fallback)
		}
		setIsLoading(false)
	}

	const handleLoad = () => {
		setIsLoading(false)
	}

	return (
		<div className={cn('relative overflow-hidden', className)}>
			{isLoading && (
				<div className="absolute inset-0 bg-gray-700 animate-pulse" />
			)}
			<img
				{...props}
				src={imgSrc}
				alt={alt}
				loading={loading}
				onError={handleError}
				onLoad={handleLoad}
				className={cn(
					className,
					isLoading && 'opacity-0',
					'transition-opacity duration-300'
				)}
			/>
		</div>
	)
}

