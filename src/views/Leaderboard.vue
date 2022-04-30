<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center bg-white rounded p-2">
        <h5 class="py-3">Tabla de resultados</h5>
        <div class="row mx-0 justify-content-center">
          <div class="col-12 col-md-10">
            <FirstPlaces :players="first_places" />
          </div>
          <div class="col-12 col-md-10">
            <SecondPlaces :players="second_places" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FirstPlaces from '../components/leaderboard/FirstPlaces.vue';
import SecondPlaces from '../components/leaderboard/SecondPlaces.vue';
import { getLeaderboard } from '../api/resultsRequests';
import { onMounted, ref } from 'vue';

const players = ref([])
const first_places = ref([])
const second_places = ref([])


onMounted(async () => {
  players.value = await getLeaderboard();

  if(players.value.length >= 3) {
    first_places.value = players.value.slice(0, 3);
    second_places.value = players.value.slice(3);
  }else{
    first_places.value = players.value;
    second_places.value = [];
  }
});


</script>