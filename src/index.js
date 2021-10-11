const Vue = require('vue')
import main from './Main.vue'
import helpers from './helpers.js'

window.onload = function() {
    Vue.createApp(main).mount('#app')
}
