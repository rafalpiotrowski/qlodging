/* eslint-disable no-empty-pattern */
/* eslint-disable no-tabs */
import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  bookings: {
    // UserId1: {
    //   bookingId1: {
    //     resourceId: 'ResourceId1',
    //     checkInDate: '2021-03-29',
    //     checkOutDate: '2021-03-31',
    //     guestId: 'uid12345',
    //     guestName: 'Jan Kowalski',
    //     guestPhone: 'jan.kowalski@gg.com'
    //   },
    //   bookingId3: {
    //     resourceId: 'ResourceId2',
    //     checkInDate: '2021-04-05',
    //     checkOutDate: '2021-04-12',
    //     guestId: 'uid1234567',
    //     guestName: 'Jan Bambaryla',
    //     guestPhone: 'jan.b@gg.com'
    //   }
    // },
    // UserId2: {
    //   bookingId2: {
    //     resourceId: 'ResourceId3',
    //     checkInDate: '2021-04-02',
    //     checkOutDate: '2021-04-09',
    //     guestId: 'uid123456',
    //     guestName: 'Jan Pizdzialski',
    //     guestPhone: 'jan.pizda@gg.com'
    //   }
    // }
  },
  bookingsDownloaded: false
}

const mutations = {
  updateBooking (state, payload) {
    Object.assign(state.bookings[payload.id], payload.updates)
  },
  deleteBooking (state, id) {
    Vue.delete(state.bookings, id)
  },
  addBooking (state, payload) {
    Vue.set(state.bookings, payload.id, payload.booking)
  },
  clearBookings (state) {
    state.bookings = {}
  },
  setBookingsDownloaded (state, value) {
    state.bookingsDownloaded = value
  }
}

const actions = {
  updateBooking ({ dispatch }, payload) {
    dispatch('fbUpdateBooking', payload)
  },
  deleteBooking ({ dispatch }, id) {
    dispatch('fbDeleteBooking', id)
  },
  addBooking ({ dispatch }, booking) {
    const bookingId = uid()
    const payload = {
      id: bookingId,
      booking: booking
    }
    dispatch('fbAddBooking', payload)
  },

  fbReadData ({ commit }) {
    const userId = firebaseAuth.currentUser.uid
    const userBookings = firebaseDb.ref('bookings/' + userId)

    // initial check for data
    userBookings.once('value', snapshot => {
      commit('setBookingsDownloaded', true)
    }, error => {
      if (error) {
        showErrorMessage(error.message)
        this.$router.replace('/auth')
      }
    })

    // child added
    userBookings.on('child_added', snapshot => {
      const booking = snapshot.val()
      const payload = {
        id: snapshot.key,
        booking: booking
      }
      commit('addBooking', payload)
    })

    // child changed
    userBookings.on('child_changed', snapshot => {
      const booking = snapshot.val()
      const payload = {
        id: snapshot.key,
        updates: booking
      }
      commit('updateBooking', payload)
    })

    // child removed
    userBookings.on('child_removed', snapshot => {
      const bookingId = snapshot.key
      commit('deleteBooking', bookingId)
    })
  },
  fbAddBooking ({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    const bookingRef = firebaseDb.ref('bookings/' + userId + '/' + payload.id)
    bookingRef.set(payload.booking, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Booking added!')
      }
    })
  },
  fbUpdateBooking ({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    const bookingRef = firebaseDb.ref('bookings/' + userId + '/' + payload.id)
    bookingRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        const keys = Object.keys(payload.updates)
        if (!(keys.includes('completed') && keys.length === 1)) {
          Notify.create('Booking updated!')
        }
      }
    })
  },
  fbDeleteBooking ({}, bookingId) {
    const userId = firebaseAuth.currentUser.uid
    const bookingRef = firebaseDb.ref('bookings/' + userId + '/' + bookingId)
    bookingRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Booking deleted!')
      }
    })
  }
}

const getters = {
  bookings: (state) => {
    return state.bookings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
