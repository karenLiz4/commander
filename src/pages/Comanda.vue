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
    <div class="wrapper-c">
        <div class="hp text-center pt-2">Menú</div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-borderless mb-0" v-if="productos">
                    <thead>
                        <tr>
                            <th scope="col">Entrantes </th>
                            <th scope="col">Platos </th>
                            <th scope="col">Postres </th>
                            <th scope="col">Bebidas </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="producto in productos" :key="producto.id" >
                            <td scope="col" v-if="producto.descripcion === 'Entrante'"><button class="btn btn-block">{{ producto.nombre }}</button></td>
                            <td scope="col" v-else-if="producto.descripcion === 'Plato'"><button class="btn btn-block row">{{ producto.nombre }}</button></td>
                            <td scope="col" v-else-if="producto.descripcion === 'Bebida'"><button class="btn btn-block">{{ producto.nombre }}</button></td>
                            <td scope="col" v-else-if="producto.descripcion === 'Postre'"><button class="btn btn-block">{{ producto.nombre }}</button></td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>No hay ninguna producto en la base de datos.</div>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper-c {
  max-width: 60%;
  border-radius: 10px;
  margin: 5% auto;
  padding: 60px 50px;
  background-color: white;
  box-shadow: 20px 20px 80px rgb(206, 206, 206)
}
</style>