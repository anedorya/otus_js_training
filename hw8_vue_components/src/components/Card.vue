<template>
    <div>
        <h2>Билеты</h2>
        <p v-if="userAge >= 16">Фильмы от 16 лет</p>
        <p v-else-if="userAge >= 12">Фильмы от 12 лет</p>
        <p v-else>Фильмы для детей</p>
    </div>
</template>


<script setup>
import { ref } from 'vue';
const userAge = ref(10);
</script>


<style scoped>

</style>
