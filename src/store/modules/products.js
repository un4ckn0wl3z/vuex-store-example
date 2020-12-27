import shop from '@/api/shop'

export default {
    state: {
        items: []
    },
    getters: {
        availableProducts (state, getters) {
            return state.items.filter(product => product.inventory > 0)
        },
        productIsInStock () {
            return (product) => {
                return product.inventory > 0
            }
        },
    },
    mutations: {
        setProducts (state, products) {
            // update products
            state.items = products
        },
        decrementProductInventory (state, product) {
            product.inventory--
        } 
    },
    actions: {
        fetchProducts (context) {
            return new Promise((resolve, reject) => {
            // context is same as store instance
            // make a call
            shop.getProducts(products => {
                context.commit('setProducts', products)
                resolve()
              })
            })
        }
    }
}