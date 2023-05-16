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
    <div class="wrapper bg-white">
        <div class="hp text-center pt-2">Listado</div>
        <div class="card-body">
        <div class="table-responsive">
        <table class="table table-borderless mb-0" v-if="productos">
            <thead>
                <tr>
                    <th scope="col">Nombre </th>
                    <th scope="col">Descripción </th>
                    <th scope="col">Precio </th>
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
</div>
</div>
</div></template>

<style>
table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}


thead th,
tbody th {
  color: black
}
tbody td {
  font-weight: 500;
  color: black
}
.card {
  border-radius: .5rem;
}
</style>