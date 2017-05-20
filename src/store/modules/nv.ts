import * as Vue from 'vue'
import * as moment from 'moment'

import api from '../api'
import { Note } from '../../classes'
import {
  SET_RESULT_INDEX,
  SET_THEME,
  SET_NOTES,
  SET_ACTIVE_NOTE,
  SET_ACTIVE_KEY,
  UPDATE_NOTE,
  CREATE_NOTE,
  DELETE_NOTE,
  TOGGLE_IS_PUBLIC } from '../constants'

const state = {
    theme: 'light',
    notes: [],
    activeNote: null,
    activeKey: null
}

const actions = {
    INIT_NOTES: ({ state, commit, rootState }: any) => {
      return api.initNotesForUserId(rootState.auth.user.uid)
    },

    FETCH_USER_DATA: ({ state, commit, rootState }: any) => {
      return api.getDataForUserId(rootState.auth.user.uid)
        .then((res: any) => {
          commit(SET_NOTES, res.notes)
          commit(SET_THEME, res.theme)
        })
    },

    FETCH_PREVIEW_DATA: ({ state, commit, rootState }: any) => {
      return api.getPreviewData()
        .then((res: any) => {
          commit(SET_NOTES, res.notes)
          commit(SET_THEME, res.theme)
        })
    },

    CREATE_NOTE: ({ state, commit, rootState }: any, data: any) => {
      const note: Note = new Note(data.id, data.name)
      if (rootState.auth.user) {
        return api.createNote(rootState.auth.user.uid, note)
          .then((key: string) => {
            commit(SET_RESULT_INDEX, 0)
            commit(CREATE_NOTE, { key: key, note: note })
          })
      } else {        
        commit(SET_RESULT_INDEX, 0)
        commit(CREATE_NOTE, { key: note.id, note: note })
      }
    },

    UPDATE_NOTE: ({ state, commit, rootState }: any) => {
      if (rootState.auth.user) {
        return api.updateNote(rootState.auth.user.uid, state.activeKey, state.activeNote)
                  .then((res: any) => commit(UPDATE_NOTE, { key: res.key, date_modified: res.date_modified }))
      } else {
        const dateModified: string = moment().toString()
        commit(UPDATE_NOTE, { key: state.activeKey, date_modified: dateModified })
      }
    },

    DELETE_NOTE: ({ state, commit, rootState }: any) => {
      if (rootState.auth.user) {
        return api.deleteNote(rootState.auth.user.uid, state.activeKey)
                  .then(() => { commit(DELETE_NOTE, state.activeKey)} )
      } else {
        commit(DELETE_NOTE, state.activeKey)
      }
    },

    UPDATE_THEME: ({ state, commit, rootState }: any, theme: string) => {
      if (rootState.auth.user) {
        return api.updateTheme(rootState.auth.user.uid, theme)
                  .then((theme: string) => commit(SET_THEME, theme))
      } else {
        commit(SET_THEME, theme)
      }
    },

    TOGGLE_IS_PUBLIC: ({ state, commit, rootState }: any, note: Note) => {
      return api.toggleIsPublic(rootState.auth.user.uid, state.activeKey, note)
                .then((res: any) => commit(TOGGLE_IS_PUBLIC, { key: res.key, is_public: res.is_public }))
    },

    FETCH_PUBLIC_NOTE_FOR_ID: ({ state, commit, rootState }: any, noteId: string) => {
      return api.getPublicNoteForId(noteId)
                .then((note: Note) => commit(SET_ACTIVE_NOTE, note))
    }
}

const mutations = {
    [SET_THEME] (state: any, theme: string) {
      state.theme = theme
    },

    [SET_NOTES] (state: any, notes: Array<Note>) {
      state.notes = notes
    },

    [SET_ACTIVE_NOTE] (state: any, note: Note) {
      state.activeNote = note
    },

    [SET_ACTIVE_KEY] (state: any, key: string) {
      state.activeKey = key
    },

    [CREATE_NOTE] (state: any, data: any) {
      Vue.set(state.notes, data.key, data.note)
      state.activeKey = data.key
      state.activeNote = data.note
    },

    [UPDATE_NOTE] (state: any, data: any) {
      let note = state.notes[`${data.key}`]
      note.date_modified = data.date_modified
    },

    [DELETE_NOTE] (state: any, key: string) {
      Vue.delete(state.notes, key)
    },

    [TOGGLE_IS_PUBLIC] (state: any, data: any) {
      let note = state.notes[`${data.key}`]
      note.is_public = data.is_public 
    }
}

const getters = {
    theme: (state: any) => {
      return state.theme
    },

    notes: (state: any) => {
      return state.notes
    },

    activeNote: (state: any) => {
      return state.activeNote
    },

    activeKey: (state: any) => {
      return state.activeKey
    }
}

export default {
  state,
  actions,
  mutations,
  getters
}
