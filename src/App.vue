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
  <div>
    <div class="navbar">
      <div class="left-section">
        <a href=""><h1>Commander</h1></a>
        <img class="logo" src="img/logo.png" alt="Logo">  
      </div>
      <div class="right-section">
        <router-link v-if="usuario" class="nav-button" to="/admin">Administrar</router-link>
        <router-link v-if="usuario" class="nav-button" to="/comanda">Comanda</router-link>
        <router-link v-if="usuario" class="nav-button" to="/">Usuario</router-link>
        <router-link v-else class="nav-button" to="/login">Iniciar sesión</router-link>

      </div>
    </div>

    <router-view :usuario="usuario" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Poppins&display=swap');

.navbar {
  width: 100%;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  margin-top: 0.5%;
}

h1 {
  font-family: 'Kaushan Script', cursive;
  font-weight: bold;
  color: #000000;
  font-style: italic;
  margin-left: 110px
}

.logo {
  width: 120px;
  height: 120px;
  position: absolute;
}

.right-section {
  display: flex;
  margin-right: 1%;
}

.nav-button,
.nav-button-fin {
  background-color: #D4F1F4;
  color: black;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;

}

.nav-button-fin {
  margin-right: 10px;
}

.nav-button:hover {
  background-color: #189AB4;
  text-decoration: none;
  color: black;
}


/*Para la version de movil*/ 
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .navbar {
  width: 100%;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
}

h1 {
  font-family: 'Kaushan Script', cursive;
  font-weight: bold;
  color: #000000;
  font-style: italic;
  margin-left: 43%;
}

.logo {
  width: 80px;
  height: 80px;
  position: absolute;
}

.right-section {
  display: flex;
  margin-left: 27%;
}

.nav-button,
.nav-button-fin {
  background-color: #D4F1F4;
  color: black;
  border: none;
  font-size: 10px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-button-fin {
  margin-right: 10px;
}

.nav-button:hover {
  background-color: #189AB4;
  text-decoration: none;
  color: black;
}
}

</style>
