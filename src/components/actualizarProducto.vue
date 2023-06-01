<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'
import eliminarProducto from './eliminarProducto.vue'
import formulario from './formulario.vue';

let productoSelec = ref(null)
let productos = ref([])
const emit = defineEmits(['actualizarProducto'])

onMounted(async () => {
  const { data, error } = await supabase
    .from('productos')
    .select()
    .order('created_at', { ascending: false })

  productos.value = data
})

const update = async (producto) => {
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
        <label class = "h7" for="productoSelec">Selecciona el producto</label>
        <select class="form-select" name="productoSelec" id="productoSelec" v-model="productoSelec" >
          <option v-for="producto in productos" :key="producto.id" :value="producto">{{ producto.nombre }}</option>
        </select>
        <div v-if="productoSelec">
          <formulario v-model="productoSelec"/>
          <div>
            <button  class="btn btn-block text-center my-4" @click="update(productoSelec)">Actualizar</button>
            <eliminarProducto class="btn btn-block-eliminar text-center my-4" @eliminarProducto="resetProductoSelec" :productoSelec="productoSelec" />
          </div>
        </div>
      </div>
    </div>
</template>

<style>
.h7 {
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px
}


.btn.btn-block-eliminar {
    border-radius: 20px;
    background-color: red;
    color: #fff;
    display: block;
    padding: 0.5rem 1rem;
    width: 150px;
    margin: 0 auto;
}

.btn.btn-block-eliminar:hover {
    background-color: #CC0000;
    color: #fff;
}

</style>