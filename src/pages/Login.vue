<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'

const loginForm = ref({
    email: '',
    password: '',
})

const nuevoUsuario = ref({
    name: '',
    email: '',
    password: '',
})

const registroUsuario = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: nuevoUsuario.value.email,
        password: nuevoUsuario.value.password,
        options: {
            data: {
                name: nuevoUsuario.value.name,
            }
        }
    })
    if (error) {
        console.log(error)
    } else {
        console.log('Se ha registrado el usuario -> ', data)
    }
}
const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.value.email,
        password: loginForm.value.password,
    })
    if (error) {
        console.log(error)
    } else {
        console.log('Se ha iniciado sesión -> ', data)
    }
}
</script>
<template>
    <div>
        <div>
            <h2>Iniciar sesión</h2>
            <div>
                <label for="email">Email</label>
                <input v-model="loginForm.email" name="email" type="email" required />
            </div>
            <div >
                <label for="password">Contraseña</label>
                <input  v-model="loginForm.password" name="password" type="password" required />
            </div>
            <div>
                <button type="button" @click="login">Aceptar</button>
            </div>
        </div>
        <div>
            <h2 >Registrarse</h2>
            <div >
                <label>Nombre</label>
                <input v-model="nuevoUsuario.name" name="name" type="text" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input v-model="nuevoUsuario.email" name="email" type="email" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input v-model="nuevoUsuario.password" name="password" type="password" required />
            </div>
            <div>
                <button type="button" @click="registroUsuario">Aceptar</button>
            </div>
        </div>
    </div>
</template>