import { Platform } from 'quasar'

export const autofocus = {
  bind(el, binding) {
    console.log('binding: ', binding)
    let input = el.querySelector('.q-field__native')
    let delay = 0
    if (Platform.is.cordova) {
      delay = 700
      if (binding.value) {
        delay = binding.value.delayCordova
      }
    }
    setTimeout(() => {
      input.focus()
    }, delay);
  }
}