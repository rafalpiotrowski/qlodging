<template>
  <div>
    <q-btn flat dense label="Today" class="q-mx-md" @click="setToday"></q-btn>
    <q-btn flat dense round icon="keyboard_arrow_left" @click="onPrev"></q-btn>
    <q-btn flat dense round icon="keyboard_arrow_right" @click="onNext"></q-btn>
    <span
      >Range: {{ selectedDate }} to {{ selectedDate2 }} (days: {{ nrOfDays }})</span
    >
    <div>
      <q-date
        v-model="selectedDate"
        :mask="calendarSettings.qDateMask"
      ></q-date>
      <q-date
        v-model="selectedDate2"
        :mask="calendarSettings.qDateMask"
      ></q-date>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { padTime } from 'src/util/time'
import { date } from 'quasar'

export default {
  computed: {
    ...mapGetters('settings', ['calendarSettings']),
    selectedDate: {
      get () {
        return this.calendarSettings.dateRangeStart
      },
      set (value) {
        this.setCalendarDateRangeStart(value)
      }
    },
    selectedDate2: {
      get () {
        return this.calendarSettings.dateRangeEnd
      },
      set (value) {
        this.setCalendarDateRangeEnd(value)
      }
    },
    nrOfDays: {
      get () {
        return this.calendarSettings.dateRangeDays
      },
      set (value) {
        this.setCalendarDateRangeDays(value)
      }
    }
  },
  methods: {
    ...mapActions('settings', [
      'setCalendarDateRangeStart',
      'setCalendarDateRangeEnd',
      'setCalendarDateRangeDays',
      'updateCalendarSettings'
    ]),
    onPrev () {
      this.$root.$emit('calendar:prev')
    },
    onNext () {
      this.$root.$emit('calendar:next')
    },
    setToday () {
      this.$root.$emit('calendar:today', this.formatDate())
    },
    formatDate (date) {
      const d = date !== undefined ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      return [year, padTime(month), padTime(day)].join('-')
    }
  },
  beforeMount () {
    const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
    this.updateCalendarSettings({ dateRangeStart: today, dateRangeDays: 7 })
  }
}
</script>
<style>

</style>
