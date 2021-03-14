<template>
  <q-page class="column" style="overflow: hidden">
    <!-- the calendar -->
    <div
      class="calendar-container"
      :style="containerStyle"
    >
      <q-calendar
        ref="calendar"
        class="calendar"
        style="height: calc(100vh - 50px)"
        :key="keyValue"
        v-touch-swipe.mouse.left.right="handleSwipe"
        v-model="selectedDate"
        :locale="locale"
        :max-days="maxDays"
        :bordered="bordered"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
        :drag-over-func="onDragOver"
        :drop-func="onDrop"
        :view="calendarView"
        :weekdays="weekdays"
        :interval-minutes="60 * intervalRangeStep"
        :interval-start="intervalStart"
        :interval-count="intervalCount"
        :hour24-format="hour24Format"
        :short-month-label="shortMonthLabel"
        :show-day-of-year-label="showDayOfYearLabel"
        :hide-header="hideHeader"
        :no-scroll="noScroll"
        :short-weekday-label="shortWeekdayLabel"
        :short-interval-label="shortIntervalLabel"
        :interval-height="intervalHeight"
        :resource-height="resourceHeight"
        :resource-width="resourceWidth"
        :day-height="dayHeight"
        :show-month-label="showMonthLabel"
        :show-work-weeks="showWorkWeeks"
        :no-default-header-btn="noDefaultHeaderBtn"
        :no-default-header-text="noDefaultHeaderText"
        :resources="resources"
        @change="onChanged"
        @moved="onMoved"
        @click:date2="onDateChanged"
        @click:interval2="addEventMenu"
        @click:time2="addEventMenu"
        @click:day2="addEventMenu"
        @click:week2="addEventMenu"
        @click:resource2="resourceClicked"
        @click:resource:day2="resourceDayClicked"
      >

        <template #intervals-header="days">
          <div class="fit flex justify-center items-end">
            <span class="q-calendar-daily__interval-text">{{ showOffset(days) }}</span>
          </div>
        </template>

      </q-calendar>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'
import { isCssColor } from '../util/color'
import events from '../util/events'
import { padTime } from '../util/time'
import { date, colors, Platform } from 'quasar'
import { stop, prevent, stopAndPrevent } from 'quasar/src/utils/event'
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar'

import 'drag-drop-touch'

const formDefault = {
  title: '',
  details: '',
  allDay: false,
  dateTimeStart: '',
  dateTimeEnd: '',
  icon: '',
  bgcolor: '#0000FF'
}

// function leftClick (e) {
//   return e.button === 0
// }

export default {
  name: 'PageIndex',

  data () {
    return {
      keyValue: 0,
      direction: 'next',
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      disabledDays: [
        '2019-04-02',
        '2019-04-03',
        '2019-04-04',
        '2019-04-05'
      ],
      addEvent: false,
      contextDay: null,
      eventForm: { ...formDefault },
      displayEvent: false,
      event: null,
      events: [],
      gmt: '',
      dragging: false,
      draggedEvent: null,
      ignoreNextSwipe: false,
      showDateScrollerAllDay: false,
      showDateTimeScrollerStart: false,
      showDateTimeScrollerEnd: false,
      resources: [
        {
          label: 'John'
        },
        {
          label: 'Mary'
        },
        {
          label: 'Susan'
        },
        {
          label: 'Olivia'
        },
        {
          label: 'Board Room'
        },
        {
          label: 'Room-1'
        },
        {
          label: 'Room-2'
        }
      ],
      agenda: {
        // value represents day of the week
        1: [
          {
            time: '08:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            desc: 'Meeting with CEO'
          },
          {
            time: '08:30',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
            desc: 'Meeting with HR'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
            desc: 'Meeting with Karen'
          }
        ],
        2: [
          {
            time: '11:30',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
            desc: 'Meeting with Alisha'
          },
          {
            time: '17:00',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
            desc: 'Meeting with Sarah'
          }
        ],
        3: [
          {
            time: '08:00',
            desc: 'Stand-up SCRUM',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '10:00',
            desc: 'Sprint planning',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
          }
        ],
        4: [
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          }
        ],
        5: [
          {
            time: '08:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '09:30',
            avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
          },
          {
            time: '11:30',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
          },
          {
            time: '13:30',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
          },
          {
            time: '14:00',
            avatar: 'https://cdn.quasar.dev/img/linux-avatar.png'
          },
          {
            time: '14:30',
            avatar: 'https://cdn.quasar.dev/img/avatar.png'
          },
          {
            time: '15:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '15:30',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '16:00',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
          }
        ]
      },
      // Icon picker
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    }
  },
  mounted () {
    this.$root.$on('calendar:next', this.calendarNext)
    this.$root.$on('calendar:prev', this.calendarPrev)
    this.$root.$on('calendar:today', this.calendarToday)
    this.events = events
    this.updateFormatters()
  },
  beforeDestroy () {
    this.$root.$off('calendar:next', this.calendarNext)
    this.$root.$off('calendar:prev', this.calendarPrev)
    this.$root.$off('calendar:today', this.calendarToday)
  },
  computed: {
    ...mapGetters({
      locale: 'scheduler/locale',
      titlebarHeight: 'common/titlebarHeight',
      maxDays: 'scheduler/maxDays',
      bordered: 'scheduler/bordered',
      fiveDayWorkWeek: 'scheduler/fiveDayWorkWeek',
      firstDayMonday: 'scheduler/firstDayMonday',
      shortMonthLabel: 'scheduler/shortMonthLabel',
      showDayOfYearLabel: 'scheduler/showDayOfYearLabel',
      shortWeekdayLabel: 'scheduler/shortWeekdayLabel',
      shortIntervalLabel: 'scheduler/shortIntervalLabel',
      hour24Format: 'scheduler/hour24Format',
      hideHeader: 'scheduler/hideHeader',
      noScroll: 'scheduler/noScroll',
      showMonthLabel: 'scheduler/showMonthLabel',
      showWorkWeeks: 'scheduler/showWorkWeeks',
      noDefaultHeaderBtn: 'scheduler/noDefaultHeaderBtn',
      noDefaultHeaderText: 'scheduler/noDefaultHeaderText',
      intervalRange: 'scheduler/intervalRange',
      intervalRangeStep: 'scheduler/intervalRangeStep',
      intervalHeight: 'scheduler/intervalHeight',
      resourceHeight: 'scheduler/resourceHeight',
      resourceWidth: 'scheduler/resourceWidth',
      dayHeight: 'scheduler/dayHeight'
    }),
    intervalStart () {
      return this.intervalRange.min * (1 / this.intervalRangeStep)
    },
    intervalCount () {
      return (this.intervalRange.max - this.intervalRange.min) * (1 / this.intervalRangeStep)
    },
    selectedDate: {
      get () {
        return this.$store.state.scheduler.selectedDate
      },
      set (date) {
        this.$store.commit('scheduler/selectedDate', date)
      }
    },
    calendarView: {
      get () {
        return this.$store.state.scheduler.calendarView
      },
      set (view) {
        this.$store.commit('scheduler/calendarView', view)
      }
    },
    containerStyle () {
      const styles = {}
      if (this.calendarView === 'month' || this.calendarView.endsWith('resource')) {
        styles.height = 'auto'
      } else {
        styles.height = `calc(100% - ${this.titlebarHeight}px)`
      }
      styles.width = 'auto'
      return styles
    },
    // convert the events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach((event) => (map[event.date] = map[event.date] || []).push(event))
      return map
    },
    addOrUpdateEvent () {
      if (this.contextDay && this.contextDay.bgcolor) {
        return 'Update'
      }
      return 'Add'
    },
    scrollerPopupStyle160 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '160px'
        }
      }
    },
    scrollerPopupStyle280 () {
      if (this.$q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '280px'
        }
      }
    }
  },
  watch: {
    // selectedDate (val) {
    //   console.log('selectedDate: ', val)
    // },
    fiveDayWorkWeek () {
      if (this.fiveDayWorkWeek) {
        this.weekdays = [1, 2, 3, 4, 5]
        this.view = '5day'
      } else {
        if (this.view === '5day') {
          this.view = 'month'
        }
        if (this.firstDayMonday) {
          this.weekdays = [1, 2, 3, 4, 5, 6, 0]
        } else {
          this.weekdays = [0, 1, 2, 3, 4, 5, 6]
        }
      }
    },
    firstDayMonday () {
      if (this.fiveDayWorkWeek) {
        this.weekdays = [1, 2, 3, 4, 5]
        this.view = '5day'
      } else {
        if (this.view === '5day') {
          this.view = 'month'
        }
        if (this.firstDayMonday) {
          this.weekdays = [1, 2, 3, 4, 5, 6, 0]
        } else {
          this.weekdays = [0, 1, 2, 3, 4, 5, 6]
        }
      }
    },
    locale () {
      this.updateFormatters()
    }
  },
  methods: {
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    calendarToday (today) {
      this.selectedDate = today
    },
    onChanged (data) {
      // uncomment to see data in console
      // let { start, end } = data
      // console.log('onChanged:', start, end)
    },
    onMoved (moved) {
      // uncomment to see data in console
      // console.log('onMoved:', moved)
    },
    getEvents (dt) {
      const currentDate = QCalendar.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        const event = this.events[i]
        if (event.date === dt) {
          if (event.time !== undefined) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendar.parseTimestamp(event.date + ' ' + event.time)
              const endTime = QCalendar.addToDate(startTime, { minute: event.duration })
              for (let j = 0; j < events.length; ++j) {
                const evt = events[j]
                if (evt.time !== undefined) {
                  const startTime2 = QCalendar.parseTimestamp(evt.date + ' ' + evt.time)
                  const endTime2 = QCalendar.addToDate(startTime2, { minute: evt.duration })
                  if (QCalendar.isBetweenDates(startTime, startTime2, endTime2) || QCalendar.isBetweenDates(endTime, startTime2, endTime2)) {
                    evt.side = 'left'
                    event.side = 'right'
                    events.push(event)
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            event.side = undefined
            events.push(event)
          }
        } else if (event.days) {
          // check for overlapping dates
          const startDate = QCalendar.parseTimestamp(event.date)
          const endDate = QCalendar.addToDate(startDate, { day: event.days })
          if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(event)
            added = true
          }
        }
      }
      return events
    },
    checkDateTimeStart (/* val */) {
      this.$refs.dateTimeEnd.resetValidation()
      if (this.eventForm.dateTimeStart && this.eventForm.dateTimeEnd) {
        const timestampStart = QCalendar.parseTimestamp(this.eventForm.dateTimeStart)
        const timestampEnd = QCalendar.parseTimestamp(this.eventForm.dateTimeEnd)
        const dayStart = QCalendar.getDayIdentifier(timestampStart)
        const dayEnd = QCalendar.getDayIdentifier(timestampEnd)
        if (dayStart < dayEnd) {
          return true
        } else if (dayStart > dayEnd) {
          return false
        } else {
          const timeStart = QCalendar.getTimeIdentifier(timestampStart)
          const timeEnd = QCalendar.getTimeIdentifier(timestampEnd)
          if (timeStart <= timeEnd) {
            return true
          } else {
            return false
          }
        }
      }
      return false
    },

    checkDateTimeEnd (val) {
      this.$refs.dateTimeStart.resetValidation()
      if (this.eventForm.dateTimeStart && this.eventForm.dateTimeEnd) {
        const timestampEnd = QCalendar.parseTimestamp(this.eventForm.dateTimeEnd)
        const timestampStart = QCalendar.parseTimestamp(this.eventForm.dateTimeStart)
        const dayEnd = QCalendar.getDayIdentifier(timestampEnd)
        const dayStart = QCalendar.getDayIdentifier(timestampStart)
        if (dayEnd > dayStart) {
          return true
        } else if (dayEnd < dayStart) {
          return false
        } else {
          const timeEnd = QCalendar.getTimeIdentifier(timestampEnd)
          const timeStart = QCalendar.getTimeIdentifier(timestampStart)
          if (timeEnd >= timeStart) {
            return true
          } else {
            return false
          }
        }
      }
      return false
    },

    resetForm () {
      this.$set(this, 'eventForm', { ...formDefault })
    },
    showEvent (event) {
      if (this.calendarView.indexOf('agenda') < 0) {
        this.event = event
        this.displayEvent = true
      }
    },
    getEndTime (event) {
      let endTime = QCalendar.parseTimestamp(event.date + ' ' + event.time)
      endTime = QCalendar.addToDate(endTime, { minute: event.duration })
      endTime = QCalendar.getTime(endTime)
      return endTime
    },
    getEventDate (event) {
      const parts = event.date.split('-')
      const date = new Date(parts[0], parts[1] - 1, parts[2])
      return this.dateFormatter.format(date)
    },
    badgeClasses (event, type) {
      const cssColor = isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = colors.luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        // don't clamp position to 0px
        s.top = timeStartPos(event.time, false) + 'px'
        s.position = 'absolute'
        if (event.side !== undefined) {
          s.width = '50%'
          if (event.side === 'right') {
            s.left = '50%'
          }
        } else {
          s.width = '100%'
        }
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    displayClasses (event) {
      return {
        [`bg-${event.bgcolor}`]: !isCssColor(event.bgcolor),
        'text-white': !isCssColor(event.bgcolor)
      }
    },
    displayStyles (event) {
      const s = {}
      if (isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = colors.luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      return s
    },
    onDateChanged ({ scope, event }) {
      if (this.calendarView.indexOf('scheduler') > -1) {
        this.calendarView = 'day-scheduler'
        return
      } else if (this.calendarView.indexOf('agenda') > -1) {
        this.calendarView = 'day-agenda'
        return
      }

      // automatically change to the day selected
      this.calendarView = 'day'
    },
    resourceClicked ({ scope, event }) {
      // console.log('resource clicked:', scope)
    },
    resourceDayClicked ({ scope, event }) {
      // console.log('resource:day clicked:', scope)
    },
    addEventMenu ({ scope, event }) {
      if (scope.timestamp.disabled === true || this.calendarView.indexOf('scheduler') > -1 || this.calendarView.indexOf('agenda') > -1) {
        return
      }
      this.resetForm()
      this.contextDay = { ...scope.timestamp }
      let timestamp
      if (this.contextDay.hasTime === true) {
        timestamp = this.adjustTimestamp(this.contextDay)
        const endTime = QCalendar.addToDate(timestamp, { hour: 1 })
        this.eventForm.dateTimeEnd = QCalendar.getDateTime(endTime)
      } else {
        timestamp = QCalendar.parseTimestamp(this.contextDay.date + ' 00:00')
      }
      this.eventForm.dateTimeStart = QCalendar.getDateTime(timestamp)
      this.eventForm.allDay = this.contextDay.hasTime === false
      this.eventForm.bgcolor = '#0000FF' // starting color
      this.addEvent = true // show dialog
    },
    editEvent (event) {
      this.resetForm()
      this.contextDay = { ...event }
      let timestamp
      if (event.time) {
        timestamp = QCalendar.parseTimestamp(event.date + ' ' + event.time)
        const endTime = QCalendar.addToDate(timestamp, { minute: event.duration })
        this.eventForm.dateTimeEnd = QCalendar.getDateTime(endTime)
      } else {
        timestamp = QCalendar.parseTimestamp(this.contextDay.date + ' 00:00')
      }
      this.eventForm.dateTimeStart = QCalendar.getDateTime(timestamp)
      this.eventForm.allDay = !event.time
      this.eventForm.bgcolor = event.bgcolor
      this.eventForm.icon = event.icon
      this.eventForm.title = event.title
      this.eventForm.details = event.details
      this.addEvent = true // show dialog
    },
    deleteEvent (event) {
      const index = this.findEventIndex(event)
      if (index >= 0) {
        this.events.splice(index, 1)
      }
    },
    findEventIndex (event) {
      for (let i = 0; i < this.events.length; ++i) {
        if (event.title === this.events[i].title &&
          event.details === this.events[i].details &&
          event.date === this.events[i].date) {
          return i
        }
      }
    },
    getDuration (dateTimeStart, dateTimeEnd, unit) {
      const start = QCalendar.makeDateTime(QCalendar.parseTimestamp(dateTimeStart))
      const end = QCalendar.makeDateTime(QCalendar.parseTimestamp(dateTimeEnd))
      const diff = date.getDateDiff(end, start, unit)
      return diff
    },
    convertDurationTime (n) {
      const num = n
      const days = Math.floor(((num / 60) / 24))
      const hours = (num / 60)
      const rhours = Math.floor(hours)
      const rshours = Math.floor(hours - (days * 24))
      const minutes = (hours - rhours) * 60
      const rminutes = Math.round(minutes)
      return (days > 0 ? days + ' days and ' : '') + (rshours > 0 ? rshours + ' hour(s) and ' : '') + rminutes + ' minute(s).'
    },

    onSubmit () {
      this.saveEvent()
    },

    onReset () {

    },

    saveEvent () {
      const self = this
      this.$refs.event.validate().then((success) => {
        if (success) {
          // close the dialog
          self.addEvent = false
          const form = { ...self.eventForm }
          let update = false
          if (self.contextDay.bgcolor) {
            // an update
            update = true
          } else {
            // an add
          }
          const data = {
            title: form.title,
            details: form.details,
            icon: form.icon,
            bgcolor: form.bgcolor,
            date: String(form.dateTimeStart).slice(0, 10).replace(/\//g, '-')
          }
          if (form.allDay === false) {
            // get time into separate var
            data.time = String(form.dateTimeStart).slice(11, 16)
            data.duration = self.getDuration(form.dateTimeStart, form.dateTimeEnd, 'minutes')
          }
          if (update === true) {
            const index = self.findEventIndex(self.contextDay)
            if (index >= 0) {
              self.events.splice(index, 1, { ...data })
            }
          } else {
            // add to events array
            self.events.push(data)
          }

          self.contextDay = null
        }
      })
    },
    showOffset (days) {
      if (days.length === 0) return
      const val = padTime(new Date(this.getTimestampString(days[0])).getTimezoneOffset() / 60)
      if (isNaN(val)) return ''
      return 'GMT-' + val
    },
    adjustTimestamp (day) {
      day.minute = day.minute < 15 || day.minute >= 45 ? 0 : 30
      day.time = QCalendar.getTime(day)
      return day
    },
    getTimestampString (day) {
      return QCalendar.getDate(day) + ' ' + QCalendar.getTime(day)
    },
    updateFormatters () {
      try {
        this.dateFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          weekday: this.shortWeekdayLabel ? 'short' : 'long',
          month: this.shortMonthLabel ? 'short' : 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC'
        })
      } catch (e) {
        // console.error('Intl.DateTimeFormat not supported')
        this.dateFormatter = undefined
      }
    },
    handleSwipe ({ evt, ...info }) {
      if (this.dragging === false) {
        if (info.duration >= 30 && this.ignoreNextSwipe === false) {
          if (info.direction === 'right') {
            this.calendarPrev()
          } else if (info.direction === 'left') {
            this.calendarNext()
          }
        } else {
          this.ignoreNextSwipe = false
        }
      }
      stopAndPrevent(evt)
    },
    onDragEnter (ev, event) {
      prevent(ev)
    },
    onDragStart (ev, event) {
      this.dragging = true
      this.draggedEvent = event
      stop(ev)
    },
    onDragEnd (ev, event) {
      stopAndPrevent(ev)
      this.resetDrag()
    },
    onDragOver (ev, day, type) {
      if (type === 'day') {
        stopAndPrevent(ev)
        return this.draggedEvent.date !== day.date
      } else if (type === 'interval') {
        stopAndPrevent(ev)
        return this.draggedEvent.date !== day.date && this.draggedEvent.time !== day.time
      }
    },
    onDrop (ev, day, type) {
      ev.preventDefault()
      ev.stopPropagation()
      if (type === 'day') {
        this.draggedEvent.date = day.date
        this.draggedEvent.side = undefined
      } else if (type === 'interval') {
        this.draggedEvent.date = day.date
        this.draggedEvent.time = day.time
        this.draggedEvent.side = undefined
      }
    },
    resetDrag () {
      this.draggedEvent = undefined
      this.dragging = false
      if (Platform.is.desktop) {
        this.ignoreNextSwipe = true
      }
    },
    getAgenda (timestamp) {
      return this.agenda[parseInt(timestamp.weekday, 10)]
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
