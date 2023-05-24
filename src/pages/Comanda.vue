<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'


let productos = ref([])
let nombreBotonesSeleccinados = ref([])


//variable comanda
const emit = defineEmits(['crearComanda'])
let comanda = ref({
  camarero: '',
  nMesa: '',
  producto: ''
})

//funciones
const fetchProductos = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select()
    .order('created_at')

  productos.value = data
}

const agregarNombreComanda = (nombre) => {
  nombreBotonesSeleccinados.value.push(nombre)
}


//insert
const submitComanda = async () => {
  //guarda los productos de la comanda en la base de datos y los concatena
  const productosSeleccionados = nombreBotonesSeleccinados.value.join(', ')
  comanda.value.producto = productosSeleccionados

  const { data, error } = await supabase
    .from('comandas')
    .insert({ camarero: comanda.value.camarero, nMesa: comanda.value.nMesa, producto: comanda.value.producto })
    .select()

  if (error) {
    console.log(error);
  }
  else {
    console.log('se ha creado la comanda' + data + 'correctamente');

    const comandaTxt = `Camarero: ${comanda.value.camarero}\nNúmero de mesa: ${comanda.value.nMesa}\nProductos: ${comanda.value.producto}\n\n`;

    // Crear el contenido del archivo
    const fileContent = new Blob([comandaTxt], { type: 'text/plain' });

    // Crear un enlace de descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(fileContent);
    downloadLink.download = 'comanda.txt';

    // Simular clic en el enlace para descargar el archivo
    downloadLink.click();



    //dejar los campos vacios
    comanda.value = {
      camarero: '',
      nMesa: '',
      producto: ''
    };
    nombreBotonesSeleccinados.value = [];
    emit('crearComanda')

  }
}


onMounted(() => {
  fetchProductos()
})

// Exponer las funciones para poder llamarlas desde la plantilla
defineExpose({
  fetchProductos,
  agregarNombreComanda
})

// Método para imprimir la página
// const printWindow = () => {
//   window.print();
// }




</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="wrapper-m">
          <div class="hp text-center pt-2">Menú</div>
          <div class="card-body">

            <div v-if="productos">
              <div class="row">

                <div class="col">
                  <h4 class="text-center mb-4">Entrantes</h4>
                  <div v-for="producto in productos" :key="producto.id">
                    <div v-if="producto.descripcion === 'Entrante'">
                      <button class="btn btn-block mb-2" @click="agregarNombreComanda(producto.nombre)">{{
                        producto.nombre }}</button>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <h4 class="text-center mb-4">Platos</h4>
                  <div v-for="producto in productos" :key="producto.id">
                    <div v-if="producto.descripcion === 'Plato'">
                      <button class="btn btn-block mb-2" @click="agregarNombreComanda(producto.nombre)">{{
                        producto.nombre }}</button>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <h4 class="text-center mb-4">Postres</h4>
                  <div v-for="producto in productos" :key="producto.id">
                    <div v-if="producto.descripcion === 'Postre'">
                      <button class="btn btn-block mb-2" @click="agregarNombreComanda(producto.nombre)">{{
                        producto.nombre }}</button>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <h4 class="text-center mb-4">Bebidas</h4>
                  <div v-for="producto in productos" :key="producto.id">
                    <div v-if="producto.descripcion === 'Bebida'">
                      <button class="btn btn-block mb-2" @click="agregarNombreComanda(producto.nombre)">{{
                        producto.nombre }}</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div v-else>No hay ninguna productos en la base de datos.</div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="wrapper-c">
          <div class="hp text-center pt-2">Comanda</div>
          <div class="card-body">
            <div class="form-floating mb-3">
              <input v-model="comanda.camarero" type="text" class="form-control" name="camarero" required />
              <label for="camarero">Camarero:</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="comanda.nMesa" type="text" class="form-control" name="nMesa" required />
              <label for="nMesa">Número de mesa:</label>
            </div>
            <div class="form-floating mb-3">
              <!-- <textarea v-model="comanda.producto" type="text" class="form-control" name="producto" required /> -->
              <div v-if="nombreBotonesSeleccinados">
                <div v-for="nombreBotonSeleccinado in nombreBotonesSeleccinados">
                  <h4 class="text-center">{{ nombreBotonSeleccinado }}</h4>
                </div>
                <button class="btn btn-block mb-2" @click="submitComanda()">Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper-m {
  max-width: 100%;
  border-radius: 10px;
  margin: 5% auto;
  padding: 60px 50px;
  background-color: white;
  box-shadow: 20px 20px 80px rgb(206, 206, 206)
}

.wrapper-c {
  max-width: 100%;
  border-radius: 10px;
  margin: 10% auto;
  padding: 60px 50px;
  background-color: white;
  box-shadow: 20px 20px 80px rgb(206, 206, 206)
}
</style>