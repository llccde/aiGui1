import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import BoolState from './components/boolState.vue';
import EnumState from './components/enumState.vue'
import IntState from './components/intState.vue'

const app = createApp(App)
//createApp(App).mount('#app')
library.add(faUser, faHome)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component("boolstate",BoolState);
app.component("enumstate",EnumState);
app.component("intstate",IntState);
app.mount('#app')
