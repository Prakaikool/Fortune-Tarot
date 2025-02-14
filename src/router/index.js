import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardsView from '../views/CardsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/cards', name: 'cards', component: CardsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
