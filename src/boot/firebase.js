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
  apiKey: 'AIzaSyD_qslCefQwIlMtM1Lza-5cd6DgNA5W6I0',
  authDomain: 'qlodging-firebase.firebaseapp.com',
  projectId: 'qlodging-firebase',
  storageBucket: 'qlodging-firebase.appspot.com',
  messagingSenderId: '809020416513',
  appId: '1:809020416513:web:f79b951d5e19d85c8ad600'
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseA = firebase.auth
const firebaseDb = firebaseApp.database()
const firebaseUiAuth = firebaseui.auth

export { firebaseAuth, firebaseA, firebaseDb, firebaseUiAuth }
