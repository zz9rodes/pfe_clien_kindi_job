import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/ListJobs.vue'
import HomeView from '@/views/HomeView.vue'
import LisCompanies from '@/views/LisCompanies.vue'
import ListFreelancers from '@/views/ListFreelancers.vue'
import RegisterForm from '@/components/authFom/registerForm.vue'
import LoginForm from '@/components/authFom/loginForm.vue'
import BaseLayout from '@/views/BaseLayout.vue'
import forgotPasswordForm from '@/components/authFom/forgotPasswordForm.vue'
import ResetPasswordForm from '@/components/authFom/resetPasswordForm.vue'
import AccountDashboard from '@/views/AccountLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: BaseLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/list-jobs',
          name: 'jobs',
          component: AboutView,
        },
        {
          path: '/list-companies',
          name: 'companies',
          component: LisCompanies

        },
        {
          path: '/list-freelancers',
          name: 'freelancers',
          component: ListFreelancers

        }
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: AccountDashboard,
      // children: [
      //   {
      //     path: '/home',
      //     name: 'home',
      //     component: HomeView,
      //   },
      //   {
      //     path: '/list-jobs',
      //     name: 'jobs',
      //     component: AboutView,
      //   },
      //   {
      //     path: '/list-companies',
      //     name: 'companies',
      //     component: LisCompanies

      //   },
      //   {
      //     path: '/list-freelancers',
      //     name: 'freelancers',
      //     component: ListFreelancers

      //   }
      // ]
    }
    ,
    {
      path: '/auth/login',
      name: 'login',
      component: LoginForm

    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterForm

    },
    {
      path: '/auth/password-forgot',
      name: 'password_forgot',
      component: forgotPasswordForm
    },
    {
      path: '/auth/reset-password',
      name: 'reset_password',
      component: ResetPasswordForm
    }
  ],
})

export default router
