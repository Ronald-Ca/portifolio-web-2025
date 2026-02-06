import { useState, useEffect } from 'react'
import { getCitiesByState, type CityItem } from '@app/utils/locations'

export function useCitiesByState(uf: string): { cities: CityItem[]; isLoading: boolean } {
	const [cities, setCities] = useState<CityItem[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!uf || uf.length !== 2) {
			setCities([])
			return
		}
		let cancelled = false
		setIsLoading(true)
		getCitiesByState(uf)
			.then((list) => {
				if (!cancelled) {
					setCities(list)
				}
			})
			.finally(() => {
				if (!cancelled) setIsLoading(false)
			})
		return () => {
			cancelled = true
		}
	}, [uf])

	return { cities, isLoading }
}
