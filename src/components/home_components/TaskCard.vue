<script setup lang="ts">
import { ref } from 'vue'
import { Trash2, Plus, CheckCircle2 } from 'lucide-vue-next'

interface Task {
    id: number
    text: string
    done: boolean
}

const tasks = ref<Task[]>([])
const newTask = ref('')
let nextId = 1

function addTask() {
    const text = newTask.value.trim()
    if (text) {
        tasks.value.push({ id: nextId++, text, done: false })
        newTask.value = ''
    }
}

function removeTask(id: number) {
    tasks.value = tasks.value.filter(t => t.id !== id)
}

function toggleComplete(id: number) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
}
</script>

<template>
    <div
        class="flex flex-col h-full w-full p-2 md:p-6 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-2xl dark:text-white">
        <h2 class="font-semibold text-lg mb-4">Tasks</h2>

        <div class="flex items-center space-x-2 mb-4">
            <input v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Add a new task..."
                class="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
            <button @click="addTask" class="p-2 bg-green-500 text-white rounded-xl shadow  transition"
                :class="newTask ? 'hover:bg-green-600' : 'hover:bg-green-500 cursor-not-allowed'">
                <Plus class="w-5 h-5" />
            </button>
        </div>

        <div class="pr-1 [&::-webkit-scrollbar]:[scrollbar-gutter:stable] overflow-y-auto">
            <ul class="space-y-2 mb-6">
                <li v-for="task in tasks.filter(t => !t.done)" :key="task.id"
                    class="flex items-center justify-between bg-white dark:bg-black border border-neutral-200 dark:border-neutral-600  rounded-xl px-3 py-2 shadow-sm">
                    <span class="text-neutral-800 dark:text-neutral-300">{{ task.text }}</span>
                    <div class="flex items-center space-x-2">
                        <button @click="toggleComplete(task.id)"
                            class="p-1 text-green-600 hover:text-green-800 transition">
                            <CheckCircle2 class="w-5 h-5" />
                        </button>
                        <button @click="removeTask(task.id)" class="p-1 text-red-500 hover:text-red-700 transition">
                            <Trash2 class="w-5 h-5" />
                        </button>
                    </div>
                </li>
            </ul>

            <div v-if="tasks.some(t => t.done)" class=" pt-4">
                <h3 class="font-semibold text-md mb-2 text-neutral-600">Completed</h3>
                <ul class="space-y-2">
                    <li v-for="task in tasks.filter(t => t.done)" :key="task.id"
                        class="flex items-center justify-between bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 rounded-xl px-3 py-2 shadow-sm">
                        <span class="text-neutral-500 dark:text-neutral-400 line-through">{{ task.text }}</span>
                        <button @click="removeTask(task.id)" class="p-1 text-red-400 hover:text-red-600 transition">
                            <Trash2 class="w-5 h-5" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
