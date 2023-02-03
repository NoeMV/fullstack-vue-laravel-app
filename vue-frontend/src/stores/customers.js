import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useCustomersStore = defineStore('customers', () => {

    const router = useRouter();

    const customer = ref([]);
    const customers = ref([]);

    const pagination = ref([]);
    const formErrors = ref({});

    const errors = computed({
        get(){
            return formErrors.value;
        },
        set(data){
            formErrors.value = data;
        }
    });

    const getCustomers = async () => {
        const response = await axios.get('api/v1/customers?page=' + (pagination.value.current_page || '1'));
        customers.value = response.data.data;
        pagination.value = response.data.meta;
    }

    const getCustomer = async (id) => {
        const response = await axios.get('api/v1/customers/' + id);
        customer.value = response.data.data;
    }

    const storeCustomer = async (data) => {
        try {
            await axios.post('api/v1/customers', data);
            router.push({name: 'Customers'});
        } catch (error) {
            if(error.response.status === 422){
                formErrors.value = error.response.data.errors;
            }
        }
    }

    const updateCustomer = async (id) => {
        try {
            await axios.patch('api/v1/customers/' + id, customer.value);
            router.push({name: 'Customers'});
        } catch (error) {
            if(error.response.status === 422){
                formErrors.value = error.response.data.errors;
            }
        }
    }

    const deleteCustomer = async (id) => {
        if(!window.confirm("You are about to delete this customer, are you sure?")){
            return;
        } 

        await axios.delete('api/v1/customers/' + id);
        await getCustomers();
    }

    return {
        customers,
        customer,
        getCustomers,
        getCustomer,
        storeCustomer,
        updateCustomer,
        deleteCustomer,
        pagination,
        errors
    };
});