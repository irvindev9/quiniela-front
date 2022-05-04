<template>
  <div>
    <div class="modal shadow fade" :id="props.modalName" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="props.modalName + 'Label'">Cambiar nombre</h5>
          </div>
          <div class="modal-body text-start">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" class="form-control form-control-sm" v-model="name">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
              <i class="bi bi-x"></i>
              Cancelar
            </button>
            <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal" @click="updateUserN">
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
import { updateUserName } from '../../api/adminRequests';

const props = defineProps({
  userId: {
    type: Number,
    default: 0
  }, 
  modalName: {
    type: String,
    default: 'nameModal'
  },
});

const emit = defineEmits(['getUsers'])

const name = ref('');

async function updateUserN() {
  if (props.userId === 0) {
    return;
  }

  await updateUserName(props.userId, name.value);
  await emit('getUsers');
  name.value = '';
}
</script>