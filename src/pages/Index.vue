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
        <div class="h1 text-center">Commander</div>
        <div class="h4 text-center">Tu comanda a un solo clic</div>
        <div  v-if="usuario">
            <div class="h5 text-muted text-center pt-2">
                {{ usuario.user_metadata.name }}
                {{ usuario.user_metadata.email }}
            </div>
            <button class="btn btn-block text-center my-4" type="button" @click="cerrarSesion">Cerrar sesion</button>
        </div>
    </div>
</template>

<style>


.h4 {
    color:#000000; 
}

</style>