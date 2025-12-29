import api from '../lib/api'
import BaseService, { DefaultReturnType } from '../lib/base-service'

export default class HomeService extends BaseService {
	constructor() {
		super('home')
	}

	async getHome(): Promise<HomeType> {
		const response = await api.get('/home')
		return response.data.data
	}

	async createHome(data: HomeType): Promise<DefaultReturnType<HomeType>> {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('role', data.role)
		formData.append('description', data.description)
		if (data.image) {
			formData.append('image', data.image)
		}
		if (data.colorBackground) {
			formData.append('colorBackground', data.colorBackground)
		}
		if (data.imageBackground) {
			formData.append('imageBackground', data.imageBackground)
		}

		const response = await api.post('/home', formData, this.getToken())
		return response.data
	}

	async updateHome(data: HomeType): Promise<DefaultReturnType<HomeType>> {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('role', data.role)
		formData.append('description', data.description)
		if (data.image) {
			formData.append('image', data.image)
		}
		if (data.colorBackground) {
			formData.append('colorBackground', data.colorBackground)
		}
		if (data.imageBackground) {
			formData.append('imageBackground', data.imageBackground)
		}

		const response = await api.put(`/home/${data.id}`, formData, this.getToken())
		return response.data
	}
}

export type MainSkill = {
	id: string
	name: string
	icon: string
	color: string | null
}

export type HomeType = {
	id?: string
	image: File | null
	title: string
	role: string
	description: string
	colorBackground?: string
	imageBackground?: File | null
	mainSkills?: MainSkill[]
}
