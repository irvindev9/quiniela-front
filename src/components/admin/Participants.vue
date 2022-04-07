<template>
    <div>
        <h5 class="text-center">
            Panel de usuarios
        </h5>
        <div class="row participants-container">
            <div class="col-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Equipo</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                            <th>Cambiar password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="index in 9">
                            <td>
                                <img width="20" height="20" src="../../assets/teams/team_09.png" alt="team-visita">
                            </td>
                            <td>
                                <span>
                                    <i class="bi bi-person-circle"></i>
                                    Juan Perez
                                </span>
                            </td>
                            <td>
                                <span>
                                    <i class="bi bi-envelope"></i>
                                    user@user.com
                                </span>
                            </td>
                            <td>
                                <span class="badge rounded-pill bg-danger">
                                    <i class="bi bi-trash"></i> 
                                    Eliminar
                                </span>
                                <br>
                                <span class="badge rounded-pill bg-secondary">
                                    <i class="bi bi-eye-slash"></i>
                                    Ocultar
                                </span>
                                <br>
                                <span class="badge rounded-pill bg-success">
                                    <i class="bi bi-cash-coin"></i>
                                    Pagado
                                </span>
                            </td>
                            <td>
                                <span class="badge rounded-pill bg-warning" data-bs-toggle="modal" :data-bs-target="'#' + modalName">
                                    <i class="bi bi-question-diamond"></i>
                                    Cambiar password
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal :modalName="modalName" title="Cambiar password"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../Modal.vue';

const newPassword = ref('');
const modalName = ref('participantsModal');


</script>

<style lang="scss">
.participants-container {
    span.badge {
        cursor: pointer;
    }
}
</style>