<script setup lang="ts">
import { RouterLink } from 'vue-router';


defineProps<{
    link: string
}>()

</script>

<template>
    <RouterLink :to="link"
        class="flex items-center justify-center gap-1 md:gap-2 font-semibold px-3 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 select-none">
        <slot />
    </RouterLink>
</template>