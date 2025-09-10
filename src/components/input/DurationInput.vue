<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    label: string
    modelValue: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

function update(val: number) {
    if (val < 1) return
    emit('update:modelValue', val)
}

function increase() {
    update(props.modelValue + 5)
}

function decrease() {
    update(props.modelValue - 5)
}
</script>

<template>
    <div class="flex flex-col items-center w-full space-y-3">
        <!-- Label -->
        <label class="text-sm font-semibold tracking-wide text-neutral-700 dark:text-neutral-200">
            {{ label }}
        </label>

        <!-- Control wrapper -->
        <div
            class="flex items-center justify-center w-full max-w-sm p-2 bg-white dark:bg-black rounded-2xl border border-neutral-200 dark:border-neutral-600 space-x-2">
            <!-- Decrease -->
            <button @click="decrease"
                class="dark:text-neutral-300 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 active:scale-95 transition">
                -5
            </button>

            <!-- Input -->
            <input :value="modelValue" @input="update(($event.target as HTMLInputElement).valueAsNumber)" type="number"
                min="1"
                class="w-20 text-center px-3 py-2 rounded-xl outline-0 border-0 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-neutral-50 text-neutral-800 dark:bg-neutral-600 dark:text-neutral-100 transition" />

            <!-- Increase -->
            <button @click="increase"
                class="dark:text-neutral-300 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 active:scale-95 transition">
                +5
            </button>
        </div>
    </div>
</template>
