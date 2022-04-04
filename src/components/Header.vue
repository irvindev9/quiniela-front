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
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" @click="redirect('marcador')">Marcador</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="redirect('quinielas')">Todas las quinielas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="redirect('mi-quiniela')">Mi quiniela</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Usuario
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#" @click="redirect('logout')">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function redirect(to: string) {
  router.push(to)
}
</script>

<style lang="scss">
nav.bg-light {
    background: white !important;;
}

.navbar {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}
</style>