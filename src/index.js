const Vue = require('vue')
import main from './Main.vue'

window.onload = function() {
    Vue.createApp(main).mount('#app')
}
