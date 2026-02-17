<template>
    <div>
        <h2>Заполните форму</h2>
        <input type="text" v-model="textUser">
        <p v-if="!textUser">Вы ничего не ввели</p>
        <p v-else>Вы ввели {{ textUser }}</p>

    <select v-model="selected">
        <option value="Vue">Vue</option>
        <option value="React">React</option>
        <option value="Angular">Angular</option>
    </select>
    <p>Вы выбрали: {{ selected }}</p>
    </div>
</template>


<script setup>
import { ref } from 'vue';
const textUser = ref('')
const selected = ref('Vue')

</script>


<style scoped>
</style>
