<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'

const camarero = ref('')
const nMesa = ref('')
const producto = ref('')
const cantidad = ref('')

// Obtener la lista de productos existentes
const { data: productosData, error: productosError } = await supabase
  .from('productos')
  .select('nombre')

const productos = ref(productosData?.map(item => item.nombre) || [])

const submitComanda = async (event) => {
  event.preventDefault()

  // Guardar la comanda en la base de datos
  const { data, error } = await supabase
    .from('comandas')
    .insert({
      camarero: camarero.value,
      n_mesa: nMesa.value,
      producto: producto.value,
      cantidad: cantidad.value
    })

  if (error) {
    console.error(error)
  } else {
    console.log('Comanda guardada:', data)
    resetForm()
  }
}

const resetForm = () => {
  camarero.value = ''
  nMesa.value = ''
  producto.value = ''
  cantidad.value = ''
}
</script>

<template>
  <div>
    <h2>Crear Comanda</h2>
    <form @submit="submitComanda">
      <div>
        <label for="camarero">Camarero:</label>
        <input type="text" v-model="camarero" required>
      </div>
      <div>
        <label for="n_mesa">Número de Mesa:</label>
        <input type="number" v-model="nMesa" required>
      </div>
      <div>
        <label for="producto">Producto:</label>
        <select v-model="producto" required>
          <option v-for="item in productos" :value="item">{{ item }}</option>
        </select>
      </div>
      <div>
        <label for="cantidad">Cantidad:</label>
        <input type="number" v-model="cantidad" required>
      </div>
      <button type="submit">Guardar Comanda</button>
    </form>
  </div>
</template>