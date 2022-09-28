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
                            <input class="form-control form-control-sm" id="formFileSm" type="file" v-on:change="updateFile">
                        </div>
                    </div>
                    <div class="col-12 col-md-2">
                        <div class="d-grid gap-1">
                            <button class="btn btn-outline-primary btn-sm" @click="upload">
                                <div v-if="isLoading">
                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
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
        <div class="row text-end">
            <a target="_blank" href="https://www.iloveimg.com/resize-image">Comprimir imagen</a>
        </div>
        <hr/>
        <div class="row px-5 border-bottom mb-2" v-for="background in backgrounds" :key="background.id">
            <div class="col-12 col-md-6 col-lg-4">
                <img class="img-fluid rounded shadow-sm" :src="background.url" :alt="'bg' + background.id">
            </div>
            <div class="col-12 col-md-6 col-lg-8">
                <p>
                    <b>Nombre del archivo:</b> {{ background.name.split('_')[1] }}
                </p>
                <p>
                    <b>Peso del archivo:</b> {{ background.size }} KB
                    <i class="bi bi-exclamation-triangle" title="Revisar peso de la imagen" v-if="(background.size > 2000)"></i>
                </p>
                <p>
                    <b>Tamaño del archivo:</b> <span :class="{'text-danger': (background.dimensions.width < 1080)}">{{ background.dimensions.width }}</span> x <span :class="{'text-danger': (background.dimensions.width < 720)}">{{ background.dimensions.height }}</span>
                </p>
                <p>
                    <b>Tipo de archivo:</b> {{ background.type }}
                </p>
                <p>
                    <b>Fecha de subida:</b> {{ new Date(background.modified * 1000).toLocaleDateString("en-US") }}
                </p>
                <p>
                    <b>Acciones:</b> <br/>
                    <span class="badge rounded-pill bg-danger" @click="deleteBg(background.name)">
                        <i class="bi bi-trash"></i> 
                        Eliminar
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue';
import { toast } from '../../utils/toast';
import { uploadBackgroundFile, getAllBackgrounds, deleteBackground } from '../../api/adminRequests';
import { Backgrounds } from '../../models/Backgrounds';
import { useBackgroundStore } from '../../stores/admin/BackgroundStore';

const isLoading = ref(false)
const file = ref(null)
const backgrounds: Ref<Backgrounds> = ref([])
const backgroundStore = useBackgroundStore()

onMounted(async () => {
    if(checkForUpdate()) {
        backgrounds.value = await getAllBackgrounds()
        backgroundStore.setBackgrounds(backgrounds.value)
    } else {
        backgrounds.value = backgroundStore.backgrounds
    }
    
})

function updateFile(e: any){
    file.value = e.target.files[0]
}

async function upload(){
    if(file.value){
        isLoading.value = true
        const formData = new FormData()
        formData.append('file', file.value);
        await uploadBackgroundFile(formData)
        backgrounds.value = await getAllBackgrounds()
        //reset input
        isLoading.value = false
    }else{ 
        toast('No se ha seleccionado ninguna imagen!', { type: 'warning' })
    }
}

async function deleteBg(name: string){
    await deleteBackground(name)
    backgrounds.value = await getAllBackgrounds()
}

function checkForUpdate(){
    const tenMinutesAgo = 1 * 60 * 1000;
    const timeToUpdate = backgroundStore.lastTimeUpdated ? backgroundStore.lastTimeUpdated : 0;
    if (timeToUpdate < (new Date().getTime() - tenMinutesAgo)) {
        return true;
    }else{
        return false;
    }
}
</script>

<style lang="scss">
.bg-container {
    .bi-exclamation-triangle {
        color: #ffc107;
    }

    span.badge {
        cursor: pointer;
    }
}
</style>