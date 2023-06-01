<script setup>
import { supabase } from '../services/supabase'
import Formulario from './formulario.vue'
import { ref } from 'vue'



//variable productos
const emit = defineEmits(['crearProducto'])
let producto = ref({
  nombre: '',
  descripcion: '',
  precio: ''
})


const errorProducto = ref('')

//insert
const submit = async () => {


  // Validar campos requeridos
  if (!producto.value.nombre || !producto.value.descripcion || !producto.value.precio) {
    errorProducto.value = 'Por favor, complete todos los campos'
    return
  }

  if (!/^[0-9]+(\.[0-9]+)?$/.test(producto.value.precio)) {
    errorProducto.value = 'El precio solo debe incluir números enteros o decimales separado con punto. Ejemplo: 8.50';
    return;
  }

  const { data, error } = await supabase
    .from('productos')
    .insert({ nombre: producto.value.nombre, descripcion: producto.value.descripcion, precio: producto.value.precio })
    .select()

  if (error) {
    console.log(error);
  }
  else {
    console.log('se ha creado el producto' + data + 'correctamente');

    errorProducto.value = ''

    //dejar los campos vacios
    producto.value = {
      nombre: '',
      descripcion: '',
      precio: ''
    };

    emit('crearProducto')
  }
}

</script>

<template>
  <div class="wrapper bg-white">
    <Formulario v-model="producto"></Formulario>
    <div class="text-center text-danger">{{ errorProducto }}</div>
    <button class="btn btn-block text-center my-4" @click="submit">Aceptar</button>
  </div>
</template>

<style></style>
