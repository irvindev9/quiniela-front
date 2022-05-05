<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div class="container-fluid">
                <a class="navbar-brand" href="#" @click="redirect('/')">
                    Quiniela | Luis Lopez
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" :class="{'active': route.name === 'Admin'}" href="#" @click="redirect('admin')" v-if="userStore.isAuthenticated && userStore.role_id == 1">Panel Admin</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{'active': route.name === 'Marcador'}" href="#" @click="redirect('marcador')">Marcador</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{'active': route.name === 'Quinielas'}" href="#" @click="redirect('quinielas')">Todas las quinielas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{'active': route.name === 'MiQuiniela'}" href="#" @click="redirect('mi-quiniela')" v-if="userStore.isAuthenticated">Mi quiniela</a>
                        </li>
                        <li class="nav-item dropdown" v-if="userStore.isAuthenticated">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {{userStore.name}}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#" @click="redirect('/')">Perfil</a></li>
                                <li><a class="dropdown-item" href="#" @click="logout">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/UserStore';
import { logout as logoutCookies } from '../api/sessionRequests';
// import { storeToRefs } from 'pinia';

const userStore = useUserStore();
// const { isAuthenticated } = storeToRefs(useUserStore());

const router = useRouter()
const route = useRoute()

function redirect(to: string) {
  router.push(to)
}

function logout() {
  userStore.logout();
  logoutCookies();
  router.push('/')
}
</script>

<style lang="scss">
nav.bg-light {
    background: white !important;;
}

.navbar {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;

    .nav-link.active {
        background: rgba(200, 200, 200, 0.1);
        border-radius: 10px;
        font-weight: 500;
    }
}

.dropdown-menu[data-bs-popper] {
    left: -75% !important;
}
</style>