import * as moment from 'moment'

export function prettyDate (dateString: string): string {
	return moment.parseZone(dateString, 'ddd MMM DD YYYY HH:mm:ss ZZ')
				 .local()
				 .fromNow()
}

export function wordCount (string: string): number {
	return string ? (string.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length : 0
}

export function charCount (string: string): number {
	return string ? string.replace(/\s/g, '').length : 0
}
