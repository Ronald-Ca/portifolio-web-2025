const IBGE_BASE = 'https://servicodados.ibge.gov.br/api/v1/localidades'

export type StateItem = { id: number; sigla: string; name: string }

export type CityItem = { id: number; name: string }

export async function getStates(): Promise<StateItem[]> {
	const res = await fetch(`${IBGE_BASE}/estados?orderBy=nome`)
	const data = await res.json()
	return (data as { id: number; sigla: string; nome: string }[]).map((e) => ({
		id: e.id,
		sigla: e.sigla,
		name: e.nome,
	}))
}

export async function getCitiesByState(uf: string): Promise<CityItem[]> {
	if (!uf || uf.length !== 2) return []
	const res = await fetch(`${IBGE_BASE}/estados/${uf}/municipios?orderBy=nome`)
	const data = await res.json()
	return (data as { id: number; nome: string }[]).map((m) => ({
		id: m.id,
		name: m.nome,
	}))
}
