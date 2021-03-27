/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-tabs */
import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  apartments: {
    // User1: {
    ApartmentId1: {
      name: 'Sudio',
      type: 'apartment',
      maxNrOfAdults: '2',
      maxNrOfKids: '2'
    },
    ApartmentId2: {
      name: 'Smerek',
      type: 'apartament',
      maxNrOfAdults: '4',
      maxNrOfKids: '2'
    },
    ApartmentId3: {
      name: 'Ptaki1',
      type: 'apartament',
      maxNrOfAdults: '6',
      maxNrOfKids: '4'
    },
    ApartmentId4: {
      name: 'Ptaki2',
      type: 'apartament',
      maxNrOfAdults: '6',
      maxNrOfKids: '4'
    },
    ApartmentId5: {
      name: 'Ptaki3',
      type: 'apartament',
      maxNrOfAdults: '6',
      maxNrOfKids: '4'
    },
    ApartmentId6: {
      name: 'Ptaki4',
      type: 'apartament',
      maxNrOfAdults: '6',
      maxNrOfKids: '4'
    },
    ApartmentId7: {
      name: 'Ptaki5',
      type: 'apartament',
      maxNrOfAdults: '6',
      maxNrOfKids: '4'
    },
    ApartmentId8: {
      name: 'Ptaki6',
      type: 'apartament',
      maxNrOfAdults: '6',
      maxNrOfKids: '4'
    }
    // },
    // User2: {
    //   ApartmentId3: {
    //     name: 'Apartment 1',
    //     type: 'apartment',
    //     maxNrOfAdults: '2',
    //     maxNrOfKids: '2'
    //   },
    //   ApartmentId4: {
    //     name: 'Apartment 2',
    //    	type: 'apartament',
    //     maxNrOfAdults: '6',
    //     maxNrOfKids: '4'
    //   }
    // }
  },
  apartmentsDownloaded: true
}

const mutations = {
  updateApartment (state, payload) {
    Object.assign(state.apartments[payload.id], payload.updates)
  },
  deleteApartment (state, id) {
    Vue.delete(state.apartments, id)
  },
  addApartment (state, payload) {
    Vue.set(state.apartments, payload.id, payload.apartment)
  },
  clearApartments (state) {
    state.apartments = {}
  },
  setApartmentsDownloaded (state, value) {
    state.apartmentsDownloaded = value
  }
}

const actions = {
  updateApartment ({ dispatch }, payload) {
    dispatch('fbUpdateApartment', payload)
  },
  deleteApartment ({ dispatch }, id) {
    dispatch('fbDeleteApartment', id)
  },
  addApartment ({ dispatch }, apartment) {
    const apartmentId = uid()
    const payload = {
      id: apartmentId,
      apartment: apartment
    }
    dispatch('fbAddApartment', payload)
  },

  fbReadData ({ commit }) {
    const userId = firebaseAuth.currentUser.uid
    const userApartments = firebaseDb.ref('apartments/' + userId)

    // initial check for data
    userApartments.once('value', snapshot => {
      commit('setApartmentsDownloaded', true)
    }, error => {
      if (error) {
        showErrorMessage(error.message)
        this.$router.replace('/auth')
      }
    })

    // child added
    userApartments.on('child_added', snapshot => {
      const apartment = snapshot.val()
      const payload = {
        id: snapshot.key,
        apartment: apartment
      }
      commit('addApartment', payload)
    })

    // child changed
    userApartments.on('child_changed', snapshot => {
      const apartment = snapshot.val()
      const payload = {
        id: snapshot.key,
        updates: apartment
      }
      commit('updateApartment', payload)
    })

    // child removed
    userApartments.on('child_removed', snapshot => {
      const apartmentId = snapshot.key
      commit('deleteApartment', apartmentId)
    })
  },
  fbAddApartment ({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    const apartmentRef = firebaseDb.ref('apartments/' + userId + '/' + payload.id)
    apartmentRef.set(payload.apartment, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Apartment added!')
      }
    })
  },
  fbUpdateApartment ({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    const apartmentRef = firebaseDb.ref('apartments/' + userId + '/' + payload.id)
    apartmentRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        const keys = Object.keys(payload.updates)
        if (!(keys.includes('completed') && keys.length === 1)) {
          Notify.create('Apartment updated!')
        }
      }
    })
  },
  fbDeleteApartment ({}, apartmentId) {
    const userId = firebaseAuth.currentUser.uid
    const apartmentRef = firebaseDb.ref('apartments/' + userId + '/' + apartmentId)
    apartmentRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Apartment deleted!')
      }
    })
  }
}

const getters = {
  apartments: (state) => {
    return state.apartments
  },
  calendarResourcesFromApartments: (state) => {
    const res = []
    const keys = Object.keys(state.apartments)
    keys.forEach((key) => {
      res.push({ label: key, resource: state.apartments[key] })
    })
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
