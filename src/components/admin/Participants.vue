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
                            <th>id</th>
                            <th>Equipo</th>
                            <th>Nombre</th>
                            <th>Número Tel.</th>
                            <th>Acciones</th>
                            <th>Cambiar password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user">
                            <td>{{user.id}}</td>
                            <td class="text-center">
                                <img width="20" height="20" :src="get_img(user.team.logo)" alt="team-visita">
                            </td>
                            <td>
                                <span>
                                    <i class="bi bi-person-circle" data-bs-toggle="modal" :data-bs-target="'#' + modalImage" @click="activeUserId = user.id"></i>
                                    {{user.name}}
                                    <span class="badge rounded-pill bg-primary edit" data-bs-toggle="modal" :data-bs-target="'#' + modalNameN" @click="activeUserId = user.id">
                                        <i class="bi bi-pencil"></i> 
                                        Editar
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <i class="bi bi-phone"></i>
                                    {{user.email}}
                                    <span class="badge rounded-pill bg-primary edit" @click="loginAsUser(user.id)">
                                        <i class="bi bi-door-open"></i>
                                        Login
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span class="badge rounded-pill bg-danger" @click="deleteUsr(user.id)">
                                    <i class="bi bi-trash"></i> 
                                    Eliminar
                                </span>
                                <br>
                                <span class="badge rounded-pill bg-secondary" :class="{'pressed': user.is_hide }" @click="updateUser(user.id, {is_hide: (user.is_hide == 1 ? 0 : 1)})">
                                    <i class="bi bi-eye-slash" v-if="user.is_hide == 0"></i>
                                    <i class="bi bi-eye" v-else></i>
                                    {{ user.is_hide === 0 ? 'Ocultar' : 'Mostrar' }}
                                </span>
                                <br>
                                <span class="badge rounded-pill bg-success" :class="{ 'pressed': user.is_paid }" @click="updateUser(user.id, {is_paid: (user.is_paid == 1 ? 0 : 1)})">
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
                                <span class="badge rounded-pill bg-warning" data-bs-toggle="modal" :data-bs-target="'#' + modalName" @click="activeUserId = user.id">
                                    <i class="bi bi-question-diamond"></i>
                                    Cambiar password
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalPassword :modalName="modalName" title="Cambiar password" :userId="activeUserId"/>
        <ModalName :modalName="modalNameN" :userId="activeUserId" @getUsers="loadUsers"/>
        <ModalImage :modalName="modalImage" :userId="activeUserId" @getUsers="loadUsers"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalPassword from '../modals/ModalPassword.vue';
import ModalName from '../modals/ModalName.vue';
import ModalImage from '../modals/ModalImage.vue';
import { getUsers, deleteUser, updateUserStatus, loginAsUser } from '../../api/adminRequests';

const newPassword = ref('');
const modalName = ref('participantsModal');
const modalNameN = ref('participantsModalName');
const modalImage = ref('participantsModalImage');
const users = ref([]);
const activeUserId = ref(0);

const router = useRouter();

onMounted(async () => {
    await loadUsers();
});

async function loadUsers() {
    users.value = await getUsers();
}

async function deleteUsr(userId: number) {
    await deleteUser(userId);
    await loadUsers();
}

async function updateUser(userId: number, ...params: any) {
    await updateUserStatus(userId, ...params);
    await loadUsers();
}

async function login(userId: number) {
    await loginAsUser(userId);
}

function get_img(logo: string) {
    return new URL(`../../assets/teams/${logo}`, import.meta.url).href;
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

    .bi-person-circle {
        cursor: pointer;
    }
}
</style>