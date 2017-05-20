export interface INote {
	id: number
	name: string
	body: string
	date_modified: string
	date_created: string
	is_public: boolean
	score: number
}

export interface IUser {
	isAnonymous: boolean
	redirectEventId: string
	photoURL: string
	email: string
	emailVerified: boolean
	identifierNumber: number
	displayName: string
	providerData: any
	apiKey: string
	appName: string
	authDomain: string
	stsTokenManager: any
	uid: string
}
