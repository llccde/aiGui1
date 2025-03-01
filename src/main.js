import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import BoolButton from './components/states_test/BoolButton.vue'
import IntSlider from './components/states_test/IntSlider.vue'
import EnumList from './components/states_test/EnumList.vue'

const app = createApp(App)
//createApp(App).mount('#app')
library.add(faUser, faHome)

app.component('BoolButton', BoolButton);
app.component('IntSlider', IntSlider);
app.component('EnumList', EnumList);
app.mount('#app')
