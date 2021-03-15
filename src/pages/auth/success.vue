<template>
  <div>
      <h3>Alta de Usuario. ¡Bienvenido {{name}}!.</h3>
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
