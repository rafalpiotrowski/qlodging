<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted () {
    if (this.$q.platform.is.electron) {
      require('electron').ipcRenderer.on('show-settings', () => {
        this.$router.push('/settings')
      })
    }

    this.getSettings()
    this.handleAuthStateChange()

    console.log('env: ' + process.env.Firebase_apiKey)
    console.log('env: ' + process.env.Firebase_authDomain)
    console.log('env: ' + process.env.Firebase_projectId)
    console.log('env: ' + process.env.Firebase_storageBucket)
    console.log('env: ' + process.env.Firebase_messagingSenderId)
    console.log('env: ' + process.env.Firebase_appId)
  }
}
</script>
