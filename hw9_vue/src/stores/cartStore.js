import { defineStore } from "pinia";
import { ref, computed } from "vue";


export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])

    const addToCart = (product) => {
        const productInCart = cartItems.value.find(item => item.id === product.id)
        if (productInCart) {
            productInCart.quantity +=1
        } else {
            cartItems.value.push({...product, quantity: 1})
        }

        //cartItems.value.push(product)
    }

    const incrementQuantity = (productId) => {
        const productInCart = cartItems.value.find(item => item.id === productId)
        if (productInCart) {
            productInCart.quantity +=1
        } 
    }

    const decrementQuantity = (productId) => {
        const productInCart = cartItems.value.find(item => item.id === productId)
        if (!productInCart) return;
        productInCart.quantity--
        if (productInCart.quantity === 0) removeFromCart(productId)
        }
    

    const removeFromCart = (productId) => {       
        cartItems.value = cartItems.value.filter(item => item.id !== productId)
    }

    const totalPrice = computed(() => {
        return cartItems.value.reduce((total,item) => total + item.price * item.quantity, 0)
    })


    return {cartItems, addToCart, incrementQuantity, decrementQuantity, removeFromCart, totalPrice}
})
