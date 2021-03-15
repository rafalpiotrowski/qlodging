/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
<template lang="html">
    <div id="verificationMail">
        <h3>Validacion de Cuenta</h3>
        <p>Hola <strong>{{name}}</strong>, necesitamos que valides tu cuenta</p>
        <p>Te hemos enviado un correo a la casilla <strong>{{email}}</strong> con el asunto <strong>{{subjet}}</strong></p>
        <p>Este mail contiene el link que te permitirá acceder al sistema.</p>
        <p><button @click='resend'>Reenviar Mail</button></p>
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
