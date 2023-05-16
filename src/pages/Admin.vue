<script setup>
import { ref } from 'vue'
import crearProducto from '../components/crearProducto.vue';
import listarProductos from '../components/listarProductos.vue';
import actualizarProducto from '../components/actualizarProducto.vue'

const manejoCrearProducto = () => {
  listComponent.value.fetchProductos()
}

const manejoActualizarProducto = (data) => {
  listComponent.value.fetchProductos()
}

const listComponent = ref(null)

</script>

<template>
  <div class="row">
    <div class="col">
    <crearProducto @crearProducto="manejoCrearProducto" />
  </div>
  <div class="col">
    <listarProductos ref="listComponent"/>
  </div>
  <div class="col">
    <actualizarProducto @actualizarProducto="manejoActualizarProducto"/>
  </div>
  </div>
</template>