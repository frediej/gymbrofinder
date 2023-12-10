import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {auth} from "@/js/firebase";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/profile',
            name: 'ProfileView',
            component: () => import('@/views/ProfileView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/profile/edit',
            name: 'ProfileEditView.vue',
            component: () => import('@/views/ProfileEditView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('../views/SearchView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/matches',
            name: 'matches',
            component: () => import('../views/MatchesView.vue'),
            meta: {requiresAuth: true}
        },
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    onAuthStateChanged(auth, (user) => {
        if (requiresAuth && !user) {
            next('/login');
        } else {
            next();
        }
    });
});


export default router
