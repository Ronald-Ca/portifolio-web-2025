export const queryKeys = {
	home: {
		all: ['home'] as const,
		detail: () => [...queryKeys.home.all, 'detail'] as const,
	},
	project: {
		all: ['project'] as const,
		list: () => [...queryKeys.project.all, 'list'] as const,
		detail: (id?: string) => [...queryKeys.project.all, 'detail', id] as const,
	},
	skill: {
		all: ['skill'] as const,
		list: () => [...queryKeys.skill.all, 'list'] as const,
		detail: (id?: string) => [...queryKeys.skill.all, 'detail', id] as const,
	},
	about: {
		all: ['about'] as const,
		detail: () => [...queryKeys.about.all, 'detail'] as const,
	},
	socialMedia: {
		all: ['social-media'] as const,
		list: () => [...queryKeys.socialMedia.all, 'list'] as const,
	},
	education: {
		all: ['education'] as const,
		list: () => [...queryKeys.education.all, 'list'] as const,
	},
	experience: {
		all: ['experience'] as const,
		list: () => [...queryKeys.experience.all, 'list'] as const,
	},
	curriculum: {
		all: ['curriculum'] as const,
		detail: () => [...queryKeys.curriculum.all, 'detail'] as const,
	},
	user: {
		all: ['user'] as const,
		authenticate: () => [...queryKeys.user.all, 'authenticate'] as const,
		validateToken: () => [...queryKeys.user.all, 'validate-token'] as const,
	},
} as const

