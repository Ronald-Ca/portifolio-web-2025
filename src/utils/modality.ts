export const modality = [
    { id: 'on-site', name: 'Presencial' },
    { id: 'remote', name: 'Remoto' },
    { id: 'hybrid', name: 'Híbrido' },
]

export function getModalityLabel(id: string | undefined): string {
    if (!id) return ''
    return modality.find((m) => m.id === id)?.name ?? id
}