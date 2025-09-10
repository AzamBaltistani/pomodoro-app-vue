<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './layout/navbar/Navbar.vue';

</script>

<template>
  <div class="flex flex-col min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
    <div class="flex h-[8vh] w-full">
      <Navbar />
    </div>

    <main class="flex flex-col w-full h-[92vh]">
      <RouterView />
    </main>
  </div>
</template>