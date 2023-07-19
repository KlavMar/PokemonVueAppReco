import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from "../views/PokemonView.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonList
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
