<script setup>
import { supabase } from '../services/supabase'

const props = defineProps({
  productoSelec: Object
})

const emit = defineEmits(['eliminarProducto'])

const eliminarProducto = async (id) => {
    const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
    } else {
        console.log('Se ha eliminado el producto')
        emit('eliminarProducto')
    }
}
</script>

<template>
    <button @click="eliminarProducto(productoSelec.id)">Eliminar</button>
</template>