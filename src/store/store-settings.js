import { LocalStorage, date } from 'quasar'

const qCalDateFormat = 'YYYY-MM-DD'

const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false
  },
  calendarSettings: {
    dateRangeStart: '',
    dateRangeEnd: '',
    dateRangeDays: 1,
    qDateMask: 'YYYY-MM-DD'
  }
}

const mutations = {
  setShow12HourTimeFormat (state, value) {
    state.settings.show12HourTimeFormat = value
  },
  setShowTasksInOneList (state, value) {
    state.settings.showTasksInOneList = value
  },
  setSettings (state, settings) {
    Object.assign(state.settings, settings)
  },
  setCalendarDateRangeStart (state, value) {
    state.calendarSettings.dateRangeStart = value
    const startDate = date.extractDate(value, qCalDateFormat)
    const endDate = date.addToDate(startDate, { days: state.calendarSettings.dateRangeDays })
    state.calendarSettings.dateRangeEnd = date.formatDate(endDate, qCalDateFormat)
  },
  setCalendarDateRangeEnd (state, value) {
    state.calendarSettings.dateRangeEnd = value
    const endDate = date.extractDate(value, qCalDateFormat)
    const startDate = date.addToDate(endDate, { days: state.calendarSettings.dateRangeDays * -1 })
    state.calendarSettings.dateRangeStart = date.formatDate(startDate, qCalDateFormat)
  },
  setCalendarDateRangeDays (state, value) {
    state.calendarSettings.dateRangeDays = value
    const startDate = date.extractDate(state.calendarSettings.dateRangeStart, qCalDateFormat)
    const newEndDate = date.addToDate(startDate, { days: value })
    state.calendarSettings.dateRangeEnd = date.formatDate(newEndDate, qCalDateFormat)
  },
  setCalendarSettings (state, settings) {
    Object.assign(state.calendarSettings, settings)
  },
  updateCalendarSettings (state, payload) {
    state.calendarSettings.dateRangeStart = payload.dateRangeStart
    state.calendarSettings.dateRangeDays = payload.dateRangeDays
    const startDate = date.extractDate(state.calendarSettings.dateRangeStart, qCalDateFormat)
    const newEndDate = date.addToDate(startDate, { days: state.calendarSettings.dateRangeDays })
    state.calendarSettings.dateRangeEnd = date.formatDate(newEndDate, qCalDateFormat)
  }
}

const actions = {
  setShow12HourTimeFormat ({ commit, dispatch }, value) {
    commit('setShow12HourTimeFormat', value)
    dispatch('saveSettings')
  },
  setShowTasksInOneList ({ commit, dispatch }, value) {
    commit('setShowTasksInOneList', value)
    dispatch('saveSettings')
  },
  saveSettings ({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings ({ commit }) {
    const item = LocalStorage.getItem('settings')
    if (item) {
      commit('setSettings', item)
    }
  },
  setCalendarDateRangeStart ({ commit, dispatch }, value) {
    commit('setCalendarDateRangeStart', value)
    dispatch('saveCalendarSettings')
  },
  setCalendarDateRangeEnd ({ commit, dispatch }, value) {
    commit('setCalendarDateRangeEnd', value)
    dispatch('saveCalendarSettings')
  },
  setCalendarDateRangeDays ({ commit, dispatch }, value) {
    commit('setCalendarDateRangeDays', value)
    dispatch('saveCalendarSettings')
  },
  saveCalendarSettings ({ state }) {
    LocalStorage.set('calendarSettings', state.calendarSettings)
  },
  getCalendarSettings ({ commit }) {
    const item = LocalStorage.getItem('calendarSettings')
    if (item) {
      commit('setCalendarSettings', item)
    }
  },
  updateCalendarSettings ({ commit }, payload) {
    commit('updateCalendarSettings', payload)
  }
}

const getters = {
  settings: state => {
    return state.settings
  },
  calendarSettings: state => {
    return state.calendarSettings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
