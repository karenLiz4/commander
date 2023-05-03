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
    <crearProducto @crearProducto="manejoCrearProducto" />
    <listarProductos ref="listComponent"/>
    <actualizarProducto @actualizarProducto="manejoActualizarProducto"/>
</template>