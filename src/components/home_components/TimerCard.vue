<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TimerCardNav from './TimerCardNav.vue'
import { RotateCcw } from 'lucide-vue-next'
import { useTimerStore } from '../../stores/timer'


const route = useRoute()
const timerStore = useTimerStore()

const timeLeft = ref(timerStore.presets['pomodoro'])
const isRunning = ref(false)
let intervalId: number | null = null

type PresetType = keyof typeof timerStore.presets // "pomodoro" | "short" | "long"

watch(
    () => route.query.type,
    (newType) => {
        const type = (newType as PresetType) || 'pomodoro'
        resetTimer(type)
    },
    { immediate: true }
)

const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

function startTimer() {
    if (isRunning.value) return
    isRunning.value = true
    intervalId = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        } else {
            stopTimer()
        }
    }, 1000) as unknown as number
}

function stopTimer() {
    isRunning.value = false
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

function toggleTimer() {
    isRunning.value ? stopTimer() : startTimer()
}

function resetTimer(type: PresetType) {
    stopTimer()
    timeLeft.value = timerStore.presets[type] ?? timerStore.presets['pomodoro']
}

onUnmounted(() => stopTimer())
</script>

<template>
    <div
        class="flex flex-col w-full h-full bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 border border-neutral-300 rounded-2xl p-2 md:p-6 items-center justify-between">
        <TimerCardNav />

        <div class="flex-1 flex items-center justify-center w-full">
            <span class="font-orbitron font-bold select-none transition-all"
                :class="isRunning ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-500'"
                style="font-size: min(13vw, 18vh); line-height: 1;">
                {{ formattedTime }}
            </span>
        </div>

        <div class="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
            <button @click="toggleTimer"
                class="px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-3 not-sm:text-xs rounded-2xl font-semibold text-white transform transition-all duration-300"
                :class="isRunning
                    ? 'bg-red-500 hover:bg-red-600 dark:hover:bg-red-400 scale-105'
                    : 'bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 scale-105'">
                {{ isRunning ? 'Stop' : 'Start' }}
            </button>

            <button @click="resetTimer((route.query.type as PresetType) || 'pomodoro')"
                class="p-2 md:p-3 lg:p-3 rounded-full text-black dark:text-white transition hover:-rotate-12">
                <RotateCcw class="w-2 h-2 md:w-4 md:h-4 lg:w-6 lg:h-6" />
            </button>
        </div>
    </div>
</template>
