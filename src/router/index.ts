import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/HomePage.vue'
import StatisticsPage from '../pages/statistics/StatisticsPage.vue'
import SettingsPage from '../pages/settings/SettingsPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: HomePage },
        { path: '/statistics', component: StatisticsPage },
        { path: '/settings', component: SettingsPage }
    ],
})

export default router