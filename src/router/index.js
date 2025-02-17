import { createRouter, createWebHistory } from 'vue-router'
import FortuneTarot from '../views/FortuneTarot.vue'
import TarotCards from '../views/TarotCards.vue'

const routes = [
  { path: '/', name: 'fortunecards', component: FortuneTarot },
  { path: '/cards', name: 'cards', component: TarotCards },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
