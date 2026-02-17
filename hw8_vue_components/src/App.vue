<script setup>
import { ref } from 'vue';
import News from './components/News.vue'
import Product from './components/Product.vue'

const dataNews = ref([
  {
    id: 1,
    title: 'Новость 1',
    desc: 'Описание 1',
  },
  {
    id: 2,
    title: 'Новость 2',
    desc: 'Описание 2',
  },
  {
    id: 3,
    title: 'Новость 3',
    desc: 'Описание 3',
    }
])

const dataProducts = ref([
  {
    id: 1,
    title: 'Товар 1',
    desc: 'Описание 1',
    price: 1000,
    quantity: 10
  },
  {
    id: 2,
    title: 'Товар 2',
    desc: 'Описание 2',
    price: 2000,
    quantity: 5
  },
  {
    id: 3,
    title: 'Товар 3',
    desc: 'Описание 3',
    price: 0,
    quantity: 3
    }
])

function addId(id) {
  console.log(`Добавлено в корзину ${id}`);
}

function decrementQuantity(id) {
    dataProducts.value.forEach(product => {
      if (product.id === id) {
        if (product.quantity > 0) {
          product.quantity--
        }
      }
    });
}

function addQuantity(id) {
    dataProducts.value.forEach(product => {
      if (product.id === id) {
          product.quantity++
      }
    });
}


</script>

<template>
<div class="content" >
  <div>  
    <h1>Мой сайт на Vue</h1> 
  </div>
  <div>  
    <h2>Каталог</h2> 
  </div>
  <div class="catalog" >

  <Product 
    v-for="product in dataProducts" 
    :key="product.id"
    :title="product.title"
    :desc="product.desc"
    :price="product.price"
    :id='product.id'
    @click-decrement='decrementQuantity'
    @click-add='addQuantity'
    :quantity="product.quantity"
    />
  </div>

  <div>
  <h2>Новостной портал</h2>
  <News 
    v-for="(item, index) in dataNews" 
    :key="index"
    :title="item.title"
    :desc="item.desc"
    :index='item.id'
    />
  </div>

</div>
</template>

<style scoped>
.catalog {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.content {
  width: 1200 px;
}
</style>
