<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'


//variables usuario
// let username = ref('')
// let email = ref('')
// let password = ref('')

//variable productos
let nombre = ref('')
let descripcion = ref('')
let precio = ref('')

//fetch
// const { data, error } = await supabase
//   .from('countries')
//   .select()



//insert
// const submit = async () => {
//   const { data, error } = await supabase
//     .from('usuarios')
//     .insert({ username: username.value, email: email.value, email: password.value })
//     .select()

//   if (error) {
//     console.log(error)
//   }
//   else {
//     console.log('se ha creado el usuario' + data + 'correctamente')
//   }
// }


//insert
const submit = async () => {
  const { data, error } = await supabase
    .from('productos')
    .insert({ nombre: nombre.value, descripcion: descripcion.value, precio: precio.value })
    .select()

  if (error) {
    console.log(error)
  }
  else {
    console.log('se ha creado el producto' + nombre.value + 'correctamente')
  }
}


</script>

<template>
  <!-- formulario registro
    <h1>Registrar</h1>
    <div class="form-registrar">
      <label for="username">Nombre de Usuario</label>
      <input v-model="username" type="text" name="username" required />
    </div>
    <div class="form-registrar">
      <label for="email">Correo Electrónico</label>
      <input v-model="email" type="email" name="email" required />
    </div>
    <div class="form-registrar">
      <label for="password">Contraseña</label>
      <input v-model="password" type="password"  name="password" required />
    </div>
    <button @click="submit">Registrarse</button> -->


      <h1></h1>
    <div class="form-registrar">
      <label for="nombre">Nombre de producto:</label>
      <input v-model="nombre" type="text" name="nombre" required />
    </div>
    <div class="form-registrar">
      <label for="descripcion">Descripcion:</label>
      <input v-model="descripcion" type="text" name="descripcion" required />
    </div>
    <div class="form-registrar">
      <label for="precio">Precio:</label>
      <input v-model="precio" type="float"  name="precio" required />
    </div>
    <button @click="submit">Aceptar</button>


</template>

<!-- <style scoped></style> -->
