<script async setup>
    import { useInvoicesStore } from '../../../stores/invoices';
    import { useCustomersStore } from '../../../stores/customers';
    import { useAuthStore } from '../../../stores/auth';

    const authStore = useAuthStore();

    const props = defineProps({
        customerId: {
            required: true,
            type: String
        }
    });

    const customersStore = useCustomersStore();

    const invoicesStore = useInvoicesStore();

    await invoicesStore.getInvoicesForCustomer(props.customerId);

    const statusTypes = [
        {id: 'B', text: 'Billed'},
        {id: 'P', text: 'Paid'},
        {id: 'V', text: 'Void'}
    ];

    function parseDate (timestamp) {
        if(!timestamp){
            return 'N/A';
        }

        let date = new Date(timestamp);
        let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

        return  month + "-" + day + "-" + date.getFullYear();
    }

</script>

<template>
    <div class="w-full max-w-full mx-auto">
        <header class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-800 text-lg">{{ customersStore.customer.name + "'s Invoices" }}</h2>
            <router-link v-if="authStore.user?.allPerms?.map(e => e.name).includes('add invoices')" :to="{name: 'CreateInvoice', params:{customerId: customersStore.customer.id}}" class="rounded-md bg-sky-500 py-2 px-3 hover:bg-sky-700 text-white">Create Invoice</router-link>
        </header>
        <div class="p-3">
            <div class="overflow-x-auto">
                <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">ID</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Amount</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Status</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Billed Date</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Paid Date</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-center">Manage</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-gray-100">
                        <tr v-for="(invoice, index) in invoicesStore.invoices" :key="invoice.id" :class=" index % 2 == 0 ? ['bg-white'] : ['bg-slate-50']">
                            <td class="p-2 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="font-medium text-gray-800">{{ invoice.id }}</div>
                                </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left">{{ invoice.amount }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap" :class="invoice.status == 'P' ? ['text-emerald-500'] : invoice.status == 'B' ? ['text-red-500'] : ['text-slate-600']">
                                <div class="text-left">{{ statusTypes.find((e) => e.id == invoice.status)?.text }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left">{{ parseDate(invoice.billedDate) }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left">{{ parseDate(invoice.paidDate) }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-lg text-center space-x-2">
                                    <router-link v-if="authStore.user?.allPerms?.map(e => e.name).includes('edit invoices')" :to="{name: 'EditInvoice', params: {id: invoice.id}}" class="rounded-md px-2 py-1 text-sm text-white bg-emerald-500 hover:bg-emerald-700">Edit</router-link>
                                    <button v-if="authStore.user?.allPerms?.map(e => e.name).includes('delete invoices')" @click="invoicesStore.deleteInvoice(invoice.id, customersStore.customer.id)" class="rounded-md px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-700">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>