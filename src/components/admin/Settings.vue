<template>
    <div>
        <h5 class="text-center">
            Ajustes
        </h5>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-4 col-xl-3 pt-1">
                    <select class="form-control form-control-sm" v-model="season">
                        <option v-for="season in seasons" :key="season.id" :selected="season.is_active == 1" :value="season.name">
                            {{season.name}}
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
        <div class="container">
            <div class="row my-3">
                <hr>
                <div class="col-12">
                    <button class="btn btn-outline-secondary bg-light" @click="clearCacheCaller">
                        <div v-if="cacheLoading">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </div>
                        <div v-else>
                            <i class="bi bi-trash"></i> 
                            Eliminar cache
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import iziToast from 'izitoast';
import { getSeasons, updateSeason, updateSeasonRegister, clearCache } from '../../api/adminRequests';
import Notifications from './settings/Notifications.vue';
import { Seasons } from '../../models/Quinielas';
import { useSettingStore } from '../../stores/admin/SettingStore';


const isLoading = ref(false);

const seasons: Ref<Seasons> = ref([]);
const season: Ref<string> = ref('');
const season_register_open = ref(false);
const settingStore = useSettingStore();
const cacheLoading = ref(false);

onMounted(async () => {
    await loadSeasons();
});

async function loadSeasons(forceUpdate: boolean = false) {
    isLoading.value = true;

    if(forceUpdate) {
        settingStore.clearSeason();
    }

    if(checkForUpdate()) {
        seasons.value = await getSeasons();
        settingStore.setSeasons(seasons.value);
    } else {
        seasons.value = settingStore.seasons;
    }
    
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

    await loadSeasons(true);

    isLoading.value = false;
}

async function updateRegister(status: number) {
    isLoading.value = true;
    const id_season = seasons.value.filter((season_index: any) => {
        return season_index.name === season.value;
    })[0].id;

    await updateSeasonRegister(id_season, status);

    await loadSeasons(true);

    isLoading.value = false;

    iziToast.success({
        message: `Se actualizó el estado de registro de la temporada ${season.value}`,
        position: 'topRight',
        timeout: 10000,
    });
}

function checkForUpdate() {
    const tenMinutesAgo = 1 * 60 * 1000;
    const timeToUpdate = settingStore.seasonLastTimeUpdated ? settingStore.seasonLastTimeUpdated : 0;
    if (timeToUpdate < (new Date().getTime() - tenMinutesAgo)) {
        return true;
    }else{
        return false;
    }
}

async function clearCacheCaller() {
    cacheLoading.value = true;

    await clearCache();

    cacheLoading.value = false;
}
</script>
