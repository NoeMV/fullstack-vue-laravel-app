<script setup>
    import Card from '../../Card.vue';
    import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
    import { useUserStore } from '../../../stores/users';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const userStore = useUserStore();

    const {userPermsRoles, userRoles, userPerms} = storeToRefs(userStore);

    const props = defineProps({
        id: {
            required: true,
            type: String
        }
    });

    onBeforeMount(async () => {
        await userStore.getUserPermsRoles(props.id);
    });

    onBeforeUnmount(async () => {
        if(userPermsRoles){
            userPermsRoles.value = {};
        }

        if(userRoles){
            userRoles.value = {};
        }

        if(userPerms){
            userPerms.value = {};
        }
    });

</script>

<template>
    <div>
        <main class="flex flex-col justify-center h-full py-16 px-4 md:px-6 lg:px-8 xl:px-10">
            <Card :class="['flex flex-col justify-center items-center py-6 w-full max-w-md mx-auto']">
                <template #content>
                    <form class="w-full px-8" @submit.prevent="userStore.updateUserPermsRoles(props.id)">
                        <div class="border-b border-gray-100 mb-4 p-3">
                            <h2 class="text-gray-900 font-semibold text-lg text-center">Roles for {{ userPermsRoles?.name }}</h2>
                        </div>

                        <fieldset>
                            <div class="mb-6" v-for="role in userRoles" :key="role.name">
                                <div class="flex items-center">
                                    <input type="checkbox" :id="role.name" v-model="role.check" class="h-4 w-4 text-sky-500 bg-gray-100 border-gray-300 rounded-lg transition ease-in-out duration-200 cursor-pointer" />
                                    <label :for="role.name" class="ml-3 font-medium text-gray-900">{{ role.name }}</label>
                                </div>
                            </div>
                        </fieldset>

                        <div class="border-b border-gray-100 mb-4 p-3">
                            <h2 class="text-gray-900 font-semibold text-lg text-center">Direct Permissions for {{ userPermsRoles?.name }}</h2>
                        </div>

                        <fieldset>
                            <div class="mb-6" v-for="perm in userPerms" :key="perm.name">
                                <div class="flex items-center">
                                    <input type="checkbox" :id="perm.name" v-model="perm.check" class="h-4 w-4 text-sky-500 bg-gray-100 border-gray-300 rounded-lg transition ease-in-out duration-200 cursor-pointer" />
                                    <label :for="perm.name" class="ml-3 font-medium text-gray-900">{{ perm.name }}</label>
                                </div>
                            </div>
                        </fieldset>
                        

                        <button class="mx-auto w-full rounded-md bg-sky-500 hover:bg-sky-700 text-white py-2 px-3">Update</button>
                    </form>
                    <div class="w-full px-8">
                        <button @click="router.go(-1)" class="text-center block mt-4 mx-auto w-full rounded-md text-sky-500 py-2 px-3 border-2 border-sky-500 hover:bg-sky-100">Go back</button>
                    </div>
                </template>
            </Card>
        </main>
    </div>
</template>