<script setup>
import { ref } from 'vue';
import { supabase } from '../services/supabase';

const dishes = ref([]);
const selectedDishes = ref([]);

const fetchDishes = async () => {
  const { data, error } = await supabase
    .from('dishes')
    .select('*');

  if (error) {
    console.error(error);
  } else {
    dishes.value = data;
  }
};

const selectDish = () => {
  selectedDishes.value = dishes.value.filter(dish => selectedDishes.value.includes(dish));
};

const generateOrder = async () => {
  try {
    const { data, error } = await supabase
      .from('comandas')
      .insert({ dishes: selectedDishes.value })
      .select();

    if (error) {
      console.error(error);
    } else {
      console.log('Comanda creada correctamente');
      // Realiza cualquier acción adicional que desees después de crear la comanda
    }
  } catch (error) {
    console.error(error);
  }
};

fetchDishes();
</script>

<template>
    <div>
      <h2>Lista de platos</h2>
      <ul>
        <li v-for="dish in dishes" :key="dish.id">
          <label>
            <input
              type="checkbox"
              :value="dish"
              v-model="selectedDishes"
              @change="selectDish"
            />
            {{ dish.name }}
          </label>
        </li>
      </ul>
      <button @click="generateOrder">Generar comanda</button>
    </div>
  </template>