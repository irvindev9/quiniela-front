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
                        <tr v-for="user in users" :key="user.id">
                            <td>{{user.id}}</td>
                            <td class="text-center">
                                <img width="20" height="20" :src="get_img(user.team.logo)" alt="team-visita" v-if="user.team?.logo">
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
                                    <span :class="{'bg-primary': user.role_id === 2, 'd-none bg-secondary not_allowed': user.role_id !== 2}" class="badge rounded-pill edit" @click="loginAsUser(user.id)">
                                        <i class="bi bi-door-open"></i>
                                        Login
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span class="badge rounded-pill bg-danger" data-bs-toggle="modal" :data-bs-target="'#' + modalConfirmationId" @click="activeUserId = user.id">
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
                                <span :class="{'bg-warning': user.role_id === 2, 'd-none bg-secondary not_allowed': user.role_id !== 2}" class="badge rounded-pill" data-bs-toggle="modal" :data-bs-target="'#' + modalName" @click="activeUserId = user.id">
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
        <ModalName :modalName="modalNameN" :userId="activeUserId" @getUsers="loadUsers(true)"/>
        <ModalImage :modalName="modalImage" :userId="activeUserId" @getUsers="loadUsers(true)"/>
        <ModalConfirmation :modalName="modalConfirmationId" :targetId="activeUserId" :message="modalConfirmationMessage" @deleteTarget="confirmDeleteUser"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalPassword from '../modals/ModalPassword.vue';
import ModalName from '../modals/ModalName.vue';
import ModalImage from '../modals/ModalImage.vue';
import ModalConfirmation from '../modals/ModalConfirmation.vue';
import { getUsers, deleteUser, updateUserStatus, loginAsUser, checkPassword } from '../../api/adminRequests';
import { Users } from '../../models/Users';
import { useParticipantStore } from '../../stores/admin/Participants';
import { toast } from '../../utils/toast';

const newPassword = ref('');
const modalName = ref('participantsModal');
const modalNameN = ref('participantsModalName');
const modalImage = ref('participantsModalImage');
const modalConfirmationId = ref('participantsModalConfirmation');
const modalConfirmationMessage = ref('Esta acción no se puede deshacer, se eliminará el usuario y todos sus datos. ¿Desea continuar? <br/> <small>(Puedes usar la opción de ocultar para no mostrarlo en todas las quinielas ni en el marcador)</small>');
const users: Ref<Users> = ref([]);
const activeUserId = ref(0);
const participantsStore = useParticipantStore();

const router = useRouter();

onMounted(async () => {
    await loadUsers();
});

async function loadUsers(forceUpdate: Boolean = false) {

    if (forceUpdate) {
        participantsStore.clear();
    }

    if (checkForUpdate()) {
        users.value = await getUsers();
        participantsStore.setParticipants(users.value);
    } else {
        users.value = participantsStore.participants;
    }
    
}

async function deleteUsr(userId: number) {
    await deleteUser(userId);
    await loadUsers(true);
}

async function updateUser(userId: number, ...params: any) {
    await updateUserStatus(userId, ...params);
    await loadUsers(true);
}

async function login(userId: number) {
    await loginAsUser(userId);
}

function get_img(logo: string) {
    return new URL(`../../assets/teams/${logo}`, import.meta.url).href;
}

function checkForUpdate(){
    const tenMinutesAgo = 1 * 60 * 1000;
    const timeToUpdate = participantsStore.lastTimeUpdated ? participantsStore.lastTimeUpdated : 0;
    if (timeToUpdate < (new Date().getTime() - tenMinutesAgo)) {
        return true;
    }else{
        return false;
    }
}

async function confirmDeleteUser(password: string, userId: number) {
    const authenticaded = await checkPassword(password);

    if (authenticaded === 200) {
        await deleteUsr(userId);
        await loadUsers(true);
    }
    
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

    .not_allowed {
        cursor: not-allowed !important;
    }
}
</style>