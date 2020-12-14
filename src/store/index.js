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
        }
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