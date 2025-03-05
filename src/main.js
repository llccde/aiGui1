import './assets/main.css'

import { createApp, inject, provide } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import smart_container from './components/layoutComponent/smart_container.vue'
import head_side_body_foot from "./components/layoutComponent/head_side_body_foot.vue"
const app = createApp(App)
//createApp(App).mount('#app')
library.add(faUser, faHome)

// app.component('BoolButton', BoolButton);
// app.component('IntSlider', IntSlider);
// app.component('EnumList', EnumList);
app.component("smart_container",smart_container);
app.component("head_side_body_foot",head_side_body_foot);
app.mount('#app')