import * as ls from 'local-storage'
import * as moment from 'moment'
import * as _ from 'lodash'
import 'string_score'
import { Note, User } from '../classes'

export const localStorageMixin = {
  methods: {
    ls_pushUser (user: User): void {
      ls.set('user', user)
    },

    ls_pullUser (): User {
      return ls.get('user')
    },

    ls_logOut (): void {
      return ls.clear()
    }
  }
}

export const noteMixin = {
  methods: {
    findKeyForNoteId (noteId: number, notes: Array<Note>): string {
      return _.findKey(notes, { 'id': noteId })
    },

    nextIdForNotes (notes: Array<Note>): number {
      const ids: Array<number> = _.map(notes, (note: Note): number => { return note.id });
      return ids.length > 0 ? Math.max(...ids) + 1 : 1
    },

    filterNotesForQuery (query: string, notes: Array<Note>): Array<Note> {
      return _.filter(notes, (note: Note) => {
        const queryLower = query.toLowerCase()
        const nameScore: number = note.name.toLowerCase().score(queryLower)
        const bodyScore: number = note.body.toLowerCase().score(queryLower)
        note.score = nameScore + bodyScore
        return nameScore > 0 || bodyScore > 0
      })
    },

    sortNotes (notes: Array<Note>, useScore: boolean): Array<Note> {
      const now: moment.Moment = moment()
      if (useScore)
        return _.orderBy(notes, ['score', (note: Note) => this.secondsFromNow(now, note.date_modified)], ['desc', 'asc'])
      else
        return _.orderBy(notes, [(note: Note) => this.secondsFromNow(now, note.date_modified)], ['asc'])
    },

    secondsFromNow (now: moment.Moment, dateString: string): number {
      const date: moment.Moment = moment(dateString)
      return now.diff(date, 'seconds')
    }
  }
}

export const utilsMixin = {
  methods: {
    selectElement (selector: string): any {
      return document.querySelector(`${selector}`)
    },

    focusElement (selector: string): void {
      const element: any = this.selectElement(selector)
      element.focus()
    }
  }
}
