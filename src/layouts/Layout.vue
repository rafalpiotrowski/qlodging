<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          QLodging
          <q-badge floating color="red">beta</q-badge>
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
          flat
        />

        <q-btn-dropdown
          v-else
          class="absolute-right"
          flat
        >
          <template v-slot:label>
          <div class="row items-center no-wrap">
            <q-avatar left size="3em" >
            <img :src="userPhotoUrl">
          </q-avatar>
          </div>
        </template>
           <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="show12HourTimeFormat" label="show12HourTimeFormat" />
          <q-toggle v-model="showTasksInOneList" label="showTasksInOneList" />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img :src="userPhotoUrl">
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{userFullName}}</div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
            @click="logoutUser"
          />
        </div>
      </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable
        >
          <q-item-section
            avatar
          >
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          class="text-grey-4 absolute-bottom"
          clickable
        >
          <q-item-section
            avatar
          >
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { firebaseAuth } from 'boot/firebase'

export default {
  name: 'Layout',
  userFullName: '',
  userPhotoUrl: '',
  data () {
    return {
      leftDrawerOpen: false,
      userFullName: '',
      userPhotoUrl: '',
      navs: [
        {
          label: 'Resources',
          icon: 'single_bed',
          to: '/resources'
        },
        {
          label: 'Scheduler',
          icon: 'far fa-calendar-alt',
          to: '/scheduler'
        },
        {
          label: 'Tasks',
          icon: 'list',
          to: '/todo'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
  created () {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.userFullName = user.displayName
        this.userPhotoUrl = user.photoURL
      }
    })
  },
  computed: {
    ...mapState('auth', ['loggedIn']),
    ...mapState('settings', ['show12HourTimeFormat', 'showTasksInOneList'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    quitApp () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really quit QLodger?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (this.$q.platform.is.electron) {
          require('electron').ipcRenderer.send('quit-app')
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }

  .platform-ios {
    .q-header {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
    .q-footer {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
</style>
