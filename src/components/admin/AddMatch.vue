<template>
    <div class="container match-component">
        <div class="row">
            <div class="col-12 text-start">
                <h5>Agregar semana</h5>
            </div>
            <div class="col-12 col-lg-10">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <input type="text" class="form-control form-control-sm" placeholder="Semana 1" name="name_of_the_week" v-model="nameWeek">
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <input type="datetime-local" class="form-control form-control-sm" v-model="dateTime">
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-2">
                <button class="btn btn-primary btn-sm" @click="save">
                    <i class="bi bi-save"></i> 
                    Agregar
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="accordion accordion-flush" id="accordionFlush">
                <div class="accordion-item" v-for="(week, index) in weeks" :key="index">
                    <h2 class="accordion-header" :id="'flush-heading' + makeSlug(week.name, index)">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' + makeSlug(week.name, index)">
                            {{week.name}}
                        </button>
                    </h2>
                    <div :id="'flush-collapse' + makeSlug(week.name, index)" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-12 text-end">
                                    <small class="text-muted mx-5 clickable" data-bs-toggle="modal" :data-bs-target="'#' + modalAdjustDateTime" @click="activeWeekId = week.id" >Cierra el: {{week.end_date}}</small>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button 
                                            type="button" 
                                            class="btn btn-sm btn-outline-warning" 
                                            :disabled="isLoading"
                                            @click="getGames(Number(week.name.split(' ')[1]), Number(adminStore.currentSeason.split(' ')[1]))" v-if="validate(index)"
                                        >
                                            <div v-if="!isLoading">
                                               <i class="bi bi-binoculars"></i>
                                                Obtener partidos {{week.name.split(' ')[1]}}/{{adminStore.currentSeason.split(' ')[1]}} 
                                            </div>
                                            <div v-else>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span class="sr-only">Cargando...</span>
                                            </div>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" :data-bs-target="'#' + modalConfirmationId" @click="activeWeekId = week.id" v-if="validateIfWeekIsOpen(week.id)">
                                            <i class="bi bi-trash"></i> 
                                            Eliminar
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="update(week.id, (week.is_forced_open == 0 ? 1 : 0), week.is_forced_open_quiniela)">
                                            <i class="bi bi-door-open" v-if="week.is_forced_open"></i>
                                            <i class="bi bi-door-closed" v-else></i>
                                            {{ week.is_forced_open ? 'Cerrar' : 'Abrir' }} semana
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="update(week.id, week.is_forced_open, (week.is_forced_open_quiniela == 0 ? 1 : 0) )">
                                            <i class="bi bi-folder2-open" v-if="week.is_forced_open_quiniela"></i>
                                            <i class="bi bi-folder2" v-else></i>
                                            {{ week.is_forced_open_quiniela ? 'Cerrar' : 'Abrir' }} quinielas
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Matches :id="week.id" :matches="week.matches" @refresh="get" :isOpen="validateIfWeekIsOpen(week.id)" />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalConfirmation  :modalName="modalConfirmationId" :targetId="activeWeekId" :message="modalConfirmationMessage" @deleteTarget="confirmDeleteWeek" />
        <ModalAdjustDate :modalName="modalAdjustDateTime" :weekId="activeWeekId" :title="modalAdjustDateMessage" @updateDate="updateDate" />
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, Ref, ref } from 'vue';
import { saveWeek, getWeeks, deleteWeek, updateWeek, callScraper, checkPassword } from '../../api/adminRequests';
import { useAdminStore } from '../../stores/AdminStore';
import { useMatchStore } from '../../stores/admin/MatchStore';
import Matches from './addmatch/Matches.vue';
import ModalConfirmation from '../modals/ModalConfirmation.vue';
import ModalAdjustDate from '../modals/ModalAdjustDate.vue';
import { Weeks } from '../../models/Quinielas';

const weeks: Ref<Weeks>= ref({});
const adminStore = useAdminStore();
const matchStore = useMatchStore();

const dateTime = ref('')
const nameWeek = ref('')
const matchesComponent = ref()
const isLoading = ref(false)
const modalConfirmationId = ref('modalConfirmationWeek')
const modalConfirmationMessage = ref('Esta acción no se puede deshacer, se eliminara la semana y todas las quinielas asociadas a esta. ¿Desea continuar?')
const modalAdjustDateTime = ref('modalAdjustDate')
const modalAdjustDateMessage = ref('Realizar el cambio de fecha de cierre de la semana')
const activeWeekId = ref(0)

onBeforeMount(async () => {
    await get();
})

async function save() {
    await saveWeek({
        name: nameWeek.value,
        date: dateTime.value
    });

    get(true);
}

async function get(forceUpdate: Boolean = false) {
    isLoading.value = true;
    
    if (forceUpdate) {
        matchStore.clear();
    }

    if(checkForUpdate()) {
        weeks.value = await getWeeks();
        matchStore.setWeeks(weeks.value);
    } else {
        weeks.value = matchStore.weeks;
    }

    weeks.value.sort((a, b) => {
        if (Number(a.name.split(' ')[1]) > Number(b.name.split(' ')[1])) return -1;
        if (Number(a.name.split(' ')[1]) < Number(b.name.split(' ')[1])) return 1;
        return 0;
    });
    isLoading.value = false;
}

async function confirmDeleteWeek(password: string, id: number) {

    const authenticaded = await checkPassword(password);

    if (authenticaded == 200) {
        await deleteWeek(id);
        await get(true);
    }
}

function validateIfWeekIsOpen(week_id: number) {
    const end_date = weeks.value.find(week => week.id == week_id).end_date;

    return new Date(end_date) >= new Date();
}

async function update(id: number, is_forced_open: number, is_forced_open_quiniela: number) {

    await updateWeek(id, is_forced_open, is_forced_open_quiniela);

    await get(true);
}

function makeSlug(name: string, id: number = 0) {
    return name.toLowerCase().replace(/ /g, '') + id;
}

async function getGames(week: number, year: number) {
    isLoading.value = true;
    await callScraper(week, year);

    await get(true);
    isLoading.value = false;
}

function validate(index: number) {
    if(weeks.value[index].matches) {
        if (weeks.value[index].matches.length == 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function checkForUpdate() {
    const tenMinutesAgo = 1 * 60 * 1000;
    const timeToUpdate = matchStore.lastTimeUpdated ? matchStore.lastTimeUpdated : 0;
    if (timeToUpdate < (new Date().getTime() - tenMinutesAgo)) {
        return true;
    } else {
        return false;
    }
}

async function updateDate() {
    await get(true);
}
</script>

<style lang="scss">
.match-component {
    span.badge {
        cursor: pointer;
    }
}

.clickable {
    cursor: pointer;
}
</style>