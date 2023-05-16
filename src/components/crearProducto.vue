<script setup>
import { supabase } from '../services/supabase'
import Formulario from './formulario.vue'
import { ref } from 'vue'



//variable productos
const emit = defineEmits(['crearProducto'])
let producto = ref({
    nombre : '',
    descripcion : '',
    precio : ''
})


//insert
const submit = async () => {
  const { data, error } = await supabase
    .from('productos')
    .insert({ nombre: producto.value.nombre, descripcion: producto.value.descripcion, precio: producto.value.precio })
    .select()

  if (error) {
    console.log(error);
  }
  else {
    console.log('se ha creado el producto' +  data + 'correctamente');
    emit('crearProducto')
  }
}

</script>

<template>
  
  <div class="wrapper bg-white">
    <Formulario v-model="producto"></Formulario>
    <button class="btn btn-block text-center my-4"  @click="submit">Aceptar</button>
  </div>

</template>

<style>
</style>
