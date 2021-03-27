<template>
    <div class="calendar-container" :style="containerStyle">
      <q-calendar
        ref="calendar"
        v-model="selectedDate"
        view="custom-scheduler"
        :max-days="maxDays"
        :resources="calendarResourcesFromApartments"
        resources-key="name"
        locale="en-US"
        :sticky="true"
        :bordered="true"
        :resourceHeight="60"
        :resourceWidth="100"
        :dayHeight="100"
        :no-scroll="false"
        :showMonthLabel="true"
        :cell-width="'cellWidth + px'"
      >
        <template #head-day="scope">
          <div class="full-height row justify-center items-center">
            {{ scope.timestamp.date }}
          </div>
        </template>
        <template #scheduler-resource="scope">
          <div class="full-height row justify-center items-center">
            {{ scope.resource.label }}
          </div>
        </template>
        <!-- <template #scheduler-resource-day="scope">
          <span>{{ scope }}</span>
        </template> -->
      </q-calendar>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PageIndex',

  data () {
    return {
      cellWidth: 100,
      resources: [
        {
          label: 'Room 1',
          events: [
            {
              bookingId: 1,
              checkInDate: '2021-03-29',
              checkOutDate: '2021-03-31',
              guestId: 'uid12345',
              guestName: 'Jan Kowalski',
              guestPhone: 'jan.kowalski@gg.com'
            },
            {
              bookingId: 3,
              checkInDate: '2021-04-05',
              checkOutDate: '2021-04-12',
              guestId: 'uid1234567',
              guestName: 'Jan Bambaryla',
              guestPhone: 'jan.b@gg.com'
            }
          ]
        },
        {
          label: 'Room 2',
          events: [
            {
              bookingId: 2,
              checkInDate: '2021-04-02',
              checkOutDate: '2021-04-09',
              guestId: 'uid123456',
              guestName: 'Jan Pizdzialski',
              guestPhone: 'jan.pizda@gg.com'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('settings', ['calendarSettings']),
    ...mapGetters('resources', ['apartments', 'calendarResourcesFromApartments']),
    ...mapState('resources', ['apartmentsDownloaded']),
    ...mapGetters('bookings', ['bookings']),
    ...mapState('bookings', ['bookingsDownloaded']),

    selectedDate: {
      get () {
        return this.calendarSettings.dateRangeStart
      }
    },
    maxDays: {
      get () {
        return this.calendarSettings.dateRangeDays
      }
    },
    containerStyle () {
      const styles = {}
      styles.height = `calc(100% - ${this.titlebarHeight}px)`
      styles.width = 'auto'
      return styles
    }
  }
}
</script>

<style lang="sass">
.calendar-container
  position: relative

  .q-calendar-daily__day-interval:hover
    background: rgba(0,0,255,.1)

  .q-calendar-weekly__workweek:hover
    background: rgba(0,0,255,.1)

  .q-calendar-weekly__day:hover
    background: rgba(0,0,255,.1)

  .q-calendar-weekly__head-weekday:hover
    background: rgba(0,0,255,.1)

  .q-calendar-scheduler__day:hover
    background: rgba(0,0,255,.1)

  .q-calendar-resource__resource-interval:hover
    background: rgba(0,0,255,.1)

  .q-calendar-daily__day:hover
    background: rgba(0,0,255,.1)

.my-event
  width: 100%
  position: absolute
  font-size: 12px

.full-width
  left: 0
  width: 100%

.left-side
  left: 0
  width: 49.75%

.right-side
  left: 50.25%
  width: 49.75%
</style>
