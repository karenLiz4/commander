<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'

const nuevoUsuario = ref({
    name: '',
    email: '',
    password: '',
})

const errorRegistro = ref('')

const registroUsuario = async () => {

    // Validar campos requeridos
    if (!nuevoUsuario.value.name || !nuevoUsuario.value.email || !nuevoUsuario.value.password) {
        errorRegistro.value = 'Por favor, complete todos los campos'
        return
    }

    // Validar la contraseña
    if (nuevoUsuario.value.password.length < 8 || !/[A-Z]/.test(nuevoUsuario.value.password) || !/[a-z]/.test(nuevoUsuario.value.password) || !/\d/.test(nuevoUsuario.value.password)) {
        errorRegistro.value = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
        return;
    }
    else {

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
}

</script>


<template>
    <div class="wrapper bg-white">
        <div class="h1 text-center">Commander</div>
        <div class="h5 text-muted text-center pt-2">Registrarse</div>
        <form class="pt-3">
            <div class="form-group py-2">
                <div class="input-field"><img src="img/usuario.png">
                    <input v-model="nuevoUsuario.name" name="name" type="text" placeholder="Nombre" required />
                </div>
            </div>
            <div class="form-group py-1 pb-2">
                <div class="input-field"><img src="img/arroba.png">
                    <input v-model="nuevoUsuario.email" name="email" type="email" placeholder="Email" required />
                </div>
            </div>
            <div class="form-group py-1 pb-2">
                <div class="input-field"><img src="img/password.png">
                    <input v-model="nuevoUsuario.password" name="password" type="password" placeholder="Password"
                        required />
                </div>
            </div>
            <div class="d-flex align-items-start">
                <button class="btn btn-block text-center my-4" type="button" @click="registroUsuario">Aceptar</button>
            </div>
        </form>
        <div class="text-center text-danger">{{ errorRegistro }}</div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Poppins&display=swap');


img {
    padding: 10px;
}

.wrapper {
    max-width: 500px;
    border-radius: 10px;
    margin: 10% auto;
    padding: 60px 50px;
    box-shadow: 20px 20px 80px rgb(206, 206, 206)
}

.h1 {
    font-family: 'Kaushan Script', cursive;
    font-size: 3.5rem;
    font-weight: bold;
    color: #189AB4;
    font-style: italic
}

.h5 {
    font-family: 'Poppins', sans-serif
}

.input-field {
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #400485;
    color: #400485
}

.input-field:hover {
    color: #7b4ca0;
    border: 1px solid #7b4ca0
}

input {
    border: none;
    outline: none;
    box-shadow: none;
    width: 100%;
    padding: 0px 2px;
    font-family: 'Poppins', sans-serif
}

.fa-eye-slash.btn {
    border: none;
    outline: none;
    box-shadow: none
}

a:hover {
    text-decoration: none;
    color: #189AB4;
    font-weight: bold;
}

a:link {
    text-decoration: none;
    margin-left: 5px
}

.btn.btn-block {
    border-radius: 20px;
    background-color: #189AB4;
    color: #fff;
    display: block;
    padding: 0.5rem 1rem;
    width: 150px;
    margin: 0 auto;
}

.btn.btn-block:hover {
    background-color: #05445E;
    color: #fff;
}
</style>
  
