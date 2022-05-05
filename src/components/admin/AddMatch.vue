<template>
    <div class="container match-component">
        <div class="row">
            <div class="col-12 text-start">
                <h5>Agregar semana</h5>
            </div>
            <div class="col-12 col-lg-10">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <input type="text" class="form-control form-control-sm" placeholder="Semana 1" v-model="nameWeek">
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
                <div class="accordion-item" v-for="(match, index) in matches" :key="index">
                    <h2 class="accordion-header" :id="'flush-heading' + makeSlug(match.name, index)">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' + makeSlug(match.name, index)">
                            {{match.name}}
                        </button>
                    </h2>
                    <div :id="'flush-collapse' + makeSlug(match.name, index)" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-12 text-end">
                                    <small class="text-muted mx-5">Cierra el: {{match.end_date}}</small>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteW(match.id)">
                                            <i class="bi bi-trash"></i> 
                                            Eliminar
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="update(match.id)">
                                            <i class="bi bi-door-open" v-if="match.is_forced_open"></i>
                                            <i class="bi bi-door-closed" v-else></i>
                                            {{ match.is_forced_open ? 'Cerrar' : 'Abrir' }} semana
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Matches :id="match.id" :matches="match.matches" @refresh="get" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { saveWeek, getWeeks, deleteWeek, updateWeek } from '../../api/adminRequests';
import Matches from './addmatch/Matches.vue';

const matches = ref({});

const dateTime = ref('2022-12-12T12:00')
const nameWeek = ref('')
const matchesComponent = ref()

onMounted(async () => {
    await get();
})

async function save() {
    await saveWeek({
        name: nameWeek.value,
        date: dateTime.value
    });

    get();
}

async function get() {
    matches.value = await getWeeks();

    matches.value.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
    });
}

async function deleteW(id: number) {
    await deleteWeek(id);

    await get();
}

async function update(id: number) {
    await updateWeek(id);

    await get();
}

function makeSlug(name: string, id: number = 0) {
    return name.toLowerCase().replace(/ /g, '') + id;
}

</script>

<style lang="scss">
.match-component {
    span.badge {
        cursor: pointer;
    }
}
</style>