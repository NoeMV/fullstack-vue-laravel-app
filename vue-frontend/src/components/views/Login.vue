<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../stores/auth';

    const authStore = useAuthStore();

    const form = ref({
        email: '',
        password: ''
    });

</script>

<template>
    <div>
        <main>
            <div class="mx-auto py-28 max-w-md sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <div class="rounded-lg bg-white px-8 py-6 text-center shadow-md">
                        <div class="mb-10 text-center md:mb-16">Login</div>
                        <form @submit.prevent="authStore.handleLogin(form)">
                            <div class="mb-6 relative">
                                <input type="email" id="email" v-model="form.email" placeholder="Email" autocomplete="NA"
                                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Email</label>
                                <div v-if="authStore.errors.email" class="flex">
                                    <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-6 relative">
                                <input type="password" id="password" v-model="form.password" placeholder="Password" autocomplete="NA"
                                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
                                <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-900">Password</label>
                                <div v-if="authStore.errors.password" class="flex">
                                    <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.password[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-10">
                                <button type="submit" class="w-full px-4 py-3 bg-sky-500 hover:bg-sky-700 rounded-md text-white">
                                    Login
                                </button>
                            </div>
                        </form>
                        <p class="text-base text-[#adadad]">
                            Not a member yet?
                            <router-link :to="{name: 'Register'}" class="text-primary hover:underline">
                            Sign Up
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>