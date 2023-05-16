<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'
import eliminarProducto from './eliminarProducto.vue'
import formulario from './formulario.vue';

let productoSelec = ref(null)
let productos = ref([])
const emit = defineEmits(['actualizarProducto'])

onMounted(async () => {
  // Recuperar las peliculas desde la bd supabase
  const { data, error } = await supabase
    .from('productos')
    .select()
    .order('created_at')

  productos.value = data
})

const update = async (producto) => {
  // Actualizamos la película con sus nuevos datos a la bd
  const { data, error } = await supabase
    .from('productos')
    .update({ nombre: producto.nombre, descripcion: producto.descripcion, precio: producto.precio})
    .eq('id', producto.id)
    .select()

  if (error) {
    console.log(error)
  } else {
    console.log('Se ha actualizado este producto: ', data)
    resetProductoSelec()
    emit('actualizarProducto', data)
  }
}


const resetProductoSelec = () => {
    productoSelec.value = null
}
</script>

<template>
<div class="wrapper bg-white">
  <div class="hp text-center pt-2">Editar o eliminar un producto</div>
      <div>
        <label for="productoSelec">Selecciona el producto</label>
        <select name="productoSelec" id="productoSelec" v-model="productoSelec">
          <option v-for="producto in productos" :key="producto.id" :value="producto">{{ producto.nombre }}</option>
        </select>
        <div v-if="productoSelec">
          <formulario v-model="productoSelec"/>
          <div>
            <button  @click="update(productoSelec)">Actualizar</button>
            <eliminarProducto @eliminarProducto="resetProductoSelec" :productoSelec="productoSelec" />
          </div>
        </div>
      </div>
    </div>
</template>