<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mb-1">
                <select class="form-select" name="semana" id="semana-selector" v-model="current_week" @change="get">
                    <option v-for="wk in weeks" :key="wk.id" :value="wk.id">{{wk.name}}</option>
                </select>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                <div id="mi-quiniela" class="card">
                    <div class="card-header bg-light d-flex justify-content-between">
                        <h5 class="m-0">Tu quiniela: {{userStore.name}}</h5>
                        <button class="btn btn-outline-primary btn-sm" type="button" @click="saveData" v-if="!isLocked">
                            <div v-if="isLoading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Guardando...
                            </div>
                            <div v-else>
                                Guardar
                            </div>
                        </button>
                    </div>
                    <div class="card-body">
                        <SelectTeam v-for="match in week[0].matches" :key="match.id" :match="match" @update="saveData"/> 
                        <div class="lock-match align-middle" v-if="isLocked">
                            <span>
                                <i class="bi-lock"></i>
                                <br>
                                Quiniela bloqueada
                            </span>
                        </div>
                        <div class="lock-match align-middle" v-if="isLoading">
                            <span>
                                <div class="spinner-border text-dark" role="status">
                                <span class="sr-only d-none">Loading...</span>
                            </div>
                            </span>
                        </div>
                    </div>
                    <div class="card-footer bg-light d-flex justify-content-end" v-if="!isLocked">
                        <button class="btn btn-outline-primary btn-sm" type="button" @click="saveData">
                            <div v-if="isLoading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Guardando...
                            </div>
                            <div v-else>
                                Guardar
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import SelectTeam from '../components/miquiniela/SelectTeam.vue';
import { getQuiniela, saveQuiniela, getWeeks } from '../api/quinielaRequests';
import { useUserStore } from '../stores/UserStore';
import { Weeks, Week } from '../models/Quinielas';

const userStore = useUserStore();



const isLoading = ref(false)
const isLocked = ref(false)
const current_week = ref(0)
const weeks: Ref<Weeks> = ref([])
const week: Ref<Week | any> = ref([{
    matches: []
}])

async function saveData(){
    isLoading.value = true
    if(current_week.value > 0){
        await saveQuiniela(current_week.value, week.value[0].matches);
    }
    isLoading.value = false
}

async function get(){
    isLoading.value = true
    week.value = await getQuiniela(current_week.value);
    checkIfIsLocked();
    isLoading.value = false
}

function checkIfIsLocked(){
    const force_open = week.value[0].is_forced_open;
    const dateTime_to_close = new Date(week.value[0].end_date);

    new Date().toLocaleString("en-US", {timeZone: "America/Denver"});

    const today = new Date();

    if(dateTime_to_close >= today){
        isLocked.value = false;
    }else{
        if(force_open){
            isLocked.value = false;
        }else{
            isLocked.value = true;
        }
    }
}

async function getW(){
    isLoading.value = true
    weeks.value = await getWeeks();
    // sort by name
    if(weeks.value.length > 0){
        weeks.value.sort((a, b) => (Number(a.name.split(' ')[1]) < Number(b.name.split(' ')[1])) ? 1 : -1);
        current_week.value = weeks.value[week.value.length - 1]?.id;
    } else {
        current_week.value = 0;
    }
    isLoading.value = false
}

onMounted( async() => {
    await getW();
    if (current_week.value !== 0) {
        await get();
    }
})

</script>


<style lang="scss">
#mi-quiniela.card {
    .card-header {
        text-align: left;
    }

    .card-body {
        position: relative;
        min-height: 170px;

        .lock-match {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            opacity: 0.7;
            text-align: center;

            span {
                position: relative;
                top: 50%;

                i {
                    color: black;
                    font-size: 2rem;
                }
            }
        }
    }
}
</style>