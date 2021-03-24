import Vue from 'vue'
import Vuex from 'vuex'

import settings from './store-settings'
import auth from './store-auth'
import scheduler from './scheduler'
import common from './common'
import tasks from './store-tasks'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      settings,
      auth,
      scheduler,
      common,
      tasks
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
