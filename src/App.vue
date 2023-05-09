<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'
import router from './router'

const usuario = ref()

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()


  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_OUT') {
      usuario.value = null
      router.replace({ path: '/' })
    }

    if (event == 'SIGNED_IN') {
      usuario.value = session.user
      router.replace({ path: '/' })
    }
  })
})
</script>

<template>
  <nav>
    <router-link to="/">Inicio</router-link>
    <router-link v-if="usuario" to="/admin">Admin</router-link>
    <router-link v-else to="/login">Iniciar sesión</router-link>
  </nav>
  <router-view :usuario="usuario" />
</template>