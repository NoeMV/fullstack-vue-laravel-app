<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../stores/auth';

    const authStore = useAuthStore();

    const form = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

</script>

<template>
    <div>
        <main>
            <div class="mx-auto py-6 max-w-md sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <div class="rounded-lg bg-white px-8 py-6 text-center shadow-md">
                        <div class="mb-10 text-center md:mb-16">Register</div>
                        <form @submit.prevent="authStore.handleRegister(form)">
                            <div class="mb-6 relative">
                                <input type="text" placeholder="Name" id="name" v-model="form.name"
                                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label for="name" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Name</label>
                                <div v-if="authStore.errors.name" class="flex">
                                    <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-6 relative">
                                <input type="email" placeholder="Email" id="email" v-model="form.email"
                                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Email</label>
                                <div v-if="authStore.errors.email" class="flex">
                                    <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-6 relative">
                                <input type="password" placeholder="Password" id="password" v-model="form.password"
                                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Password</label>
                                <div v-if="authStore.errors.password" class="flex">
                                    <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.password[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-6 relative">
                                <input type="password" placeholder="Password Confirmation" id="password_confirmation" v-model="form.password_confirmation"
                                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label for="password_confirmation" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Password Confirmation</label>
                            </div>
                            <div class="mb-10">
                                <button type="submit" class="w-full px-4 py-3 bg-sky-500 hover:bg-sky-700 rounded-md text-white">
                                    Register
                                </button>
                            </div>
                        </form>
                        <RouterLink :to="{name: 'Login'}" class="text-base text-[#adadad] text-primary hover:underline">
                            Sign in
                        </RouterLink>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>