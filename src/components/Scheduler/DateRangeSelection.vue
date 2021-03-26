<template>
  <div>
    <div class="row items-center justify-start">
      <q-btn @click="setToday" label="Back to Today" color="primary" flat />
      <q-separator inset dark />
      Scheduler range:
      <q-select
        v-model="nrOfDays"
        :options="listOfRangeOptions"
        emit-value
        borderless
        map-options
        options-dense
      ></q-select>
    </div>

    <div class="row">
      <q-date
        v-model="selectedDate"
        no-unset
        minimal
        :mask="calendarSettings.qDateMask"
      >
      </q-date>
       <q-separator inset/>
      <q-date
        v-model="selectedDate2"
        no-unset
        minimal
        :mask="calendarSettings.qDateMask"
      >
      </q-date>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  data () {
    return {
      listOfRangeOptions: [
        { label: 'Week', value: 7 },
        { label: '2 Weeks', value: 14 },
        { label: 'Month', value: 30 },
        { label: '3 Months', value: 90 },
        { label: '6 Months', value: 180 },
        { label: 'Year', value: 360 }
      ]
    }
  },
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
    setToday () {
      // this.$root.$emit('calendar:today', this.formatDate())
      const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.selectedDate = today
    }
  },
  beforeMount () {
    const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
    this.updateCalendarSettings({ dateRangeStart: today, dateRangeDays: 14 })
  }
}
</script>
<style></style>
