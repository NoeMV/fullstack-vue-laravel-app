import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('users', () => {

    const router = useRouter();

    const userPermsRoles = ref([]);
    const usersPermsRoles = ref([]);
    const allPermsRoles = ref([]);
    const userRoles = ref([]);
    const userPerms = ref([]);

    const pagination = ref([]);

    function checkRolesPerms(){
        userRoles.value = allPermsRoles.value[0].map(e => ({name: e, check: userPermsRoles.value.roles.findIndex(item => item.name == e) != -1 ? true : false}));
        userPerms.value = allPermsRoles.value[1].map(e => ({name: e, check: userPermsRoles.value.permissions.findIndex(item => item.name == e) != -1 ? true : false}));
    }

    const getUsers = async () => {
        const response = await axios.get('api/v1/users?page=' + (pagination.value.current_page || '1'));
        usersPermsRoles.value = response.data.data;
        pagination.value = response.data;
    }

    const getUserPermsRoles = async (id) => {
        const response = await axios.get('api/v1/users-show/' + id);
        userPermsRoles.value = response.data;
        await getAllPermsRoles();
        checkRolesPerms();
    }

    const getAllPermsRoles = async () => {
        const response = await axios.get('api/v1/users-list-perms');
        allPermsRoles.value = response.data;
    }

    const updateUserPermsRoles = async (id) => {
        try {
            await axios.patch('api/v1/users-perms/' + id, {authData: [userRoles.value.filter(e => e.check == true).map(item => item.name), userPerms.value.filter(e => e.check == true).map(item => item.name)]});
            router.push({name: 'Users'});
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        if(!window.confirm("You are about to delete this user, are you sure?")){
            return;
        }

        await axios.delete('api/v1/users/' + id);
        await getUsers();
    }

    return {
        userPermsRoles,
        usersPermsRoles,
        allPermsRoles,
        userRoles,
        userPerms,
        getUsers,
        getUserPermsRoles,
        getAllPermsRoles,
        updateUserPermsRoles,
        deleteUser,
        pagination
    };
});