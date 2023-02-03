<script setup>
    import Card from '../../Card.vue';
    import { reactive, onBeforeMount } from 'vue';
    import { useCustomersStore } from '../../../stores/customers';

    const customersStore = useCustomersStore();

    const formData = reactive({
        name: "",
        type: "",
        email: "",
        address: "",
        city: "",
        state: "",
        postalCode: ""
    });

    const customerTypes = [
        {id: 'I', text: 'Individual'},
        {id: 'B', text: 'Business'}
    ];

    onBeforeMount(() => {
        if(customersStore.errors){
            customersStore.errors = [];
        }
    });

</script>

<template>
    <div>
        <main class="flex flex-col justify-center h-full py-16 px-4 md:px-6 lg:px-8 xl:px-10">
            <Card :class="['flex justify-center items-center py-6 w-full max-w-md mx-auto']">
                <template #content>
                    <form class="w-full px-8" @submit.prevent="customersStore.storeCustomer(formData)">
                        <div class="border-b border-gray-100 mb-4 p-3">
                            <h2 class="text-gray-900 font-semibold text-lg text-center">Create Customer</h2>
                        </div>
                        
                        <div class="mb-6 relative">
                            <input type="text" id="name" placeholder="Name" v-model="formData.name" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="name" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Name</label>
                            <span v-if="customersStore.errors.name">
                                <p v-for="err in customersStore.errors.name" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <select v-model="formData.type" id="type" class="mt-2 w-full bg-white border-b-2 border-gray-300 p-2.5 text-sm text-gray-700 shadow-sm transition ease-in-out focus:border-blue-600 focus:ring-blue-600 focus:outline-none">
                                <option v-for="types in customerTypes" :key="types.id" :value="types.id">{{ types.text }}</option>
                            </select>
                            <label for="type" class="absolute top-0 left-0 origin-left pl-0 -translate-y-1/2 opacity-75 transform text-sm text-gray-900">Type</label>
                            <span v-if="customersStore.errors.type">
                                <p v-for="err in customersStore.errors.type" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <input type="email" id="email" placeholder="Email" v-model="formData.email" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Email</label>
                            <span v-if="customersStore.errors.email">
                                <p v-for="err in customersStore.errors.email" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <textarea type="text" id="address" placeholder="Address" v-model="formData.address" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"></textarea>
                            <label for="address" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Address</label>
                            <span v-if="customersStore.errors.address">
                                <p v-for="err in customersStore.errors.address" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <input type="text" id="city" placeholder="City" v-model="formData.city" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="city" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">City</label>
                            <span v-if="customersStore.errors.city">
                                <p v-for="err in customersStore.errors.city" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <input type="text" id="state" placeholder="State" v-model="formData.state" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="state" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">State</label>
                            <span v-if="customersStore.errors.state">
                                <p v-for="err in customersStore.errors.state" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <div class="mb-6 relative">
                            <input type="text" id="postalCode" placeholder="Postal Code" v-model="formData.postalCode" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                            <label for="postalCode" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Postal Code</label>
                            <span v-if="customersStore.errors.postal_code">
                                <p v-for="err in customersStore.errors.postal_code" class="text-sm text-red-400">{{ err }}</p>
                            </span>
                        </div>

                        <button class="mx-auto w-full rounded-md bg-sky-500 hover:bg-sky-700 text-white py-2 px-3">Submit</button>
                    </form>
                </template>
            </Card>
        </main>
    </div>
</template>