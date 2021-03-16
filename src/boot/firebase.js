// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/database'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

console.log('node env: ' + process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  console.log('env: PROD')
} else if (process.env.NODE_ENV === 'development') {
  console.log('env: DEV')
} else {
  console.log('env: not supported!')
}

console.log('FIREBASE_API_KEY: ' + process.env.FIREBASE_API_KEY)
console.log('Firebase_authDomain: ' + process.env.Firebase_authDomain)
console.log('Firebase_projectId: ' + process.env.Firebase_projectId)
console.log('Firebase_storageBucket: ' + process.env.Firebase_storageBucket)
console.log('Firebase_messagingSenderId: ' + process.env.Firebase_messagingSenderId)
console.log('Firebase_appId: ' + process.env.Firebase_appId)
console.log('PIPPO_VAR: ' + process.env.PIPPO_VAR)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.Firebase_authDomain,
  projectId: process.env.Firebase_projectId,
  storageBucket: process.env.Firebase_storageBucket,
  messagingSenderId: process.env.Firebase_messagingSenderId,
  appId: process.env.Firebase_appId
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseA = firebase.auth
const firebaseDb = firebaseApp.database()
const firebaseUiAuth = firebaseui.auth

export { firebaseAuth, firebaseA, firebaseDb, firebaseUiAuth }
