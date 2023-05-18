<script>
import { ref } from 'vue'
import crearComanda from '../components/crearComanda.vue';

const comanda = () => {

}

</script>

<template>
  <div class="col">
    <crearComanda @crearComanda="comanda" />
  </div>
</template>