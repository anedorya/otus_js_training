<template>
   <div class="card" >
        <h3 class="card-title"> {{ title }} </h3>
        <p class="card-text"> {{ desc }} </p>
        <p> {{ price }} руб </p>
        <p> id: {{ id }} </p>
        <p> Количество: {{ quantity }} </p>
        <button class="card-btn" @click="$emit('click-decrement', id)">-1</button>
        <span>  Изменить кол-во  </span>
        <button class="card-btn" @click="$emit('click-add', id)">+1</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';


const props = defineProps({
    id: Number,
    title: {
        type: String,
        required: true},
    desc: String,
    price: {
        type: Number,
        default: 0,
        required: false
        },
    quantity: Number
    })

defineEmits(['click-add', 'click-decrement']);

function clickButton() {
    console.log('Товар добавлен в корзину')
}

</script>

<style scoped>
<style scoped>
.card {
  width: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.3s;
  background-color: white;
  border: 1px solid #a8a4a4;

}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img {
  width: 100px;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
  color: #2334ca;
}

.card-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  
}

.card-btn {
  
  color: #2334ca;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>