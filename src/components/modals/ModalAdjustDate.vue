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
                      <label class="form-label">Fecha</label>
                      <input type="datetime-local" class="form-control form-control-sm" v-model="dateFormat">
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
                      <i class="bi bi-x"></i> 
                      Cancelar
                  </button>
                  <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal" @click="sendDate">
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
import { updateDate } from '../../api/adminRequests';
import { toast } from '../../utils/toast';

const props = defineProps({
  modalName: {
      type: String,
      default: 'defaultModal'
  },
  title: {
      type: String,
      default: ''
  },
  weekId: {
      type: Number,
      default: 0
  }
});

const emit = defineEmits(['updateDate']);

const dateFormat = ref('');

async function sendDate() {
  if(props.weekId === 0) {
      return;
  }

  if(dateFormat.value === '') {
      toast('La fecha no puede estar vacía', { type: 'error' });
      return;
  }

  await updateDate(props.weekId, dateFormat.value);
  dateFormat.value = '';
  emit('updateDate');
}
</script>