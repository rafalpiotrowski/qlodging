/* eslint-disable handle-callback-err */
<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<style>
    button.firebaseui-idp-button.mdl-button.mdl-js-button.mdl-button--raised.firebaseui-idp-phone.firebaseui-id-idp-button {
        background: rgb(78, 194, 76)!important;
    }
</style>
<script>
import { firebaseAuth, firebaseA, firebaseUiAuth } from 'boot/firebase'

export default {
  name: 'login',
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        // firebaseA.FacebookAuthProvider.PROVIDER_ID,
        firebaseA.EmailAuthProvider.PROVIDER_ID, // Other providers don't need to be given as object.
        firebaseA.GoogleAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseUiAuth.CredentialHelper.NONE
    }
    let ui = firebaseUiAuth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseUiAuth.AuthUI(firebaseAuth)
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>
