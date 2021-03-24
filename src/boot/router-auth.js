/* eslint-disable eqeqeq */
import { LocalStorage } from 'quasar'
// import { firebaseAuth } from 'boot/firebase'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem('loggedIn')
    console.log('going to: ' + to.path)
    if (!loggedIn) {
      console.log('user not loggedin')
      if (to.path == '/verifyEmail') {
        console.log('redirecting to email verification page')
        next()
      } else if (to.path !== '/auth/login') {
        console.log('redirecting to login page')
        next('/auth/login')
      } else {
        next()
      }
    } else {
      console.log('user loggedin')
      next()
    }
  })
}

// export default ({ app, router, store, Vue }) => {
//   router.beforeEach((to, from, next) => {
//     // const loggedIn = LocalStorage.getItem('loggedIn')
//     firebaseAuth.onAuthStateChanged(function (user) {
//       if (!user && to.path != '/login') {
//         next('/login')
//       }
//       if (user) {
//         if (!user.emailVerified && to.path != '/verifyEmail' && to.path != '/completeAccount') {
//           next('/verifyEmail')
//         } else if (to.path == '/login' || to.path == '/verifyEmail' || to.path == '/completeAccount') {
//           next('/')
//         }
//       }
//       next()
//     })
//   })
// }
