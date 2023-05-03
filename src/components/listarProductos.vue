<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

let productos = ref([])
const fetchProductos = async () => {
    const { data, error } = await supabase
        .from('productos')
        .select()
        .order('created_at')

    productos.value = data
}

onMounted(() => {
    fetchProductos()
})

defineExpose({
    fetchProductos
})
</script>

<template>
    <div>
        <h1>Listado</h1>
        <table v-if="productos">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="producto in productos" :key="producto.id">
                    <td>{{ producto.nombre }}</td>
                    <td>{{ producto.descripcion }}</td>
                    <td>{{ producto.precio }}</td>
                </tr>
            </tbody>
    </table>
    <div v-else>No hay ninguna producto en la base de datos.</div>
</div></template>