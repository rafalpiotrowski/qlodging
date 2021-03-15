import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://qlodging.netlify.app'
})

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
