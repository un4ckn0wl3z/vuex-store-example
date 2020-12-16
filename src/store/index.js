import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // == data
        products: [], // available for every components
        cart: []
    },
    getters: { // == computed
        availableProducts (state, getters) {
            return state.products.filter(product => product.inventory > 0)
        },
        cartProducts (state, getters) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal (state, getters) {
            let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total
        },
    },
    actions: { // == method, usaully async
        fetchProducts (context) {
            return new Promise((resolve, reject) => {
            // context is same as store instance
            // make a call
            shop.getProducts(products => {
                context.commit('setProducts', products)
                resolve()
              })
            })
        },
        addProductToCart (context, product) {
            
            if (product.inventory > 0) {
                const cartItem = context.state.cart.find(item => item.id === product.id)
                if (!cartItem) {
                    // pushProductToCart
                    context.commit('pushProductToCart', product.id)
                } else {
                    // incrementItemQualtity
                    context.commit('incrementItemQualtity', cartItem)
                }
                context.commit('decrementProductInventory', product)
            } else {
                
            }

        }
    },
    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        },

        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQualtity (state, cartItem) {
            cartItem.quantity++
        },
        decrementProductInventory (state, product) {
            product.inventory--
        } 
    }
})