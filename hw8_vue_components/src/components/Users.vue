<template>
    <div >
        <div class="user" v-for="user in users" :key="user.id">
        <h3 class="user__name">Имя: {{ user.name }}</h3>
        <p class="user__age">Возраст: {{ user.age }}</p>
            
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';


const users = ref([
    {id:1, name: 'Vasya', age:25, isMarried: true},
    {id:2, name: 'Petya', age:25, isMarried: true},
    {id:3, name: 'Masha', age:31, isMarried: true},
]);
</script>


<style scoped>

</style>