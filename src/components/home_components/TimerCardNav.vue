<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const types = [
    { key: 'pomodoro', label: 'Pomodoro' },
    { key: 'short', label: 'Short Break' },
    { key: 'long', label: 'Long Break' }
]

const type = computed({
    get() {
        return (route.query.type as string) ?? 'pomodoro'
    },
    set(value: string) {
        router.replace({ query: { type: value } })
    }
})
</script>

<template>
    <div class="flex h-[8%] items-center justify-center space-x-2">
        <button v-for="item in types" :key="item.key" @click="type = item.key"
            class="px-1 md:px-4 py-1 rounded-lg font-medium transition-colors text-nowrap not-md:text-xs" :class="type === item.key
                ? 'bg-green-600 text-white dark:bg-green-800'
                : 'bg-none text-green-700 hover:bg-green-200 dark:hover:bg-green-950'">
            {{ item.label }}
        </button>
    </div>
</template>
