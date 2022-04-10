<template>
    <div class="container match-component">
        <div class="row">
            <div class="col-12 text-start">
                <h5>Agregar semana</h5>
            </div>
            <div class="col-12 col-lg-10">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <input type="text" class="form-control form-control-sm" placeholder="Nombre">
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <input type="datetime-local" class="form-control form-control-sm">
                        <small class="text-muted">
                            Fecha y hora del servidor
                            <br>
                            12/12/2020 12:00
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-2">
                <button class="btn btn-primary btn-sm">
                    <i class="bi bi-save"></i> 
                    Agregar
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="accordion accordion-flush" id="accordionFlush">
                <div class="accordion-item" v-for="(match, index) in matches" :key="index">
                    <h2 class="accordion-header" :id="'flush-heading' + match.slug">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' + match.slug">
                            {{match.name}}
                        </button>
                    </h2>
                    <div :id="'flush-collapse' + match.slug" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-12 text-end">
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn btn-sm btn-outline-danger">
                                            <i class="bi bi-trash"></i> 
                                            Eliminar
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-door-open"></i>
                                            Abrir semana
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 col-md-5 col-lg-4">
                                    <input type="text" class="form-control form-control-sm" placeholder="Visita">
                                </div>
                                <div class="col-12 col-md-2 col-lg-1 text-center">
                                    VS
                                </div>
                                <div class="col-12 col-md-5 col-lg-4">
                                    <input type="text" class="form-control form-control-sm" placeholder="Local">
                                </div>
                                <div class="col-12 col-md-2 col-lg-2">
                                    <button class="btn btn-outline-primary btn-sm">
                                        <i class="bi bi-save"></i> 
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <table class="table table-hover">
                                    <tr>
                                        <th class="text-start">Visita</th>
                                        <th class="text-start">Local</th>
                                        <th>Acciones</th>
                                    </tr>
                                    <tbody>
                                        <tr v-for="index in 10" :key="index">
                                            <td class="text-start">
                                                <img width="35" height="35" src="../../assets/teams/team_08.png" alt="team-visita"> <span>Miami Dolphins</span>
                                                <p class="text-start">
                                                    <span class="badge rounded-pill bg-warning">
                                                        <i class="bi bi-trophy"></i> 
                                                        Ganador
                                                    </span>
                                                </p>
                                            </td>
                                            <td class="text-start">
                                                <img width="35" height="35" src="../../assets/teams/team_02.png" alt="team-local"> <span>New England Patriots</span>
                                                <p class="text-start">
                                                    <span class="badge rounded-pill bg-warning">
                                                        <i class="bi bi-trophy"></i> 
                                                        Ganador
                                                    </span>
                                                </p>
                                            </td>
                                            <td>
                                                <span class="badge rounded-pill bg-danger">
                                                    <i class="bi bi-trash"></i> 
                                                    Eliminar
                                                </span>
                                                <br>
                                                <span class="badge rounded-pill bg-secondary">
                                                    <i class="bi bi-chevron-bar-contract"></i>
                                                    Empate
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const matches = ref({
    0: {
        name: 'Semana 1',
        slug: 'semana-1',
        date: '12/12/2020 12:00',
        matches: [

        ]
    },
    1: {
        name: 'Semana 2',
        slug: 'semana-2',
        date: '12/12/2020 12:00',
        matches: [

        ]
    },
    2: {
        name: 'Semana 3',
        slug: 'semana-3',
        date: '12/12/2020 12:00',
        matches: [

        ]
    }
})
</script>

<style lang="scss">
.match-component {
    span.badge {
        cursor: pointer;
    }
}
</style>