import shop from '@/api/shop'

export default {
    state: {
        items: [],
        checkoutStatus: null
    },
    getters: {
        cartProducts (state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal (state, getters, rootState) {
            let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total
        }
    },
    mutations: {
        pushProductToCart (state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQualtity (state, cartItem) {
            cartItem.quantity++
        },
        setCheckoutStatus (state, status) {
            state.checkoutStatus = status
        }, 
        emptyCart (state) {
            state.items = []
        }
    },
    actions: {
        addProductToCart (context, product) {
        
            if (context.getters.productIsInStock(product)) {
                const cartItem = context.state.items.find(item => item.id === product.id)
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
    
        },
        checkout (context) {
            shop.buyProducts(context.state.items, () => {
                context.commit('emptyCart')
                context.commit('setCheckoutStatus', 'success')
            }, () => {
                context.commit('setCheckoutStatus', 'fail')
            })
        }
    }
}