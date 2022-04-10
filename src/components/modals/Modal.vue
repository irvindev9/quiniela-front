<template>
    <div>
        <div class="modal shadow fade" :id="props.modalName" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="props.modalName + 'Label'">{{ title }}</h5>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="text" class="form-control form-control-sm">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Confirmar</label>
                        <input type="text" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
                        <i class="bi bi-x"></i> 
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-outline-success btn-sm">
                        <i class="bi bi-send"></i> 
                        Guardar
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    modalName: {
        type: String,
        default: 'defaultModal'
    },
    title: {
        type: String,
        default: ''
    }
})
</script>