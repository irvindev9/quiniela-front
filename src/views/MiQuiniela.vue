<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mb-1">
                <select class="form-select" name="semana" id="semana-selector">
                    <option value="1">Semana 1</option>
                </select>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                <div id="mi-quiniela" class="card">
                    <div class="card-header bg-light d-flex justify-content-between">
                        <h5 class="m-0">Tu quiniela: Usuario</h5>
                        <button class="btn btn-outline-primary btn-sm" type="button" @click="isLoading = !isLoading">
                            <div v-if="isLoading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </div>
                            <div v-else>
                                Guardar
                            </div>
                        </button>
                    </div>
                    <div class="card-body">
                        <SelectTeam v-for="index in 16" /> 
                        <div class="lock-match align-middle" v-if="isLocked">
                            <span>
                                <i class="bi-lock"></i>
                                <br>
                                Quiniela bloqueada
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import iziToast from "izitoast";
import SelectTeam from '../components/SelectTeam.vue'


const isLoading = ref(false)
const isLocked = ref(false)

onMounted(() => {
    iziToast.success({
        title: 'OK!',
        message: 'Tu quiniela ha sido guardada',
    });
})
</script>


<style lang="scss">
#mi-quiniela.card {
    .card-header {
        text-align: left;
    }

    .card-body {
        position: relative;

        .lock-match {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            opacity: 0.7;

            span {
                position: relative;
                top: 50%;

                i {
                    color: black;
                    font-size: 3rem;
                }
            }
        }
    }
}
</style>