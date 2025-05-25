import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/ListJobs.vue'
import HomeView from '@/views/HomeView.vue'
import LisCompanies from '@/views/LisCompanies.vue'
import ListFreelancers from '@/views/ListFreelancers.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list-jobs',
      name: 'jobs',
      component: AboutView,
    },
    {
      path:'/list-companies',
      name:'companies',
      component:LisCompanies

    },
    {
      path:'/list-freelancers',
      name:'freelancers',
      component:LisCompanies

    }
  ],
})

export default router
