    import { defineStore } from "pinia";
    import axios from "axios";
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";

    export const useInvoicesStore = defineStore('invoices', () => {

        const router = useRouter();

        const invoice = ref([]);
        const invoices = ref([]);

        const pagination = ref([]);
        const formErrors = ref([]);

        function parseDate (timestamp) {
            if(!timestamp){
                return '';
            }
    
            let date = new Date(timestamp);
            let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    
            return date.getFullYear() + "-" + month + '-' + day;
        }

        const errors = computed({
            get() {
                return formErrors.value;
            },
            set(data) {
                formErrors.value = data;
            }
        });

        const getInvoices = async () => {
            const response = await axios.get('api/v1/invoices?page=' + (pagination.value.current_page || '1'));
            invoices.value = response.data.data;
            pagination.value = response.data.meta;
        }

        const getInvoicesForCustomer = async (id) => {
            const response = await axios.get('api/v1/invoices/for-customer/' + id + '?page=' + (pagination.value.current_page || '1'));
            invoices.value = response.data.data;
            pagination.value = response.data.meta;
        }

        const getInvoice = async (id) => {
            const response = await axios.get('api/v1/invoices/' + id);
            invoice.value = response.data.data;
            invoice.value.billedDate = parseDate(invoice.value.billedDate);
            invoice.value.paidDate = parseDate(invoice.value.paidDate);
        }

        const storeInvoice = async (data) => {
            try {
                await axios.post('api/v1/invoices', data);
                router.push({name: 'ShowCustomer', params: {id: data.customerId}});
            } catch (error) {
                if(error.response.status === 422) {
                    formErrors.value = error.response.data.errors;
                }
            }
        }

        const updateInvoice = async (id, data) => {
            try {
                await axios.patch('api/v1/invoices/' + id, data);
                router.push({name: 'ShowCustomer', params: {id: data.customerId}});
            } catch (error) {
                if(error.response.status === 422) {
                    formErrors.value = error.response.data.errors;
                }
            }
        }

        const deleteInvoice = async (invoiceId, customerId) => {
            if(!window.confirm("You are about to delete this invoice, are you sure?")){
                return;
            }

            await axios.delete('api/v1/invoices/' + invoiceId);

            await getInvoicesForCustomer(customerId);

        }

        return {
            invoice,
            invoices,
            getInvoice,
            getInvoices,
            getInvoicesForCustomer,
            storeInvoice,
            updateInvoice,
            deleteInvoice,
            pagination,
            errors
        };
    });