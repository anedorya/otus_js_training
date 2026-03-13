import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductsStore = defineStore('products', () => {

const productList = ref([])
const isLoading = ref(false)

async function fetchProducts() {
  isLoading.value = true
try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    productList.value = data
} catch (error) {
  console.error('Error fetching products: ', error)
} finally {
  isLoading.value = false
}

}

// const productList = ref([
//   {
//     id: 1,
//     title: 'Рзмашки',
//     desc: 'Описание 1',
//     price: 1000,
//     item_quantity: 10
//   },
//   {
//     id: 2,
//     title: 'Розы',
//     desc: 'Описание 2',
//     price: 2000,
//     item_quantity: 5
//   },
//   {
//     id: 3,
//     title: 'Цветы 3',
//     desc: 'Описание 3',
//     price: 0,
//     item_quantity: 3
//     }
// ])

    const allProducts = computed(() => productList.value)



    return {productList, allProducts, fetchProducts, isLoading}
})
