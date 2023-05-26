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
  comensales: '',
  nota: '',
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



//agregar nombre al array
const agregarNombreComanda = (nombre) => {
  nombreBotonesSeleccinados.value.push(nombre)
}

//eliminar nombre del array
const eliminarNombreComanda = (index) => {
  nombreBotonesSeleccinados.value.splice(index, 1);
}

//insert
const submitComanda = async () => {
  //guarda los productos de la comanda en la base de datos y los concatena separados por comas
  const productosSeleccionados = nombreBotonesSeleccinados.value.join(',')
  comanda.value.producto = productosSeleccionados


  /*Al utilizar el conjunto (Set) y la función map, se obtiene una lista única de nombres de productos
   sin repetición en nombreBotonesSeleccinados.value. Luego, se calcula la cantidad de cada producto y se
   genera el HTML con la cantidad y el nombre de cada producto en la variable productosComandaHtml.
   (chatGPT)*/
  const productosComandaHtml = [...new Set(nombreBotonesSeleccinados.value)].map((nombre) => {
    const cantidad = nombreBotonesSeleccinados.value.filter((n) => n === nombre).length;
    return `<h3>(x${cantidad}) ${nombre}</h3>`;
  }).join('');

  const { data, error } = await supabase
    .from('comandas')
    .insert({ camarero: comanda.value.camarero, nMesa: comanda.value.nMesa, comensales: comanda.value.comensales, nota: comanda.value.nota, producto: comanda.value.producto })
    .select()

  if (error) {
    console.log(error);
  }
  else {
    console.log('se ha creado la comanda' + data + 'correctamente');

    const comandaHtml = `
      <html>
      <head>
        <title>Commander</title>
        <style>

        h1 {
          font-family: 'Kaushan Script', cursive;
          font-size: 3.5rem;
          font-weight: bold;
        }

        h3 {
          font-family: 'Kaushan Script', cursive;
          font-size: 1.0rem;
        }

        p {
          font-family: 'Kaushan Script', cursive;
        }
        </style>
      </head>
      <body>
        <h1>Comanda </h1>
        <h3>Camarero:</h3> <p>${comanda.value.camarero}</p>
        <h3>Número de mesa:</h3> <p>${comanda.value.nMesa}</p>
        <h3>Número de comensales:</h3> <p>${comanda.value.comensales}</p>
        <h3>Nota:</h3> <p>${comanda.value.nota}</p>
        <h3>Productos:</h3> <p>${productosComandaHtml}</p>
      </body>
      </html>
    `;

    // Crear una nueva ventana del navegador con la comanda HTML
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(comandaHtml);
    printWindow.document.close();

    // Imprimir la comanda
    printWindow.print();

    //cerrar la ventana
    printWindow.close();

    //dejar los campos vacios
    comanda.value = {
      camarero: '',
      nMesa: '',
      comensales: '',
      nota: '',
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
  agregarNombreComanda,
  eliminarNombreComanda
})



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
              <label for="camarero">Camarero: (obligatorio)</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="comanda.nMesa" type="text" class="form-control" name="nMesa" required />
              <label for="nMesa">Número de mesa: (obligatorio)</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="comanda.comensales" type="text" class="form-control" name="comensales" required />
              <label for="nMesa">Número de comensales: (obligatorio)</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="comanda.nota" type="text" class="form-control" name="nota" />
              <label for="nMesa">Nota: (opcional)</label>
            </div>
            <div class="form-floating mb-3">
              <div v-if="nombreBotonesSeleccinados">
                <div v-for="(nombreBotonSeleccinado, index) in nombreBotonesSeleccinados" :key="index"
                  class="d-flex justify-content-between">
                  <h4>{{ nombreBotonSeleccinado }}</h4>
                  <button class="btn btn-danger mb-2" @click="eliminarNombreComanda(index)">Eliminar</button>
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

.btn.btn-danger {
  border-radius: 20px;
  border-color: red;
  background-color: red;
  color: #fff;

}

.btn.btn-danger:hover {
  background-color: #CC0000;
  color: #fff;
}
</style>