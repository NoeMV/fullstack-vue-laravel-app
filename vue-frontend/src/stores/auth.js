import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import {useRouter} from 'vue-router';

export const useAuthStore = defineStore("auth", () => {
    const router = useRouter();

    const authUser = ref(null);
    const authErrors = ref([]);
    const isLogged = ref(false);

    const userStatus = computed(() => isLogged.value);
    const user = computed(() => authUser.value);
    const errors = computed(() => authErrors.value);


    const getToken = async () => {
        await axios.get('/sanctum/csrf-cookie');
    }

    const getUser = async () => {
        await getToken();
        try {
            const data = await axios.get('api/users-info');

            authUser.value = data.data;
            isLogged.value = true;

            if(!authUser.value) isLogged.value = false;
        } catch (error) {
            if(error.response.status === 401){
                authUser.value = null;
                isLogged.value = false;
            }
        }
    }

    const handleLogin = async (data) => {
        authErrors.value = [];
        await getToken();

        try {
            await axios.post('/login', {
                email: data.email,
                password: data.password
            });

            isLogged.value = true;
    
            router.push('/');
        } catch (error) {
            if(error.response.status === 422) {
                authErrors.value = error.response.data.errors;
            }
        }
    }

    const handleRegister = async (data) => {
        await getToken();

        try {
            await axios.post('/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            });

            isLogged.value = true;
    
            router.push('/');
        } catch (error) {
            if(error.response.status === 422) {
                authErrors.value = error.response.data.errors;
            }
        }
    }

    const handleLogout = async () => {
        await axios.post('/logout');
        authUser.value = null;
        isLogged.value = false;
        router.push({name: 'Home'});
    }

    return {
        user,
        errors,
        userStatus,
        getToken,
        getUser,
        handleLogin,
        handleRegister,
        handleLogout,
    };
});