<template>
    <div>
        <h5 class="text-center">
            Ajustes
        </h5>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-4 col-xl-3 pt-1">
                    <select type="text" class="form-control form-control-sm" v-model="season">
                        <option v-for="index in seasons" :key="index.id" :selected="index.is_active" :value="index.name">
                            {{index.name}}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-2 col-lg-2 col-xl-2 pt-1">
                    <button class="btn btn-primary btn-sm" @click="update" :disabled="isLoading">
                        <i class="bi bi-cloud-upload"></i> 
                        Guardar
                    </button>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    Registro de usuarios
                </div>
                <div class="col-12 mt-1">
                    <button class="btn btn-success btn-sm" :disabled="season_register_open || isLoading" @click="updateRegister(1)">
                        <i class="bi bi-door-open"></i> 
                        Abrir
                    </button>
                    <button class="btn btn-danger btn-sm mx-3" :disabled="!season_register_open || isLoading" @click="updateRegister(0)">
                        <i class="bi bi-door-closed"></i> 
                        Cerrar
                    </button>
                </div>
            </div>
            <hr />
            <Notifications />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import iziToast from 'izitoast';
import { getSeasons, updateSeason, updateSeasonRegister } from '../../api/adminRequests';
import Notifications from './settings/Notifications.vue';


const isLoading = ref(false);

const seasons = ref([]);
const season = ref('');
const season_register_open = ref(false);

onMounted(async () => {
    await loadSeasons();
});



async function loadSeasons() {
    isLoading.value = true;

    seasons.value = await getSeasons();

    const actual_season = seasons.value.filter((season_index: any) => {
        return season_index.is_active === 1;
    })[0];

    season.value = actual_season.name;

    season_register_open.value = actual_season.is_register_open;

    isLoading.value = false;
}

async function update() {
    isLoading.value = true;

    const id_season = seasons.value.filter((season_index: any) => {
        return season_index.name === season.value;
    })[0].id;

    await updateSeason(id_season);

    await loadSeasons();

    isLoading.value = false;

    iziToast.success({
        message: `Se actualizó la temporada ${season.value}`,
        position: 'topRight',
        timeout: 10000,
    });
}

async function updateRegister(status: number) {
    isLoading.value = true;
    const id_season = seasons.value.filter((season_index: any) => {
        return season_index.name === season.value;
    })[0].id;

    await updateSeasonRegister(id_season, status);

    await loadSeasons();

    isLoading.value = false;

    iziToast.success({
        message: `Se actualizó el estado de registro de la temporada ${season.value}`,
        position: 'topRight',
        timeout: 10000,
    });
}
</script>
