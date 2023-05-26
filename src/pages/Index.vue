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
    <div class="wrapper bg-white">
        <h1>Bienvenido</h1>
        <div v-if="usuario">
            <div class="h5 text-muted text-center pt-2">
                {{ usuario.user_metadata.name }}
            </div>
            <button class="btn btn-block text-center my-4" type="button" @click="cerrarSesion">cerrar sesion</button>
        </div>
    </div>
</template>

<style>

</style>