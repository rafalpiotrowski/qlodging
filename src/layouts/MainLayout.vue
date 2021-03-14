<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-resize-observer @resize="onTitlebarResized"></q-resize-observer>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu"></q-icon>
        </q-btn>

        <q-icon name="far fa-calendar-alt" class="q-ml-md" size="1.5rem"></q-icon>

        <q-toolbar-title>
          Scheduler
        </q-toolbar-title>

        <q-btn flat dense label="Today" class="q-mx-md" @click="setToday"></q-btn>
        <q-btn flat dense round icon="keyboard_arrow_left" @click="onPrev"></q-btn>
        <q-btn flat dense round icon="keyboard_arrow_right" @click="onNext"></q-btn>
        <span class="q-mr-xl q-toolbar__title nowrap">{{ title }}</span>

        <q-space></q-space>

        <q-btn flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >

    </q-drawer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      aria-label="Menu"
      class="menu"
      :width="350"
    >
      <div>
        <q-toolbar class="bg-black text-white">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <q-toolbar-title>
            QLedger
            <q-badge floating color="red">ver. {{ version }}</q-badge>
          </q-toolbar-title>
        </q-toolbar>
      </div>
      <div class="row justify-around col-12">
        <q-date
          v-model="selectedDateForQDate"
          minimal
          class="fit"
          :first-day-of-week="firstDayMonday === true ? 1 : 0"
          :options="options"
        ></q-date>
      </div>

      <q-separator />

      <div class="col-12">
        <q-expansion-item
          expand-separator
          default-opened
          group="somegroup"
          icon="fas fa-cogs"
          label="Booking"
          caption="Booking properties"
        >
          <q-separator />
          <div>some component goes here</div>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          expand-separator
          group="somegroup"
          icon="fas fa-link"
          label="Essential Links"
        >
          <q-separator />
          <q-list>
            <q-item-label
              header
              class="text-grey-8"
            >
              Essential Links
            </q-item-label>
            <EssentialLink
              v-for="link in essentialLinks"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
        </q-expansion-item>
        <q-separator />
      </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import { padTime } from '../util/time'
import { getLocale } from '../util/getLocale'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      version: '0.1',
      leftDrawerOpen: this.$q.platform.is.desktop,
      titleFormatter: null,
      dateFormatter: null,
      essentialLinks: linksData
    }
  },
  beforeMount () {
    this.locale = getLocale()
    this.updateFormatters()
  },
  computed: {
    ...mapGetters({
      bordered: 'scheduler/bordered',
      fiveDayWorkWeek: 'scheduler/fiveDayWorkWeek',
      firstDayMonday: 'scheduler/firstDayMonday'
    }),
    contentClass () {
      if (this.$q.dark.isActive !== true) {
        return 'text-primary bg-white'
      }
      return ''
    },
    title () {
      if (this.titleFormatter && this.locale && this.selectedDate) {
        const date = new Date(this.selectedDate)
        return this.titleFormatter.format(date)
      }
      return ''
    },
    calendarView: {
      get () {
        return this.$store.state.scheduler.calendarView
      },
      set (view) {
        this.$store.commit('scheduler/calendarView', view)
      }
    },
    selectedDate: {
      get () {
        return this.$store.state.scheduler.selectedDate
      },
      set (date) {
        this.$store.commit('scheduler/selectedDate', date)
      }
    },
    selectedDateForQDate:
    {
      get () {
        if (this.$store.state.scheduler.selectedDate) {
          return this.$store.state.scheduler.selectedDate.replace(/-/g, '/')
        } else {
          return ''
        }
      },
      set (date) {
        this.$store.commit('scheduler/selectedDate', date.replace(/\//g, '-'))
        this.selectedView = 'day'
      }
    },
    locale:
    {
      get () {
        return this.$store.state.scheduler.locale
      },
      set (locale) {
        this.$store.commit('scheduler/locale', locale)
      }
    },
    titlebarHeight: {
      get () {
        return this.$store.state.common.titlebarHeight
      },
      set (height) {
        this.$store.commit('common/titlebarHeight', height)
      }
    },
    shortMonthLabel: {
      get () {
        return this.$store.state.scheduler.shortMonthLabel
      },
      set (b) {
        this.$store.commit('scheduler/shortMonthLabel', b)
      }
    }
  },
  watch: {
    locale () {
      if (this.locale.length > 2) {
        this.updateFormatters()
      }
    },
    shortMonthLabel () {
      this.updateFormatters()
    }
  },
  methods: {
    onPrev () {
      /* eslint-disable-next-line */
      this.$root.$emit('calendar:prev')
    },
    onNext () {
      /* eslint-disable-next-line */
      this.$root.$emit('calendar:next')
    },
    onTitlebarResized (size) {
      this.titlebarHeight = size.height
    },
    setToday () {
      /* eslint-disable-next-line */
      this.$root.$emit('calendar:today', this.formatDate())
    },
    formatDate (date) {
      const d = date !== undefined ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      return [year, padTime(month), padTime(day)].join('-')
    },
    updateFormatters () {
      try {
        this.dateFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC'
        })
        this.titleFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          month: this.shortMonthLabel ? 'short' : 'long',
          year: 'numeric',
          timeZone: 'UTC'
        })
      } catch (e) {
        // console.error('Intl.DateTimeFormat not supported')
        this.dateFormatter = undefined
        this.titleFormatter = undefined
      }
    },
    options (date) {
      if (this.fiveDayWorkWeek) {
        // figure out if date is a weekend,
        const parts = date.split('/')
        // acount for months starting at 0
        const time = new Date(parts[0], parts[1] - 1, parts[2])
        return !!(time.getDay() % 6)
      }
      return true
    }
  }
}
</script>

<style>
.q-date {
    box-shadow: none!important;
    border-radius: 0!important;
}
.q-date__view {
    padding: 0!important;
}
.q-date--portrait-minimal {
    width: auto!important;
}
</style>
