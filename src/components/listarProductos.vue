<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

let productos = ref([])
let ordenAscendente = ref(true)
let ordenSelec=ref('created_at');

const fetchProductos = async () => {
    const { data, error } = await supabase
        .from('productos')
        .select()
        .order(ordenSelec.value, { ascending: ordenAscendente.value })

    productos.value = data
}

onMounted(() => {
    fetchProductos()
})

const ordenar = (orden) => {
    if (ordenSelec.value === orden) {
        ordenAscendente.value = !ordenAscendente.value // Invertir el orden actual
    } else {
        ordenSelec.value = orden
        ordenAscendente.value = true // Orden ascendente 
    }
    fetchProductos()
}

defineExpose({
    fetchProductos
})

</script>

<template>
    <div class="wrapper bg-white">
        <div class="hp text-center pt-2">Listado</div>
        <div class="card-body">
            <div class="table-responsive">
                <div  class="mb-4 text-center">
                    <div>Los botones azules que están abajo de: </div>
                    <div>nombre, descipción y precio</div>
                    <div class="mb-4">es para ordenarlos.</div>
                    <button  class="btn btn-block-l text-center " @click="ordenar('created_at')"> Odenar por creación</button>
                </div>
                
                
                <table class="table table-borderless mb-0" v-if="productos">
                    <thead>     
                        <tr>
                            <th scope="col">
                                <div class="text-center">
                                    <div>Nombre</div> 
                                    <button class="btn btn-block-p" @click="ordenar('nombre')"></button>
                                </div>
                            </th>  
                            <th scope="col">
                                <div class="text-center">
                                    <div>Descripción</div>
                                    <button class="btn btn-block-p"  @click="ordenar('descripcion')"></button>
                                </div>
                            </th> 
                            <th scope="col">
                                <div class="text-center">
                                    <div>Precio</div>
                                    <button class="btn btn-block-p" @click="ordenar('precio')"></button>
                                </div>
                            </th>     
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="producto in productos" :key="producto.id">
                            <td class="text-center">{{ producto.nombre }}</td>
                            <td class="text-center">{{ producto.descripcion }}</td>
                            <td class="text-center">{{ producto.precio }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>No hay ninguna producto en la base de datos.</div>
            </div>
        </div>
    </div>
</template>

<style>
table td,
table th {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}


thead th,
tbody th {
    color: black
}

tbody td {
    font-weight: 500;
    color: black
}

.card {
    border-radius: .5rem;
}

.btn.btn-block-l {
    border-radius: 20px;
    background-color: #189AB4;
    color: #fff;
    padding: 0.5rem 1rem;
    margin: 0 auto;
}

.btn.btn-block-l:hover {
    background-color: #05445E;
    color: #fff;
}

.btn.btn-block-p {
    border-radius: 20px;
    background-color: #189AB4;
    color: #fff;
    width: 10px;
    margin: 0 auto;
}

.btn.btn-block-p:hover {
    background-color: #05445E;
    color: #fff;
}



</style>