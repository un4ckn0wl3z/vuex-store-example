<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://loading.io/mod/spinner/spinner/sample.gif">
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">{{product.title}} - {{product.price | currency }} -  {{product.inventory}} 
        <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('products', {
      products: state => state.items
    }),
    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    }),
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    })
  },
  created () {
    this.loading = true
    this.fetchProducts().then(() => {
          this.loading = false
    })
  }
}
</script>