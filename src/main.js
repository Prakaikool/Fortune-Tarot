import './assets/style.css' // import tyle.css for styling every page (gobal)

import '@mdi/font/css/materialdesignicons.css' // Material Design Icons

import { createApp } from 'vue' // import vue
import App from './App.vue'

// vuetify setup
import { createVuetify } from 'vuetify' // import vuetify for raedy to use material design
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

//vue Router
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
