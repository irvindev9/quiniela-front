<template>
    <div>
        <h5 class="text-center">
            Panel de usuarios
        </h5>
        <div class="row participants-container">
            <div class="col-12 table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Equipo</th>
                            <th>Nombre</th>
                            <th>Número Tel.</th>
                            <th>Acciones</th>
                            <th>Cambiar password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user">
                            <td class="text-center">
                                <img width="20" height="20" src="../../assets/teams/team_09.png" alt="team-visita">
                            </td>
                            <td>
                                <span>
                                    <i class="bi bi-person-circle"></i>
                                    {{user.name}}
                                    <span class="badge rounded-pill bg-primary edit">
                                        <i class="bi bi-pencil"></i> 
                                        Editar
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <i class="bi bi-phone"></i>
                                    {{user.email}}
                                    <span class="badge rounded-pill bg-primary edit">
                                        <i class="bi bi-door-open"></i>
                                        Login
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span class="badge rounded-pill bg-danger">
                                    <i class="bi bi-trash"></i> 
                                    Eliminar
                                </span>
                                <br>
                                <span class="badge rounded-pill bg-secondary" :class="{'pressed': users.id < 3}">
                                    <i class="bi bi-eye-slash"></i>
                                    Ocultar
                                </span>
                                <br>
                                <span class="badge rounded-pill bg-success" :class="{'pressed': user.id < 3}">
                                    <i class="bi bi-cash-coin"></i>
                                    Pagado
                                </span>
                                <br>
                                <span v-if="user.role_id == 1" class="badge rounded-pill bg-warning admin-bagde">
                                    <i class="bi bi-lightning-charge"></i>
                                    Admin
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
import { onMounted, ref } from 'vue';
import Modal from '../modals/Modal.vue';
import { getUsers } from '../../api/adminRequests';

const newPassword = ref('');
const modalName = ref('participantsModal');
const users = ref([]);

onMounted(async () => {
    await loadUsers();
});

async function loadUsers() {
    users.value = await getUsers();

    // sort user by name
    users.value = users.value.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
}


</script>

<style lang="scss">
.participants-container {
    span.badge {
        cursor: pointer;
    }

    span.admin-bagde {
        cursor: not-allowed;
    }

    span.edit {
        font-size: 8px;
    }

    .pressed {
        box-shadow: inset 0px 0px 10px rgba(0,0,0,0.5);
        background-color: white !important;
        color: grey;
    }
}
</style>