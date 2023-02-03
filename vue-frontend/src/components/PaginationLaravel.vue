<script>
    export default {
        props: {
            pagination: {
                type: Object,
                required: true
            },
            offset: {
                type: Number,
                default: 4
            }
        },
        computed: {
            pages() {
                if (!this.pagination.to) {
                    return null;
                }
                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pages = [];
                for (let page = from; page <= to; page++) {
                    pages.push(page);
                }
                return pages;
            },
        },
        methods: {
            change: function(page) {
                this.pagination.current_page = page;
                this.$emit('paginate');
            }
        }
    }
</script>

<template>
    <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6 max-w-full">
        <ul class="flex list-reset border border-grey-light rounded w-auto font-sans">
            <li v-if="pagination.current_page > 1">
                <a class="block hover:bg-gray-100 text-blue border-r border-grey-light px-3 py-2" 
                    href="#"
                    @click.prevent="change(pagination.current_page -1)"
                >
                    Previous
                </a>
            </li>
            <li v-else>
                <a class="block hover:bg-gray-100 text-blue border-r border-grey-light px-3 py-2" 
                    href="#"
                    disabled
                >
                    Previous
                </a>
            </li>
            <li v-for="page in pages" :key="page" >
                <a :class="[page == pagination.current_page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':'hover:bg-gray-100 text-blue border-r border-grey-light', 'block px-3 py-2']" 
                href="#"
                @click.prevent="change(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li v-if="pagination.current_page < pagination.last_page">
                <a class="block hover:bg-gray-100 text-blue border-r border-grey-light px-3 py-2" 
                href="#"
                @click.prevent="change(pagination.current_page + 1)"
                >
                    Next
                </a>
            </li>
            <li v-else>
                <a class="block hover:bg-gray-100 text-blue border-r border-grey-light px-3 py-2" 
                href="#"
                disabled
                >
                    Next
                </a>
            </li>
        </ul>
    </div>
    
</template>
