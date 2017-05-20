import api from '../api'
import { User } from '../../classes'
import { SET_USER } from '../constants'

const state = {
  user: null
}

const actions = {
  LOG_IN_USER: ({ commit }: any, data: any) => {
    return api.logIn(data.email, data.password)
              .then((user: User) => commit(SET_USER, user))
  },

  LOG_OUT_USER: ({ state, commit }: any) => {
    return api.logOut()
              .then(() => commit(SET_USER, null))
  },

  SIGN_UP_USER: ({ commit }: any, data: any) => {
    return api.signUp(data.email, data.password)
              .then((user: User) => commit(SET_USER, user))
  }
}

const mutations = {
  [SET_USER] (state: any, user: User) {
    state.user = user
  }
}

const getters = {
  user: (state: any) => {
    return state.user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
