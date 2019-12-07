import { auth } from '@/services/fireinit.js'

export const state = () => ({
  sidebarVisible: false,
  userToken: null
})

export const getter = {
  userToken: (state, getters) => {
    return state.userToken
  }
}

export const mutations = {
  SIDEBAR_TOGGLE: function(state) {
    state.sidebarVisible = !state.sidebarVisible
  },
  SET_USER_TOKEN(state, payload) {
    state.userToken = payload
  }
}

export const actions = {
  autoSignIn({ commit }, payload) {
    commit('SET_USER_TOKEN', payload)
  },
  signInWithEmail({ commit }, payload) {
    try {
      $nuxt.$router.push('/overview') // eslint-disable-line

      // auth
      //   .signInWithEmailAndPassword(payload.email, payload.password)
      //   .then(() => {
      //     // Push to Dashboard Overview
      //     $nuxt.$router.push('/overview') // eslint-disable-line
      //   })
      //   .catch(error => {
      //     // Handle Errors here.
      //     print(error)
      //   })
    } catch (error) {
      print(error)
    }
  },

  signOut({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit('SET_USER_TOKEN', null)
        $nuxt.$router.push('/index') // eslint-disable-line
      })
      .catch(error => print(error))
  }
}
