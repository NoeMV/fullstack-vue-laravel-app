<script setup>
    import Card from '../../Card.vue';
    import { onBeforeMount, onBeforeUnmount } from 'vue';
    import { useCustomersStore } from '../../../stores/customers';
    import { storeToRefs } from 'pinia';
    import TableInvoices from '../Invoices/TableInvoices.vue';
    import TableFallback from '../../TableFallback.vue';

    const customersStore = useCustomersStore();

    const {customer} = storeToRefs(customersStore);

    const props = defineProps({
        id: {
            required: true,
            type: String
        }
    });

    const customerTypes = [
        {id: 'I', text: 'Individual'},
        {id: 'B', text: 'Business'}
    ];

    onBeforeMount(async () => {
        await customersStore.getCustomer(props.id);
    });

    onBeforeUnmount(async () => {
        if(customer){
            customer.value = {};
        }
    });

</script>

<template>
    <div>
        <main class="flex flex-row justify-between h-full py-16 px-4 md:px-6 lg:px-8 xl:px-10">
            <Card :class="['flex justify-center items-center py-6 w-full max-w-md mx-2 xl:lg:md:mx-auto']">
                <template #content>
                    <div class="w-full px-8">
                        <div class="border-b border-gray-100 mb-4 p-3">
                            <h2 class="text-gray-900 font-semibold text-lg text-center">Customer Info</h2>
                        </div>
                        
                        <div class="mb-6 relative">
                            <input disabled type="text" id="name" placeholder="Name" v-model="customer.name" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="name" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Name</label>
                        </div>

                        <div class="mb-6 relative">
                            <input disabled type="text" id="type" placeholder="Type" :value="(customerTypes.find((e) => e.id == customer.type)?.text)" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="type" class="absolute top-0 left-0 origin-left pl-0 -translate-y-1/2 opacity-75 transform text-sm text-gray-900">Type</label>
                        </div>

                        <div class="mb-6 relative">
                            <input disabled type="email" id="email" placeholder="Email" v-model="customer.email" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Email</label>
                        </div>

                        <div class="mb-6 relative">
                            <textarea disabled type="text" id="address" placeholder="Address" v-model="customer.address" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"></textarea>
                            <label for="address" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Address</label>
                        </div>

                        <div class="mb-6 relative">
                            <input disabled type="text" id="city" placeholder="City" v-model="customer.city" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="city" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">City</label>
                        </div>

                        <div class="mb-6 relative">
                            <input disabled type="text" id="state" placeholder="State" v-model="customer.state" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="state" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">State</label>
                        </div>

                        <div class="mb-6 relative">
                            <input disabled type="text" id="postalCode" placeholder="Postal Code" v-model="customer.postalCode" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="postalCode" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Postal Code</label>
                        </div>
                    </div>
                </template>
            </Card>
            <Card :class="['flex justify-center h-fit py-6 w-full max-w-3xl mx-2 xl:lg:md:mx-auto']">
                <template #content>
                    <Suspense>
                        <TableInvoices :customerId="props.id" />
                        <template #fallback>
                            <TableFallback />
                        </template>
                    </Suspense>
                </template>
            </Card>
        </main>
    </div>
</template>