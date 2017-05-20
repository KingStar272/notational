import { INote, IUser } from './interfaces'
import * as moment from 'moment'

export class Note implements INote {
	id: number
	name: string
	body: string
	date_modified: string
	date_created: string
	is_public: boolean
	score: number

	constructor (id: number, name: string) {
		this.id = id
		this.name = name
		this.body = ''
		this.date_modified = moment().toString()
		this.date_created = moment().toString()
		this.is_public = false
	}
}

export class User implements IUser {
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