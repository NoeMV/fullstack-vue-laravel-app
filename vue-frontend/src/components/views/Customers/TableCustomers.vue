<script async setup>
    import { useCustomersStore } from '../../../stores/customers'
    import PaginationLaravel from '../../PaginationLaravel.vue';
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '../../../stores/auth';

    const authStore = useAuthStore();

    const customersStore = useCustomersStore();
    
    const {pagination} = storeToRefs(customersStore);

    await customersStore.getCustomers();

</script>

<template>
    <div class="w-full max-w-full mx-auto">
        <header class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-800 text-lg">Customers</h2>
            <router-link v-if="authStore.user?.allPerms?.map(e => e.name).includes('add customers')" :to="{name: 'CreateCustomer'}" class="rounded-md bg-sky-500 py-2 px-3 hover:bg-sky-700 text-white">Create Customer</router-link>
        </header>
        <div class="p-3">
            <div class="overflow-x-auto">
                <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Name</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Type</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Email</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-center">Manage</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-gray-100">
                        <tr v-for="(customer, index) in customersStore.customers" :key="customer.id" :class=" index % 2 == 0 ? ['bg-white'] : ['bg-slate-50']">
                            <td class="p-2 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="font-medium text-gray-800">{{ customer.name }}</div>
                                </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left">{{ customer.type }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left">{{ customer.email }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-lg text-center space-x-2">
                                    <router-link :to="{name: 'ShowCustomer', params: {id: customer.id}}" class="rounded-md px-2 py-1 text-sm text-white bg-sky-500 hover:bg-sky-700">Details</router-link>
                                    <router-link v-if="authStore.user?.allPerms?.map(e => e.name).includes('edit customers')" :to="{name: 'EditCustomer', params: {id: customer.id}}" class="rounded-md px-2 py-1 text-sm text-white bg-emerald-500 hover:bg-emerald-700">Edit</router-link>
                                    <button v-if="authStore.user?.allPerms?.map(e => e.name).includes('delete customers')" @click="customersStore.deleteCustomer(customer.id)" class="rounded-md px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-700">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center">
                    <PaginationLaravel :pagination="pagination" @paginate="customersStore.getCustomers()" :offset="4"/>
                </div>
            </div>
        </div>
    </div>
</template>