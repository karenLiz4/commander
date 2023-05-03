<script setup>
import { computed } from 'vue' 

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const producto = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})


</script>

<template>
    <div>
        <h1>Crear producto</h1>
        <div class="form-producto">
            <label for="nombre">Nombre de producto:</label>
            <input v-model="producto.nombre" type="text" name="nombre" required />
        </div>
        <div class="form-producto">
            <label for="descripcion">Descripción:</label>
            <input v-model="producto.descripcion" type="text" name="descripcion" required />
        </div>
        <div class="form-producto">
            <label for="precio">Precio:</label>
            <input v-model="producto.precio" type="float" name="precio" required />
        </div>
    </div>
</template>