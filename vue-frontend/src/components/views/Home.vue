<script setup>
    import { useAuthStore } from '../../stores/auth';
    import Card from '../Card.vue';

    const authStore = useAuthStore();

</script>

<template>
    <div>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Inicio</h1>
            </div>
        </header>
        <main class="flex flex-col justify-center h-full py-16 px-4 md:px-6 lg:px-8 xl:px-10">
            <Card :class="['flex flex-col justify-center items-center py-6 w-full max-w-full mx-auto']">
                <template #content>
                    <div class="py-4">
                        <h1 class="text-xl text-black">Welcome to the customers management system.</h1>
                    </div>
                    <div v-if="!authStore.userStatus">
                        <h1>In order to see all system's features, authentication is required.</h1>

                        <p>For bugs, contact to dev@support.com as soon as possible.</p>
                    </div>
                    <div v-else>
                        <h2 class="text-slate-800 text-lg">User authenticated as:</h2>
                        <p>{{ "Name: " + authStore.user.name }}</p>
                        <p>{{ "Email: " + authStore.user.email }}</p>
                    </div>
                </template>
            </Card>
        </main>
    </div>
</template>