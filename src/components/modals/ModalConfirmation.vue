<template>
  <div>
    <div class="modal shadow fade confirmationModal" :id="props.modalName" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="props.modalName + 'Label'">
              <span class="bi-exclamation-triangle bi"></span>
              Confirmar acción!
            </h5>
          </div>
          <div class="modal-body text-start">
            <div class="mb-3">
              <p v-html="props.message"></p>
            </div>
            <div class="mb-3">
              <div>
                <label class="form-label">Se requiere contraseña para realizar esta acción:</label>
                <input type="password" class="form-control form-control-sm" placeholder="password" v-model="password">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
              <i class="bi bi-x"></i>
              Cancelar
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" @click="confirm">
              <span class="bi-exclamation-triangle bi"></span>
              Eliminar
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
  targetId: {
    type: Number,
    default: 0
  }, 
  modalName: {
    type: String,
    default: 'imageModal'
  },
  message: {
    type: String,
    default: '¿Está seguro de realizar esta acción?'
  }
});

const emit = defineEmits(['deleteTarget'])

const password = ref('');

function confirm(){
  if (props.targetId === 0) {
    return;
  }

  emit('deleteTarget', password.value, props.targetId);

  password.value = '';
  
}
</script>

<style lang="scss">
  .confirmationModal {
    small {
      color: #7f7f7f;
      font-size: 10px;
    }
  }
</style>