<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center bg-white rounded p-2">
        <h5 class="py-3">Tabla de resultados</h5>
        <div class="row mx-0 justify-content-center">
          <div class="col-12 col-md-10">
            <FirstPlaces />
          </div>
          <div class="col-12 col-md-10">
            <SecondPlaces />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FirstPlaces from '../components/leaderboard/FirstPlaces.vue';
import SecondPlaces from '../components/leaderboard/SecondPlaces.vue';
</script>