import './assets/style.css' // import tyle.css for styling every page (gobal)

import { createApp } from 'vue' // import vue
import App from './App.vue'
import { createVuetify } from 'vuetify' // import vuetify for raedy to use material design
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
