<script setup>
    import { useRouter } from 'vue-router';
    import Card from '../../Card.vue';
    import TableCustomers from './TableCustomers.vue';
    import TableFallback from '../../TableFallback.vue';

    const router = useRouter();

</script>

<template>
    <div>
        <main class="flex flex-col justify-center h-full py-16 px-4 md:px-6 lg:px-8 xl:px-10">
            <Card :class="['flex justify-center items-center py-6 w-full max-w-full mx-auto']">
                <template #content>
                    <Suspense>
                        <TableCustomers />
                        <template #fallback>
                            <TableFallback />
                        </template>
                    </Suspense>
                    
                </template>
            </Card>
        </main>
    </div>
</template>