import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  notes: [],
  tasks: [],
  calendar: {
    year: 2020,
    month: 11,
    eventsRetrieved: false,
    events: {},
    filters: {
      "National holiday": true,
      "Orthodox": true,
      "Local holiday": true,
      "Observance": true,
      "Sporting event": true,
      "Worldwide observance": true,
      "United Nations observance": true,
      "Other": true
    },
  }
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
