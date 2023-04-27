<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'


//variables usuario
// let username = ref('')
// let email = ref('')
// let password = ref('')

//variable productos
let nombre = ref('');
let descripcion = ref('');
let precio = ref('');
let productos = ref([]);
let selectedProduct = ref(null);


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
    console.log(error);
  }
  else {
    console.log('se ha creado el producto' + nombre.value + 'correctamente');
  }
}


//fetch
onMounted(async () => {
  const { data, error } = await supabase
    .from('productos')
    .select()

  if (error) {
    console.log(error);
  }

  productos.value = data;
})


//update and delete
const update = async (producto) => {
  const { data, error } = await supabase
    .from('productos')
    .update({ nombre: producto.nombre, descripcion: producto.descripcion, precio: producto.precio })
    .eq('id', producto.id)
    .select()

    
  if (error) {
    console.log(error);
  }
  else{
    console.log(data)
    selectedProduct.value=null;
  }
}

const deleteProducto = async (id) => {
  const { data, error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error);
  }
  else{
    selectedProduct.value=null;
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


  <div>
    <h1>Crear producto</h1>
    <div class="form-producto">
      <label for="nombre">Nombre de producto:</label>
      <input v-model="nombre" type="text" name="nombre" required />
    </div>
    <div class="form-producto">
      <label for="descripcion">Descripción:</label>
      <input v-model="descripcion" type="text" name="descripcion" required />
    </div>
    <div class="form-producto">
      <label for="precio">Precio:</label>
      <input v-model="precio" type="float" name="precio" required />
    </div>
    <button @click="submit">Aceptar</button>
  </div>


  <div>
    <h1>Listado de productos</h1>
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
    <div v-else>No hay ningún producto en la base de datos</div>
  </div>

  <div>
    <h1>Editar o eliminar</h1>
    <label for="selectedProduct">Seleccionar producto</label>
    <select name="selectedProduct" id="selectedProduct" v-model="selectedProduct">
      <option v-for="producto in productos" :key="producto.id" :value="producto">{{ producto.nombre }}</option>
    </select>
    <div v-if="selectedProduct">
      <div class="form-producto">
        <label for="selectedNombre">Nombre de producto:</label>
        <input v-model="selectedProduct.nombre" type="text" name="selectedNombre" required />
      </div>

      <div class="form-producto">
        <label for="selectedDescripcion">Descripción:</label>
        <input v-model="selectedProduct.descripcion" type="text" name="selectedDescripcion" required />
      </div>

      <div class="form-producto">
        <label for="selectedPrecio">Precio:</label>
        <input v-model="selectedProduct.precio" type="float" name="selectedPrecio" required />
      </div>

      <div>
      <button  @click="update(selectedProduct)">Actualizar</button>
      <button  @click="deleteProducto(selectedProduct.id)">Eliminar</button>
    </div>
    </div>

    
  </div>
</template>

<!-- <style scoped></style> -->
