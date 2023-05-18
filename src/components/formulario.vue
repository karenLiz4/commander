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
        <div class="hp text-center pt-2">Crear producto</div>
        <div class="form-floating mb-3">
            <input v-model="producto.nombre" type="text" class="form-control" name="nombre" required />
            <label for="nombre">Nombre de producto:</label>
        </div>
        <div class="form-floating mb-3 ">
            <input v-model="producto.descripcion" type="text" class="form-control" name="descripcion" required />
            <label for="descripcion">Descripción:</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="producto.precio" type="float" class="form-control" name="precio" required />
            <label for="precio">Precio:</label>
        </div>
    </div>
</template>

<style>
.hp {
    font-family: 'Kaushan Script', cursive;
    font-size: 2.5rem;
    color: #189AB4;
    font-style: italic;
    margin-bottom: 20px;
}

.form-floating {
    color: #189AB4;
}
</style>