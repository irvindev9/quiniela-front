<template>
    <div class="bg-container">
        <div>
            <h5 class="text-center">Fondos</h5>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="row">
                    <p class="text-start">Subir imagen</p>
                    <div class="col-12 col-md-6">
                        <div class="mb-3">
                            <input class="form-control form-control-sm" id="formFileSm" type="file">
                        </div>
                    </div>
                    <div class="col-12 col-md-2">
                        <div class="d-grid gap-1">
                            <button class="btn btn-outline-primary btn-sm" @click="uploadImg">
                                <div v-if="isLoading">
                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Subiendo...
                                </div>
                                <div v-else>
                                    <i class="bi bi-cloud-arrow-up"></i> 
                                    Subir
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row px-5 border-bottom mb-2" v-for="index in 3">
            <div class="col-12 col-md-6 col-lg-4">
                <img class="img-fluid" src="../../assets/background.jpg" alt="bg">
            </div>
            <div class="col-12 col-md-6 col-lg-8">
                <p>
                    <b>Nombre del archivo:</b> background.jpg
                </p>
                <p>
                    <b>Peso del archivo:</b> 1.2 MB 
                    <i class="bi bi-exclamation-triangle" title="Revisar peso de la imagen"></i>
                </p>
                <p>
                    <b>Tamaño del archivo:</b> 1024 x 768
                </p>
                <p>
                    <b>Tipo de archivo:</b> image/jpeg
                </p>
                <p>
                    <b>Fecha de subida:</b> 2019-12-12
                </p>
                <p>
                    <b>Acciones:</b> <br/>
                    <span class="badge rounded-pill bg-danger">
                        <i class="bi bi-trash"></i> 
                        Eliminar
                    </span>
                    <span class="badge rounded-pill bg-secondary mx-1">
                        <i class="bi bi-eye-slash"></i>
                        Ocultar
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import iziToast from "izitoast";

const isLoading = ref(false)

function uploadImg(){
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        iziToast.success({
            title: 'OK!',
            message: 'Imagen subida con éxito!',
        })
    }, 2000)
}
</script>

<style lang="scss">
.bg-container {
    .bi-exclamation-triangle {
        color: #ffc107;
    }
}
</style>