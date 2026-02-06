import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class AboutService extends BaseService {
	constructor() {
		super('about')
	}

	async getAbout(): Promise<AboutType> {
		const response = await api.get('/about')
		return response.data.data
	}

	async createAbout(data: AboutType): Promise<DefaultReturnType<AboutType>> {
		const formData = new FormData()
		formData.append('name', data.name)
		if (data.birthDate) formData.append('birthDate', data.birthDate)
		formData.append('city', data.city)
		formData.append('state', data.state)
		if (data.image) {
			formData.append('image', data.image)
		}

		const response = await api.post('/about', formData, this.getToken())
		return response.data
	}

	async updateAbout(data: AboutType): Promise<DefaultReturnType<AboutType>> {
		const formData = new FormData()
		formData.append('name', data.name)
		if (data.birthDate) formData.append('birthDate', data.birthDate)
		formData.append('city', data.city)
		formData.append('state', data.state)
		if (data.image) {
			formData.append('image', data.image)
		}

		const response = await api.put(`/about/${data.id}`, formData, this.getToken())
		return response.data
	}
}

export type AboutType = {
	id?: string
	name: string
	birthDate?: string
	age?: number
	city: string
	state: string
	image: File | null
}
