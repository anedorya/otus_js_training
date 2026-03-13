<template>
<div>
    <h2>Выбери, над какими привычками ты будешь работать</h2>
    <div class="habbits" >
        <Habbit 
        v-for="item in habbitsStore.habbitsList" :key="item.id" 
        :habbit="item" 
        />
        
    </div
    </div>
        <form class="form" @submit.prevent="onSubmit">
        <input class="input" v-model="newHabbitTitle" 
        type="text" 
        placeholder="Название привычки" 
        required />
        <input class="input" v-model="newHabbitDesc" 
        type="text"
        placeholder="Описание"></input>
        <button type="submit">Добавить привычку</button>
        </form>

</div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue'

import Habbit from './Habbit.vue'

import { useHabbitsStore } from '../stores/habbitsStore';
const habbitsStore = useHabbitsStore();

const newHabbitTitle = ref('');
const newHabbitDesc = ref('');

const onSubmit = () => {
  habbitsStore.addHabit(newHabbitTitle.value, newHabbitDesc.value);
  newHabbitTitle.value = '';
  newHabbitDesc.value = '';
};

</script>

<style scoped>

.habbits {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.form {
  display: flex;
  gap: 12px;              /* Отступы между полями */
  flex-wrap: wrap;
  border-radius: 8px;
}

.textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit; /* Чтобы шрифт был как у остального сайта */
}
</style>
