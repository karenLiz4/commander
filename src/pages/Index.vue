<script setup>
import { supabase } from '../services/supabase'

const props = defineProps({
  usuario: Object
})

const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
    } else {
        console.log('Se ha cerrado la sesión')
    }
}
</script>

<template>
    <h1>Inicio</h1>
    <div v-if="usuario">
        <div>
            {{ usuario.user_metadata.name }}
        </div>
        <button type="button" @click="cerrarSesion">cerrar sesion</button>
    </div>
</template>