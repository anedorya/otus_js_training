<template>
    <div>

        <h2 @click="toggleText = !toggleText"> {{ title }} 
        <span class="arrow" :class="toggleText ? 'arrow-up' : ''">^</span> 
        </h2>

        <p v-show="toggleText"> {{ desc }} </p>

        <button :disabled="likes === 0" @click="decrementLikes">-</button>
        <span :class="likes >= 5 ? 'red' : 'green'" >Количество лайков: {{likes }}</span>
        <button @click="incrementLikes">+</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';


const props = defineProps({
    title: {
        type: String,
        required: true},
    desc: String,
    likes2: {
        type: Number,
        default: 0,
        required: false
        },
    })

const toggleText = ref(true);

const likes = ref(3);

const incrementLikes = () => likes.value++;
const decrementLikes = () => {
     if (likes.value > 0) {
    likes.value--
    }
}



</script>

<style scoped>
.arrow {
    transform: rotate(180deg);
    display: block;
    width: 20px;
    transition: transform 0.5s ease
}


.arrow-up {
    transform: rotate(0deg);
    display: block;
    width: 20px;
}

h2 {
    display: flex;
}

.red {
    color: red;
}

.green {
    color: green;
}

p {
    text-decoration: underline;
}

span {
    margin: 0 10px;
}
</style>