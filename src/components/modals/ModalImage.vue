<template>
  <div>
    <div class="modal shadow fade" :id="props.modalName" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="props.modalName + 'Label'">Cambiar imagen de perfil</h5>
          </div>
          <div class="modal-body text-start">
            <div class="mb-3">
              <label class="form-label">Image de usuario</label>
              <input class="form-control form-control-sm" id="formFileSm" type="file" v-on:change="updateFile">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
              <i class="bi bi-x"></i>
              Cancelar
            </button>
            <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal" @click="upload">
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
});

const emit = defineEmits(['getUsers'])

const file = ref(null);

function updateFile(e: any) {
  file.value = e.target.files[0];
}

async function upload() {
  const formData = new FormData();
  formData.append('file', file.value);
  await uploadUserPhoto(props.userId, formData);
  await emit('getUsers');
}
</script>