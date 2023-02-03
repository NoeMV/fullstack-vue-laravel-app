<script async setup>
  import { useAuthStore } from '../stores/auth';
  import { computed, ref, TransitionGroup } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';

  const authStore = useAuthStore();

  const router = useRouter();

  await authStore.getUser();

  const {userStatus} = storeToRefs(authStore);

  const currentRoute = computed(() => router.currentRoute.value.name);

  const navigation = [
    { name: 'Home', auth: false, display: 'left'},
    { name: 'Customers', auth: true, display: 'left', perms: 'view customers'},
    { name: 'Users', auth: true, display: 'left', perms: 'manage users'},
    { name: 'Login', auth: false, display: 'right'},
    { name: 'Register', auth: false, display: 'right'}
  ];

  let menuStatus = ref(false);
  let menuMobile = ref(false);

  function menuAppear () {
    menuStatus.value = menuStatus.value ? false : true;
  }

  function menuAppearMobile () {
    menuMobile.value = menuMobile.value ? false : true;
  }

  function triggerLogout () {
    menuAppear();
    authStore.handleLogout();
  }

</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="https://github.com/NoeMV" target="_blank"><h2 class="text-white">NoeMV - Full stack App</h2></a>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <TransitionGroup enter-active-class="transition ease-out duration-120" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-120" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95" >
                <template v-for="item in navigation.filter((e) => e.display == 'left')" :key="item.name">
                  <router-link v-if="(item.auth == userStatus && authStore.user?.allPerms?.map(i => i.name).includes(item.perms)) || item.name == 'Home'" :to="{name: item.name}" :class="[item.name == currentRoute ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>            
                </template>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-4">
            <!-- Profile dropdown -->
            <template v-for="item in navigation.filter((e) => e.display == 'right')" :key="item.name">
              <router-link v-if="item.auth == userStatus" :to="{name: item.name}" :class="[item.name == currentRoute ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>            
            </template>            
            <div v-if="userStatus == true" class="relative ml-3">
              <div>
                <button type="button" @click="menuAppear" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full bg-white" src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="">
                </button>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="menuStatus" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="#" @click="triggerLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</a>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button type="button" @click="menuAppearMobile" class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="menuMobile == true" @mouseleave="menuAppearMobile" class="md:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <template v-for="item in navigation.filter((e) => e.display == 'left')" :key="item.name">
          <router-link v-if="item.auth == userStatus || item.name == 'Home'" :to="{name: item.name}" :class="[item.name == currentRoute ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>            
        </template>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full bg-white" src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">{{ authStore.user.name }}</div>
            <div class="text-sm font-medium leading-none text-gray-400">{{ authStore.user.email }}</div>
          </div>
        </div>
        <div v-if="userStatus == true" class="mt-3 space-y-1 px-2">
          <a href="#" @click="authStore.handleLogout" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Log out</a>
        </div>
        <div v-else class="mt-3 space-y-1 px-2">
          <template v-for="item in navigation.filter((e) => e.display == 'right')" :key="item.name">
            <router-link v-if="item.auth == userStatus" :to="{name: item.name}" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">{{ item.name }}</router-link>            
          </template>
        </div>
      </div>
    </div>
  </nav>
  </template>