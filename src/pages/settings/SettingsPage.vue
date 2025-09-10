<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Save } from 'lucide-vue-next'
import { useTimerStore } from '../../stores/timer'
import DurationInput from '../../components/input/DurationInput.vue'

const timerStore = useTimerStore()
const router = useRouter()

// Local editable values (convert seconds → minutes)
const pomodoro = ref(timerStore.presets.pomodoro / 60)
const short = ref(timerStore.presets.short / 60)
const long = ref(timerStore.presets.long / 60)

// Track which input was last changed
const lastChanged = ref<'pomodoro' | 'short' | 'long' | null>(null)

function saveSettings() {
    timerStore.updatePreset('pomodoro', pomodoro.value)
    timerStore.updatePreset('short', short.value)
    timerStore.updatePreset('long', long.value)

    // Redirect to home with lastChanged type
    if (lastChanged.value) {
        router.push(`/?type=${lastChanged.value}`)
    } else {
        router.push('/')
    }
}
</script>

<template>
    <div class="flex flex-col h-fit w-full sm:w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 mx-auto">
        <div
            class="p-4 md:p-6 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-2xl space-y-6">
            <h2 class="font-semibold text-lg text-center dark:text-white">Settings</h2>

            <!-- Timer Inputs -->
            <div class="space-y-4">
                <DurationInput label="Pomodoro (minutes)" v-model="pomodoro"
                    @update:modelValue="lastChanged = 'pomodoro'" />
                <DurationInput label="Short Break (minutes)" v-model="short"
                    @update:modelValue="lastChanged = 'short'" />
                <DurationInput label="Long Break (minutes)" v-model="long" @update:modelValue="lastChanged = 'long'" />
            </div>

            <!-- Save Button -->
            <div class="flex justify-end">
                <button @click="saveSettings"
                    class="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
                    <Save class="w-5 h-5" />
                    <span>Save</span>
                </button>
            </div>
        </div>
    </div>
</template>
