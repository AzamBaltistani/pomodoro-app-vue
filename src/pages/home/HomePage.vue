<script setup>
import TaskCard from '../../components/home_components/TaskCard.vue';
import TimerCard from '../../components/home_components/TimerCard.vue';

</script>

<template>
    <div class="flex not-md:flex-col w-full h-full">
        <div class="flex w-full md:w-2/3 h-full p-4 pr-2 md:p-8 md:pr-4">
            <TimerCard />
        </div>
        <div class="flex w-full md:w-1/3 h-full p-4 pl-2 md:p-8 md:pl-4">
            <TaskCard />
        </div>
    </div>
</template>