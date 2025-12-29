import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"
import { SkillType } from "./skill-service"

export default class ExperienceService extends BaseService {
	constructor() {
		super('experience')
	}

	async getAll(): Promise<ExperienceType[]> {
		const response = await api.get('/experience')
		return response.data.data
	}

	async create(data: ExperienceType): Promise<DefaultReturnType<ExperienceType>> {
		const response = await api.post('/experience', data, this.getToken())
		return response.data.data
	}

	async update(data: ExperienceType): Promise<DefaultReturnType<ExperienceType>> {
		const response = await api.put(`/experience/${data.id}`, data, this.getToken())
		return response.data.data
	}
}

export type ExperienceType = {
	id?: string
	company: string
	role: string
	yearInitial: number
	mothInitial: string
	yearFinal?: number
	mothFinal: string
	activities: string[]
	experienceSkill: ExperienceSkillType[]
}

type ExperienceSkillType = {
	experienceId: string
	id: string
	skill: SkillType
	skillId: string
}
