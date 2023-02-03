<script setup>
    import Card from '../../Card.vue';
    import { reactive, onBeforeMount } from 'vue';
    import { useInvoicesStore } from '../../../stores/invoices';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const invoicesStore = useInvoicesStore();

    const props = defineProps({
        customerId: {
            required: true,
            type: String
        }
    });

    const formData = reactive({
        customerId: props.customerId,
        amount: "",
        status: "",
        billedDate: "",
        paidDate: ""
    });

    const statusTypes = [
        {id: 'B', text: 'Billed'},
        {id: 'P', text: 'Paid'},
        {id: 'V', text: 'Void'}
    ];

    onBeforeMount(() => {
        if(invoicesStore.errors){
            invoicesStore.errors = [];
        }
    });


    function handleStore(){
        const finalData = Object.assign({}, formData);
        
        finalData.billedDate = finalData.billedDate + ' 00:00:00';
        finalData.paidDate = finalData.paidDate ? finalData.paidDate + ' 00:00:00': '';

        invoicesStore.storeInvoice(finalData);
    }

</script>

<template>
    <div>
        <main class="flex flex-col justify-center h-full py-16 px-4 md:px-6 lg:px-8 xl:px-10">
            <Card :class="['flex flex-col justify-center items-center py-6 w-full max-w-md mx-auto']">
                <template #content>
                    <form class="w-full px-8" @submit.prevent="handleStore">
                        <div class="border-b border-gray-100 mb-4 p-3">
                            <h2 class="text-gray-900 font-semibold text-lg text-center">Create Invoice</h2>
                        </div>

                        <div class="mb-6 relative">
                            <input type="text" id="amount" placeholder="Amount" v-model="formData.amount" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="amount" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Amount</label>
                            <span v-if="invoicesStore.errors.amount">
                                <p v-for="err in invoicesStore.errors.amount" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <select v-model="formData.status" id="status" class="mt-2 w-full bg-white border-b-2 border-gray-300 p-2.5 text-sm text-gray-700 shadow-sm transition ease-in-out focus:border-blue-600 focus:ring-blue-600 focus:outline-none">
                                <option v-for="types in statusTypes" :key="types.id" :value="types.id">{{ types.text }}</option>
                            </select>
                            <label for="status" class="absolute top-0 left-0 origin-left pl-0 -translate-y-1/2 opacity-75 transform text-sm text-gray-900">Type</label>
                            <span v-if="invoicesStore.errors.status">
                                <p v-for="err in invoicesStore.errors.status" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <input type="date" id="billedDate" placeholder="" v-model="formData.billedDate" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="billedDate" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Billed Date</label>
                            <span v-if="invoicesStore.errors.billed_date">
                                <p v-for="err in invoicesStore.errors.billed_date" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <input type="date" id="paidDate" placeholder="" v-model="formData.paidDate" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="paidDate" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Paid Date</label>
                            <span v-if="invoicesStore.errors.paid_date">
                                <p v-for="err in invoicesStore.errors.paid_date" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <button class="mx-auto w-full rounded-md bg-sky-500 hover:bg-sky-700 text-white py-2 px-3">Submit</button>
                    </form>
                    <div class="w-full px-8">
                        <button href="" @click="router.go(-1)" class="text-center block mt-4 mx-auto w-full rounded-md text-sky-500 py-2 px-3 border-2 border-sky-500 hover:bg-sky-100">Go back</button>
                    </div>
                </template>
            </Card>
        </main>
    </div>
</template>