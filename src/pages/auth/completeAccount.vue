<template>
    <div id="finishVerification">
        <h3>¡Felicitaciones!.{{name}} </h3>
        <p><button @click='logOut'>Log out</button></p>
        <p>FOTO:<img :src='photo' style='height: 120px'> </p>
        <p>Nombre: {{name}}</p>
        <p>Email: {{email}}</p>
        <p>ID: {{userId}}</p>
    </div>
</template>
<script>
import { firebaseAuth } from 'boot/firebase'

export default {
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: ''
    }
  },
  created () {
    var actionCode = this.$route.query.oobCode.toString()
    console.log(actionCode)
    firebaseAuth.applyActionCode(actionCode).then(function (resp) {
      alert('reload')
      firebaseAuth.currentUser.reload()
      console.log(firebaseAuth.currentUser.emailVerified)
    }).catch(function (error) {
      alert('error')
      console.log(error)
    })
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName
        this.email = user.email
        this.photo = user.photoURL
        this.userId = user.uid
      }
    })
  },
  methods: {
    logOut () {
      firebaseAuth.signOut()
      this.$router.push('/login')
    }
  }
}
</script>
