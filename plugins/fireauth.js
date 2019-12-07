import { auth } from '@/services/fireinit.js'

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // return resolve(store.commit('SET_USER', user.getToken()))
        user.getIdToken().then(function(token) {
          store.dispatch('autoSignIn', token)
        })
      }
      return resolve()
    })
  })
}
