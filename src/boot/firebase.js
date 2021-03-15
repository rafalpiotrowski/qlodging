// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/database'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.Firebase_apiKey,
  authDomain: process.env.Firebase_authDomain,
  projectId: process.env.Firebase_projectId,
  storageBucket: process.env.Firebase_storageBucket,
  messagingSenderId: process.env.Firebase_messagingSenderId,
  appId: process.env.Firebase_appId
}

// Initialize Firebase

console.log('env: ' + process.env.Firebase_apiKey)
console.log('env: ' + process.env.Firebase_authDomain)
console.log('env: ' + process.env.Firebase_projectId)
console.log('env: ' + process.env.Firebase_storageBucket)
console.log('env: ' + process.env.Firebase_messagingSenderId)
console.log('env: ' + process.env.Firebase_appId)

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseA = firebase.auth
const firebaseDb = firebaseApp.database()
const firebaseUiAuth = firebaseui.auth

export { firebaseAuth, firebaseA, firebaseDb, firebaseUiAuth }
