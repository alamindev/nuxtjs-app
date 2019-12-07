// This is `services/fireinit.js`

import * as firebase from 'firebase/app'
import 'firebase/auth'

// import 'firebase/firestore'
// import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBl5qVpkfyD9UB5LLP_StBMFLDjGuwRaHg',
  authDomain: 'prems-9eb48.firebaseapp.com',
  databaseURL: 'https://prems-9eb48.firebaseio.com',
  projectId: 'prems-9eb48',
  storageBucket: 'prems-9eb48.appspot.com',
  messagingSenderId: '1053711172328',
  appId: '1:1053711172328:web:32726d5c5a76474c'
}

// eslint-disable-next-line rule
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
export const auth = firebase.auth()

// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const DB = firebase.database()
// export const StoreDB = firebase.firestore()
// export default firebase
