import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import nv from './modules/nv'
import {
  SET_ACTIVE_NOTE,
  SET_ACTIVE_KEY,
  SET_QUERY,
  SET_THEME,
  SET_NOTES,
  SET_RESULT_INDEX,
  SET_RENAMING_ID,
  SET_EDITING_ID } from './constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    query: '',
    resultIndex: -1,
    renamingId: null,
    editingId: null
  },

  modules: {
    auth,
    nv
  },

  actions: {
    RESET_ACTIVE_NOTE: ({ state, commit, rootState }: any) => {
      commit(SET_RESULT_INDEX, -1)
      commit(SET_ACTIVE_NOTE, null)
      commit(SET_ACTIVE_KEY, null)
    },

    RESET_APP: ({ state, commit, rootState }: any) => {
      commit(SET_THEME, 'light')
      commit(SET_QUERY, '')
      commit(SET_RESULT_INDEX, -1)
      commit(SET_NOTES, [])
      commit(SET_ACTIVE_NOTE, null)
      commit(SET_ACTIVE_KEY, null)
    },
  },

  mutations: {
    [SET_QUERY] (state: any, query: string) {
      state.query = query
    },

    [SET_RESULT_INDEX] (state: any, resultIndex: number) {
      state.resultIndex = resultIndex
    },

    [SET_RENAMING_ID] (state: any, renamingId: number) {
      state.renamingId = renamingId
    },

    [SET_EDITING_ID] (state: any, editingId: number) {
      state.editingId = editingId
    }
  },

  getters: {
    query: (state: any) => {
      return state.query
    },

    resultIndex: (state: any) => {
      return state.resultIndex
    },

    renamingId: (state: any) => {
      return state.renamingId
    },

    editingId: (state: any) => {
      return state.editingId
    }
  }
})

export default store
