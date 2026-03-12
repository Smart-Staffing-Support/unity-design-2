import AccountView from '@/views/AccountView.vue'
import BulkAccountManagerView from '@/views/BulkAccountManagerView.vue'
import ClientView from '@/views/ClientView.vue'
import NewAccount from '@/views/NewAccount.vue'
import SearchView from '@/views/SearchView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccountView
    },
    {
      path: '/new-account',
      name: 'new-account',
      component: NewAccount
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/client',
      name: 'client',
      component: ClientView
    },
    {
      path: '/account-management',
      name: 'account-management',
      component: BulkAccountManagerView
    },
  ],
})

export default router
