/* eslint-disable no-empty-pattern */
/* eslint-disable handle-callback-err */
import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false,
  verificationEmailSent: false
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  setVerificationEmailSent (state, value) {
    state.verificationEmailSent = value
  }
}

const actions = {
  registerUser ({}, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  loginUser ({}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  logoutUser () {
    console.log('logoutUser')
    firebaseAuth.signOut()
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user && user.emailVerified) {
        console.log('user verified')
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
        dispatch('tasks/fbReadData', null, { root: true })
      } else if ((user) && !user.emailVerified) {
        console.log('user email not verified')
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        const isEmailSent = LocalStorage.getItem('verificationEmailSent')
        if (!isEmailSent) {
          user.sendEmailVerification().then(function () {
            // Email sent.
            commit('setVerificationEmailSent', true)
            LocalStorage.set('verificationEmailSent', true)
            console.log('user email not verified! sending email...')
          }).catch(function (error) {
            // An error happened.
            console.log('user email not verified! sending email...failed')
          })
        }
        this.$router.push('/verifyEmail').catch(err => {})
      } else {
        console.log('user not set')
        // commit('tasks/clearTasks', null, { root: true })
        // commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        commit('setVerificationEmailSent', false)
        LocalStorage.set('verificationEmailSent', false)
        this.$router.replace('/login').catch(err => {})
      }
    })
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
