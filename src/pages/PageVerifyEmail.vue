/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
<template lang="html">
    <div id="verificationMail">
        <h3>You have sucessfully registered to QLodging</h3>
        <p>Hello <strong>{{name}}</strong>, your email need to be verified!</p>
        <p>Email has been send to the following email address: <strong>{{email}}</strong> titled <strong>{{subjet}}</strong></p>
        <p>This email contains link that need to be pressed or pasted into browser.</p>
        <p><button @click='resend'>If you did not receive email, press this button to resend it!</button></p>
    </div>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'

export default {
  name: 'verificationMail',
  data () {
    return {
      name: '',
      email: '',
      subjet: 'Validación de cuenta'
    }
  },

  created () {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName
        this.email = user.email
      }
    })
  },
  methods: {
    resend () {
      firebaseAuth.onAuthStateChanged(function (user) {
        if ((user) && !user.emailVerified) {
          // eslint-disable-next-line no-unused-vars
          var actionCodeSettings = {
            url: 'http://..../',
            handleCodeInApp: true

          }
          user.sendEmailVerification().then(function () {
            // Email sent.
          // eslint-disable-next-line handle-callback-err
          }).catch(function (error) {
            // An error happened.
          })
        }
      })
    }
  }
}
</script>
