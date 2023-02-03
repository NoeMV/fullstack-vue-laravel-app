<script setup>
  import Nav from './components/Nav.vue';
  import NavFallback from './components/NavFallback.vue';
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <Nav />
      </template>
      <template #fallback>
        <NavFallback />
      </template>
    </Suspense>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
