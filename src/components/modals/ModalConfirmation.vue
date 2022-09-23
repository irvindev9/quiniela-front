<template>
  <div>
    <div class="modal shadow fade" :id="props.modalName" tabindex="-1">
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
              <p>
                {{ props.message }}
              </p>
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
import { uploadUserPhoto } from '../../api/adminRequests';

const props = defineProps({
  userId: {
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

const emit = defineEmits(['deleteUser'])

const password = ref('');

function confirm(){
  if (props.userId === 0) {
    return;
  }

  emit('deleteUser', password.value, props.userId);

  password.value = '';
  
}
</script>