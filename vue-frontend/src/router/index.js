import {createRouter, createWebHistory} from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
    { path: '/', name: 'Home', component: () => import('../components/views/Home.vue')},
    { path: '/login', name: 'Login', component: () => import('../components/views/Login.vue')},
    { path: '/register', name: 'Register', component: () => import('../components/views/Register.vue')},
    { path: '/customers', name: 'Customers', component: () => import('../components/views/Customers/CustomersIndex.vue'), meta: {requiresAuth: true, perms: ['view customers']}},
    { path: '/customers/create', name: 'CreateCustomer', component: () => import('../components/views/Customers/CreateCustomer.vue'), meta: {requiresAuth: true, perms: ['add customers']}},
    { path: '/customers/:id/edit', name: 'EditCustomer', component: () => import('../components/views/Customers/EditCustomer.vue'), meta: {requiresAuth: true, perms: ['edit customers']}, props: true},
    { path: '/customers/:id', name: 'ShowCustomer', component: () => import('../components/views/Customers/ShowCustomer.vue'), meta: {requiresAuth: true, perms: ['view customers', 'view invoices']}, props: true},
    { path: '/invoices/:customerId/create', name: 'CreateInvoice', component: () => import('../components/views/Invoices/CreateInvoice.vue'), meta: {requiresAuth: true, perms: ['view invoices', 'add invoices']}, props: true},
    { path: '/invoices/:id/edit', name: 'EditInvoice', component: () => import('../components/views/Invoices/EditInvoice.vue'), meta: {requiresAuth: true, perms: ['view invoices', 'edit invoices']}, props: true},
    { path: '/users', name: 'Users', component: () => import('../components/views/Users/UsersIndex.vue'), meta: {requiresAuth: true, perms: ['manage users']}},
    { path: '/users/:id/edit', name: 'EditUser', component: () => import('../components/views/Users/EditUser.vue'), meta: {requiresAuth: true, perms: ['manage users']}, props: true}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach(async (to, from, next) => {
    if(!to.meta.requiresAuth){
        next();
    }

    const authStore = useAuthStore();

    await authStore.getUser();

    if (to.meta.requiresAuth && authStore.userStatus == false){
        next({ name: 'Login' });
    }

    if(to.meta.perms.every(e => authStore.user.allPerms.map(i => i.name).includes(e))) {
        next();
    } else {
        next({name: 'Home'});
    }
    
});

export default router;