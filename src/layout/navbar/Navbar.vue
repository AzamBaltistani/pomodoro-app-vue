<script setup lang="ts">
import NavElement from './NavElement.vue';
import { AlarmClockCheck, Settings } from 'lucide-vue-next';
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'

const isDark = useDark()
console.log(isDark.value)
const toggleDark = useToggle(isDark)

</script>
<template>
    <div class="flex h-full w-full items-center justify-center ">
        <div class="flex w-fit gap-2 md:gap-4 lg:gap-8 items-center justify-center p-2 dark:text-white">
            <div class="flex gap-2">
                <NavElement link="/" title="Focused Timer">
                    <AlarmClockCheck /> <span class="not-sm:hidden"> Focused Timer</span>
                </NavElement>
                <NavElement link="settings" title="Settings">
                    <Settings class="p-0.5" /> <span class="not-sm:hidden">Settings</span>
                </NavElement>
                <!-- <NavElement link="statistics" title="Statistics">
                    <ChartArea class="p-0.5" /> <span class="not-sm:hidden">Statistics</span>
                </NavElement> -->

                <button @click="toggleDark()"
                    class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span v-if="isDark">
                        <Sun class="w-5 h-5" />
                    </span>
                    <span v-else>
                        <Moon class="w-5 h-5" />
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>