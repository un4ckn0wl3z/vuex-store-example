import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // == data
        products: [] // available for every components
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
        addToCart (context, product) {
            if (product.inventory > 0) {
                context.commit('pushProductToCart', product)
            } else {
                // show out of stock message
                
            }
        }
    },
    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})