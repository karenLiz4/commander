<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'

const loginForm = ref({
    email: '',
    password: '',
})

const errorLogin = ref('')

const login = async () => {

    // Validar campos requeridos
    if (!loginForm.value.email || !loginForm.value.password) {
        errorLogin.value = 'Por favor, complete todos los campos'
        return
    }



    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.value.email,
        password: loginForm.value.password,
    })
    if (error) {
        console.log(error)
        errorLogin.value = 'La contraseña o el correo no son correctos'
    } else {
        console.log('Se ha iniciado sesión -> ', data)
    }
}
</script>
<template>
    <div class="wrapper bg-white">
        <div class="h1 text-center">Commander</div>
        <div class="h5 text-muted text-center pt-2">Iniciar sesión</div>
        <form class="pt-3">
            <div class="form-group py-2">
                <div class="input-field"><img src="/img/arroba.png">
                    <input v-model="loginForm.email" name="email" type="email" placeholder="Email" required />
                </div>
            </div>
            <div class="form-group py-1 pb-2">
                <div class="input-field"><img src="/img/password.png">
                    <input v-model="loginForm.password" name="password" type="password" placeholder="Contraseña" required />
                </div>
            </div>
            <div class="d-flex align-items-start">
                <button class="btn btn-block text-center my-4" type="button" @click="login">Iniciar sesión</button>
            </div>
            <div class="text-center pt-3 text-muted">¿Todavía no te has registrado? <router-link to="/register">Registrate
                    aquí</router-link></div>
        </form>
        <div class="text-center text-danger">{{ errorLogin }}</div>
    </div>
</template>

<style></style>